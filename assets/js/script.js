//NOTE SUR LE TEXTE: Puisque le narrateur est un robot accompagnateur (Pod), à certains endroit le texte est FAIT EXPRÈS pour être inlisible, comme un glitch, une erreur, etc.
//Ces parties ne sont pas des erreurs dans le code.

//Variables html

let titreChapter = document.querySelector("h2");
let imageChapter = document.querySelector(".situation");
let texteChapter = document.querySelector("p");
let boutonChapter = document.querySelector("button");
let resetBtn = document.querySelector(".reset");
let maVideo = document.querySelector("#situationVideo");
let div = document.querySelector(".button");
let audioMute = document.querySelector("#checkbox-32");
const myVolume = 0.1;

let musiqueDebut = new Audio("assets/audio/debut.mp3");
musiqueDebut.volume = myVolume;

let musiqueSimone = new Audio("assets/audio/simone_cry.mp3");
musiqueSimone.volume = myVolume;

let audioClique = new Audio("assets/audio/1256_interface-sound-01.mp3");
audioClique.volume = myVolume;

let audioHover = new Audio("assets/audio/1890_button-click-62.mp3");
audioHover.volume = myVolume;

//Variables DOM
let body = document.querySelector("body");
let conteneurJeu = document.querySelector(".game");
let situationJeu = document.querySelector(".situation");
let boutonStyle = document.querySelector(".button");
let boutonResetStyle = document.querySelector(".reset");
let p = document.querySelector("p");
let h2 = document.querySelector("h2");
let label = document.querySelector("label");
let logo = document.querySelector("h1");

//volume

function setVolume(volume) {
  audioClique.volume = volume;
  audioHover.volume = volume;
  musiqueDebut.volume = volume;
  musiqueSimone.volume = volume;
}

//checkbox

audioMute.addEventListener("change", function () {
  if (this.checked) {
    setVolume(0);
    localStorage.setItem("checkboxSave", true);
  } else {
    setVolume(myVolume);
    localStorage.setItem("checkboxSave", false);
  }
});

//variables chapitre secret

const simoneDestiInit = "danse";
const simoneDestiRobot = "choix";

simoneDesti = simoneDestiInit;

