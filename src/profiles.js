// Modifie ce fichier pour créer plusieurs versions du site.
// Tu peux sélectionner un profil via l'URL : ?p=raghad (ou autre id)
// Tu peux aussi surcharger le prénom via : ?name=Emma

import catMeme from "./assets/cat_meme.png";

export const defaultProfileId = "raghad";

export const profiles = {
  raghad: {
    person: {
      name: "Raghad",
    },

    theme: {
      primary: "#ff4d6d",
      secondary: "#ff8fa3",
      bg: "#fff0f3",
      text: "#590d22",
    },

    asking: {
      title: "{name}, will you be my Valentine?",
      yesText: "Yes",
      noText: "No",
      noStartPosition: { top: "60%", left: "60%" },
    },

    threat: {
      enabled: true,
      delayMs: 10000,
      imageSrc: catMeme,
      title: "STOP PLAYING WITH ME",
      subtitle: "CLICK YES NOW",
      buttonText: "OKAY YES",
    },

    accepted: {
      title: "Yay! I knew you'd say yes! ❤️",
      loveNote: "To the most beautiful girl in the world, {name}.",
      photos: [
        "/profiles/raghad/raghad1.jpeg",
        "/profiles/raghad/raghad2.jpeg",
        "/profiles/raghad/raghad3.jpeg",
      ],
      reasons: ["Your beautiful smile", "The way you care", "Making me laugh"],
      music: {
        label: "Our song... 🎵",
        youtubeEmbedUrl: "https://www.youtube.com/embed/gsc5m3p_tBs?autoplay=1",
        width: 300,
        height: 80,
      },
    },
  },

  asmahane: {
    person: {
      name: "Asmahane",
    },

    theme: {
      primary: "#ff4d6d",
      secondary: "#ff8fa3",
      bg: "#fff0f3",
      text: "#590d22",
    },

    asking: {
      title: "{name}, tu veux être ma Valentine ?",
      yesText: "Oui",
      noText: "Non",
      noStartPosition: { top: "60%", left: "60%" },
    },

    threat: {
      enabled: true,
      delayMs: 10000,
      imageSrc: catMeme,
      title: "STOP PLAYING WITH ME",
      subtitle: "CLICK YES NOW",
      buttonText: "OKAY YES",
    },

    accepted: {
      title: "Yesss ❤️",
      loveNote: "{name}, tu es incroyable.",
      photos: [
        "/profiles/asmahane/asmahane1.jpeg",
        "/profiles/asmahane/asmahane2.jpeg",
        "/profiles/asmahane/asmahane3.jpeg",
      ],
      reasons: [
        "Ton sourire",
        "Ton énergie",
        "Parce que tu rends tout plus beau",
      ],
      music: {
        label: "Notre chanson 🎵",
        youtubeEmbedUrl: "https://www.youtube.com/embed/gsc5m3p_tBs?autoplay=1",
        width: 300,
        height: 80,
      },
    },
  },

  dodo: {
    person: {
      name: "Dodo",
    },

    theme: {
      primary: "#ff4d6d",
      secondary: "#ff8fa3",
      bg: "#fff0f3",
      text: "#590d22",
    },

    asking: {
      title: "{name}, tu veux être ma Valentine ?",
      yesText: "Oui",
      noText: "Non",
      noStartPosition: { top: "60%", left: "60%" },
    },

    threat: {
      enabled: true,
      delayMs: 10000,
      imageSrc: catMeme,
      title: "STOP PLAYING WITH ME",
      subtitle: "CLICK YES NOW",
      buttonText: "OKAY YES",
    },

    accepted: {
      title: "Yesss ❤️",
      loveNote: "{name}, tu es incroyable.",
      photos: [
        "/profiles/dodo/dodo1.jpeg",
        "/profiles/dodo/dodo2.jpeg",
        "/profiles/dodo/dodo3.jpeg",
      ],
      reasons: ["Ton sourire", "Ton humour", "Parce que je t'adore"],
      music: {
        label: "Notre chanson 🎵",
        youtubeEmbedUrl: "https://www.youtube.com/embed/gsc5m3p_tBs?autoplay=1",
        width: 300,
        height: 80,
      },
    },
  },

  // Exemple rapide à dupliquer pour une autre personne.
  // Astuce: pour des photos sans import, mets-les dans /public/profiles/maeva/1.jpg
  // et utilise: photos: ['/profiles/maeva/1.jpg', '/profiles/maeva/2.jpg']
  ami_exemple: {
    person: {
      name: "Emma",
    },
    theme: {
      primary: "#ff4d6d",
      secondary: "#ff8fa3",
      bg: "#fff0f3",
      text: "#590d22",
    },
    asking: {
      title: "{name}, tu veux être ma Valentine ?",
      yesText: "Oui",
      noText: "Non",
      noStartPosition: { top: "60%", left: "60%" },
    },
    threat: {
      enabled: false,
      delayMs: 10000,
      imageSrc: catMeme,
      title: "HEY",
      subtitle: "Dis oui 😄",
      buttonText: "OK",
    },
    accepted: {
      title: "Yesss ❤️",
      loveNote: "{name}, tu es incroyable.",
      photos: [],
      reasons: ["Parce que je t'adore", "Parce que tu me rends heureux"],
      music: {
        label: "Notre chanson 🎵",
        youtubeEmbedUrl: "https://www.youtube.com/embed/gsc5m3p_tBs",
        width: 300,
        height: 80,
      },
    },
  },
};
