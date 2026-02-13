import { useMemo, useState, useEffect, useRef } from "react";
import "./App.css";

import { defaultProfileId, profiles } from "./profiles";

function formatTemplate(text, variables) {
  if (!text) return "";
  return text.replace(/\{(\w+)\}/g, (_, key) => {
    const value = variables?.[key];
    return value == null ? "" : String(value);
  });
}

function readProfileFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const profileId = (params.get("p") || "").trim();
  const nameOverride = (params.get("name") || "").trim();

  const resolvedProfileId = profileId || defaultProfileId;
  const profile = profiles[resolvedProfileId] || profiles[defaultProfileId];
  const isProfileMissing = Boolean(profileId) && !profiles[profileId];

  const personName = nameOverride || profile?.person?.name || "";

  return {
    profileId: resolvedProfileId,
    isProfileMissing,
    profile,
    personName,
  };
}

function App() {
  const { profileId, isProfileMissing, profile, personName } = useMemo(
    readProfileFromUrl,
    [],
  );
  const [status, setStatus] = useState("ASKING"); // ASKING, THREAT, ACCEPTED
  const [noBtnPosition, setNoBtnPosition] = useState(
    profile.asking?.noStartPosition || { top: "60%", left: "60%" },
  );
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [revealedReasons, setRevealedReasons] = useState([]);
  const timerRef = useRef(null);

  const threatEnabled = Boolean(profile.threat?.enabled);
  const threatDelayMs = Number.isFinite(profile.threat?.delayMs)
    ? profile.threat.delayMs
    : 10000;
  const acceptedPhotos = Array.isArray(profile.accepted?.photos)
    ? profile.accepted.photos
    : [];
  const acceptedReasons = Array.isArray(profile.accepted?.reasons)
    ? profile.accepted.reasons
    : [];

  const hearts = useMemo(() => {
    return [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      fontSize: `${Math.random() * 2 + 1}rem`,
    }));
  }, []);

  useEffect(() => {
    const theme = profile.theme;
    if (!theme) return;
    const root = document.documentElement;
    if (theme.primary) root.style.setProperty("--primary", theme.primary);
    if (theme.secondary) root.style.setProperty("--secondary", theme.secondary);
    if (theme.bg) root.style.setProperty("--bg", theme.bg);
    if (theme.text) root.style.setProperty("--text", theme.text);
  }, [profile]);

  useEffect(() => {
    const shouldLockScroll = status !== "ACCEPTED";
    document.body.classList.toggle("no-scroll", shouldLockScroll);
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [status]);

  useEffect(() => {
    if (status === "ASKING" && threatEnabled) {
      timerRef.current = setTimeout(() => {
        setStatus("THREAT");
      }, threatDelayMs);
    }
    return () => clearTimeout(timerRef.current);
  }, [status, threatEnabled, threatDelayMs]);

  // Carousel auto-play
  useEffect(() => {
    if (status === "ACCEPTED") {
      if (acceptedPhotos.length === 0) return;
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % acceptedPhotos.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [status, acceptedPhotos.length]);

  const handleNoHover = () => {
    const randomTop = Math.floor(Math.random() * 80) + 10;
    const randomLeft = Math.floor(Math.random() * 80) + 10;
    setNoBtnPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  const handleYesClick = () => {
    clearTimeout(timerRef.current);
    setStatus("ACCEPTED");
  };

  const handleThreatClick = () => {
    setStatus("ACCEPTED");
  };

  const toggleReason = (index) => {
    if (revealedReasons.includes(index)) {
      setRevealedReasons(revealedReasons.filter((i) => i !== index));
    } else {
      setRevealedReasons([...revealedReasons, index]);
    }
  };

  return (
    <div className="container">
      {status === "ASKING" && (
        <div className="card">
          <h1>{formatTemplate(profile.asking?.title, { name: personName })}</h1>
          <div className="buttons">
            <button className="btn-yes" onClick={handleYesClick}>
              {profile.asking?.yesText || "Yes"}
            </button>
            <button
              className="btn-no"
              style={{
                position: "fixed",
                top: noBtnPosition.top,
                left: noBtnPosition.left,
              }}
              onMouseEnter={handleNoHover}
              onClick={handleNoHover} // fallback for mobile/click
            >
              {profile.asking?.noText || "No"}
            </button>
          </div>

          {isProfileMissing && (
            <p style={{ marginTop: "1rem", opacity: 0.7 }}>
              Profil "{new URLSearchParams(window.location.search).get("p")}"
              introuvable. Utilisation de "{defaultProfileId}".
            </p>
          )}
        </div>
      )}

      {status === "THREAT" && (
        <div className="threat-overlay">
          <img src={profile.threat?.imageSrc} alt="Meme" className="meme-img" />
          <h2>{profile.threat?.title || "STOP PLAYING WITH ME"}</h2>
          <p>{profile.threat?.subtitle || "CLICK YES NOW"}</p>
          <button className="btn-force-yes" onClick={handleThreatClick}>
            {profile.threat?.buttonText || "OKAY YES"}
          </button>
        </div>
      )}

      {status === "ACCEPTED" && (
        <div className="celebration">
          {/* Floating Hearts */}
          <div className="hearts-container">
            {hearts.map((h, i) => (
              <div
                key={i}
                className="heart"
                style={{
                  left: h.left,
                  animationDelay: h.animationDelay,
                  fontSize: h.fontSize,
                }}
              >
                ❤️
              </div>
            ))}
          </div>

          <h1>{profile.accepted?.title || "Yay! I knew you'd say yes! ❤️"}</h1>
          <p className="love-note">
            {formatTemplate(profile.accepted?.loveNote, { name: personName })}
          </p>

          {acceptedPhotos.length > 0 && (
            <div className="carousel-container">
              {acceptedPhotos.map((photo, index) => (
                <div
                  key={index}
                  className={`carousel-slide ${
                    index === currentPhotoIndex ? "active" : ""
                  }`}
                >
                  <img
                    src={photo}
                    alt={`${personName} ${index + 1}`}
                    className="raghad-img"
                  />
                </div>
              ))}
            </div>
          )}

          {acceptedReasons.length > 0 && (
            <div className="reasons-container">
              {acceptedReasons.map((reason, index) => (
                <div
                  key={index}
                  className={`reason-card ${
                    revealedReasons.includes(index) ? "revealed" : ""
                  }`}
                  onClick={() => toggleReason(index)}
                >
                  {revealedReasons.includes(index) ? reason : "Click Me! 💌"}
                </div>
              ))}
            </div>
          )}

          {profile.accepted?.music?.youtubeEmbedUrl && (
            <div className="audio-player">
              <p>{profile.accepted?.music?.label || "Our song... 🎵"}</p>
              <iframe
                width={profile.accepted?.music?.width || 300}
                height={profile.accepted?.music?.height || 80}
                src={profile.accepted.music.youtubeEmbedUrl}
                title="Music"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