chapters = {
  debut: {
    titre: `Gloire à l’humanité`,
    description: `Message entrant: ........
        \nIl y a de nombreuses années, une menace extraterrestre a brisé l’âge d’or de l’humanité en déployant une redoutable armada de robots. Face à cette catastrophe, les survivants ont pris refuge sur la lune. Des siècles se sont écoulés depuis, et c’est à ce moment que l’organisation YoRha a vu le jour.
        \nLa guerre n’a pourtant cessé de continuer jusqu’à ce jour. C’est pour cette raison que vous, soldat, avez pour mission de vous battre en l’honneur de l’humanité afin de reprendre la planète natale de nos créateurs. Nous avons confiance en vous. Gloire... À l’humanité.`,
    image: `./assets/images/gloire-a-humanite.png`,
    bouton: [{ titre: "⇾ Commencer", destination: "activation" }],
  },

  activation: {
    titre: `Activation`,
    description: `Activation de l'androïde Unité 1 type Nier. Bonjour, 1N, je suis Pod A, votre assistant. Je vous accompagnerai à chacune des étapes de votre mission. L'androïde 2S, Unité 2 Type Scanner, s’est également joint à votre mission et a déjà identifié un ennemi au parc d’attractions. La mission débute maintenant.
        \nMais avant, rappelez-vous : Gloire... à l’humanité.
        \nAlerte ! Lorsque vous arrivés à l’entrée du parc d’attractions, des robots semblent adopter un comportement pacifique.`,
    image: `./assets/images/activation.gif`,
    bouton: [
      { titre: "⇾ Attaquer les robots", destination: "robot" },
      { titre: "⇾ Continuer son chemin", destination: "blackbox" },
    ],
  },

  robot: {
    titre: `Attaquer les robots`,
    description: `Vous attaquez les robots, ils n’attaquent pas en retour. 2S a piraté l’un d’eux, il semble émettre un message... Lecture du message.
        \n..-…--..---..-..-.---..-
        \nC'est étrange. Je n’arrive pas à traduire ce code. Veuillez continuer votre mission.`,
    image: `./assets/images/nier_automata_attack_robot.jpg`,
    bouton: [{ titre: "⇾ Continuer son chemin", destination: "blackbox" }],
  },

  blackbox: {
    titre: `Les Blackbox`,
    description: `Vous avancez plus loin. 2S scanne les environs. ALERTE ! Elle semble détecter les blackbox d’autres androïdes récemment disparus.
        \nPermission de vous rappeler ce qu’est une blackbox, 1N. La blackbox constitue le noyau essentiel d’un androïde. Ce noyau permet l'exécution de multiples fonctions, telles que, dans ce cas précis, celle d’un traqueur. En cas d’extrême urgence, vous pouvez utiliser votre blackbox comme arme nucléaire.`,
    image: `./assets/images/alert-blackbox.gif`,
    bouton: [
      { titre: "⇾ Retrouver les blackbox", destination: "simone" },
      { titre: "⇾ Continuer son chemin", destination: "verite" },
    ],
  },

  verite: {
    titre: `La vérité`,
    description: `Vous explorez le parc à la recherche de l’ennemi, mais vous rencontrez 1B, une androïde désertée très dangereuse. Sans avoir le temps de réagir, 1B vous attaque, vous laissant comme dernière mémoire, une vérité choquante...
        \n..--.-.-.--YoRha... Vous utilise... Vos combats éternels ne mènent à rien... L’humanité a complètement disparue depuis des siècles...--.--..---
        \nVous mourrez...
        \nDonnées envoyées à la base. Vous pouvez recommencer. `,
    image: `./assets/images/verite-deserte.jpg`,
    bouton: [{ titre: "⇾ Retour au début", destination: "debut" }],
  },

  simone: {
    titre: `La chanteuse robot`,
    description: `Le signal des blackbox vous conduit au grand théâtre du château central où un ennemi de type Goliath est détecté.
    \n ALERTE! Sur une grande scène, Simone, la chanteuse d’opéra robot, entonne un chant horrible et strident. Un chant qui marque le début d’un combat.`,
    video: `./assets/video/simone_intro.mp4`,
    bouton: [
      { titre: "⇾ Attaque frontale", destination: "marionettes" },
      { titre: "⇾ Attaque furtive", destination: simoneDesti },
    ],
  },

  marionettes: {
    titre: `Marionnettes`,
    description: `ALERTE! Les androïdes disparus sont des marionnettes de Simone. Vos données sont compromimimimimi..... seeeee....
        \nSimone pirate votre corps et vous en perdez le contrôle. Involontairement, vous tuez 2S... Vous devenez l'arme de Simone, une autre de ses marionnettes.
        \nJe n’ai pas pu sauvegarder vos... d.d.d.d.d.onn.... `,
    video: `./assets/video/simone_marionette.mp4`,
    bouton: [{ titre: "⇾ Retour au début", destination: "debut" }],
  },

  danse: {
    titre: `Une grande danse`,
    description: `L’attaque furtive réussit. 2S pirate Simone et elle se faufile dans sa mémoire. Des images floues surgissent autant dans la mémoire de 2S que dans la votre : amour, beauté, meurtre, contrôle, amour, beautémeurtrecontroleamourbeautemeurtrecontrole.... ERREUR! Les robots n’ont aucune capacité d’émotions...
        \nGrâce à cette déstabilisation, vous abattez Simone dans une grande danse déchaînée. Mais sa mémoire vous laisse troublé. Pour l’instant, le rapport à envoyer à la base est plus important.
        \nBravo pour cette mission 1N... Gloire à l’humanité.`,
    image: `./assets/images/grande-danse-simone.jpg`,
    bouton: [{ titre: "⇾ Retour au début", destination: "debut" }],
  },

  choix: {
    titre: `Faites votre choix`,
    description: `ERREUR! Trop de blackbox détectées. Trop d’androids sont contrrr ooo ôoolés... ERREUR! Détection de robots agressifs !... Eee... ERR.EUR.-.--.--- Les robots que vous avez tués ont lancé un signal d’alerte. Vous êtes encerclés. Simone ordonne leur attaque... Je ne peux que sauver l’un d’entre vous.
        \nUne décision finale est requise.`,
    image: `./assets/images/choix-nier-scanner.gif`,
    bouton: [
      { titre: "♡ Sauver 2S", destination: "scanner" },
      { titre: "♡ Sauver 1N", destination: "nier" },
    ],
  },

  scanner: {
    titre: `Unité 2 Type Scanner`,
    description: `Simone n’a pas été combattu, mais les données de 2S ont été sauvegardés et renvoyés à la base. Votre mort a laissé 2S troublé. Pour une raison inconnue de tous, 2S a déserté YoRha quelques mois après votre mort. Aujourd’hui, j’accompagne 2S partout, elle se bat maintenant en votre mémoire... `,
    image: `./assets/images/2b_jungle.jpg`,
    bouton: [{ titre: "⇾ Retour au début", destination: "debut" }],
  },

  nier: {
    titre: `Unité 1 Type Nier`,
    description: `Vous réussissez à emmener Simone dans votre mort à l’aide de votre blackbox. Vos données ont été sauvegardées à la base de YoRha. Malheureusement, les données de 2S seront à jamais perdues.
        \nLors de la détonation de la blackbox, 2S se faufile dans votre mémoire afin de vous partager ses dernières pensées. Elle vous montre l’image d’un grand héro accomplissant sa mission. Vous êtes ce héros, Nier.`,
    video: `./assets/video/blackbox_explose.mp4`,
    bouton: [{ titre: "⇾ Retour au début", destination: "debut" }],
  },
};

function goToChapter(chapter) {
  //local storage pour sauvegarder
  localStorage.setItem("currentChapter", chapter);

  audioClique.play();
  const myChapter = chapters[chapter];
  const myVid = myChapter.video;

  if (myChapter) {
    if (chapter == "robot") {
      //local pour sauvegarder la twist
      localStorage.setItem("myTwist", true);
      chapters.simone.bouton[1].destination = simoneDestiRobot;
    } else if (chapter == "debut") {
      localStorage.setItem("myTwist", false);
      chapters.simone.bouton[1].destination = simoneDestiInit;
    }

    if (myVid) {
      maVideo.classList.remove("hidden");
      maVideo.src = myVid;
      maVideo.play();
    } else {
      maVideo.classList.add("hidden");
    }

    if (myChapter == chapters.debut) {
      musiqueSimone.pause();
      musiqueDebut.currentTime = 0;
      musiqueDebut.play();

      //Changement de styles page début.
      body.classList.add("body-debut");
      conteneurJeu.classList.add("game-debut");
      conteneurJeu.classList.remove("game");
      situationJeu.classList.add("situation-debut");
      situationJeu.classList.remove("situation");

      boutonResetStyle.classList.add("reset-debut");
      boutonResetStyle.classList.remove("reset");

      p.classList.add("para-debut");
      h2.classList.add("titre-debut");
      label.classList.add("label-debut");
      logo.classList.add("hero");
    } else if (myChapter == chapters.simone) {
      musiqueDebut.pause();
    } else {
      //Remettre style pour tous les chapitres
      body.classList.remove("body-debut");
      conteneurJeu.classList.add("game");

      situationJeu.classList.add("situation");

      boutonResetStyle.classList.add("reset");
      boutonResetStyle.classList.remove("reset-debut");

      p.classList.remove("para-debut");
      h2.classList.remove("titre-debut");
      label.classList.remove("label-debut");

      logo.classList.remove("hero");
      logo.classList.add("hero-all");
    }

    setTimeout(function () {
      if (myChapter == chapters.simone) {
        musiqueSimone.currentTime = 0;
        musiqueSimone.play();
      }
    }, 5000);

    titreChapter.innerText = myChapter.titre;
    texteChapter.innerText = myChapter.description;
    imageChapter.src = myChapter.image;
    div.innerHTML = "";

    myChapter.bouton.forEach(function (bout) {
      let createNewButton = document.createElement("button");

      createNewButton.innerHTML = `${bout.titre}`;
      createNewButton.addEventListener("click", () =>
        goToChapter(bout.destination)
      );
      createNewButton.addEventListener("mouseenter", () => {
        audioHover.currentTime = 0;
        audioHover.play();
      });
      div.appendChild(createNewButton);

      //Changer style des boutons de début.
      if (myChapter == chapters.debut) {
        createNewButton.classList.add("button-debut");
      } else {
        createNewButton.classList.remove("button-debut");
      }
    });
  }
}

resetBtn.addEventListener("click", function () {
  //uncheck le checkbox au reset
  document.getElementById("checkbox-32").checked = false;
  setVolume(myVolume);

  //clear local storage
  localStorage.clear();
  goToChapter("debut");
});

let currentChapter = localStorage.getItem("currentChapter");

if (currentChapter !== null) {
  if (localStorage.getItem("myTwist") == true) {
    chapters.simone.bouton[1].destination = simoneDestiRobot;
  }
  goToChapter(currentChapter);
} else {
  goToChapter("debut");
}

//save checkbox

if (localStorage.getItem("checkboxSave") == "true") {
  setVolume(0);
  document.getElementById("checkbox-32").checked = true;
}
