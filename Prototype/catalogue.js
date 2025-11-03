let bibliotheque = [
    { code: 12, titre: "Clean Code", auteur: "Robert C. Martin", annee: 2008, disponible: true, prix: 150 },
    { code: 45, titre: "Eloquent JavaScript", auteur: "Marijn Haverbeke", annee: 2018, disponible: true, prix: 200 }
  ];
  
  // ===============================
  // 🔹 Afficher les livres
  // ===============================
  function afficherLivres(liste = bibliotheque) {
    const section = document.getElementById("catalogue");
    section.innerHTML = ""; // vider la section avant d'afficher
  
    let i = 0;
    while (i < liste.length) {
      const livre = liste[i];
      const card = document.createElement("article");
  
      card.innerHTML =
        "<h3>" + livre.titre + "</h3>" +
        "<p><strong>Auteur:</strong> " + livre.auteur + "</p>" +
        "<p><strong>Année:</strong> " + livre.annee + "</p>" +
        "<p><strong>Prix:</strong> " + livre.prix + " DH</p>" +
        "<p><strong>Disponible:</strong> " + (livre.disponible ? "OUI ✅" : "NON ❌") + "</p>" +
        "<button onclick='supprimerLivre(" + livre.code + ")'>Supprimer</button>" +
        "<button onclick='changerDisponibilite(" + livre.code + ")'>" +
        (livre.disponible ? "Emprunter" : "Retourner") +
        "</button>";
  
      section.appendChild(card);
      i++;
    }
  
    afficherStats();
  }
  
  // ===============================
  // 🔹 Supprimer un livre
  // ===============================
  function supprimerLivre(code) {
    let nouvelleBibliotheque = [];
    let i = 0;
    while (i < bibliotheque.length) {
      if (bibliotheque[i].code !== code) {
        nouvelleBibliotheque.push(bibliotheque[i]);
      }
      i++;
    }
    bibliotheque = nouvelleBibliotheque;
    afficherLivres();
  }
  
  // ===============================
  // 🔹 Changer la disponibilité (emprunter/retourner)
  // ===============================
  function changerDisponibilite(code) {
    let i = 0;
    while (i < bibliotheque.length) {
      if (bibliotheque[i].code === code) {
        bibliotheque[i].disponible = !bibliotheque[i].disponible;
        break; // on a trouvé le livre, on arrête la boucle
      }
      i++;
    }
    afficherLivres();
  }
  
  // ===============================
  // 🔹 Statistiques de base
  // ===============================
  function afficherStats() {
    let total = bibliotheque.length;
  
    let dispo = 0;
    let valeurTotale = 0;
    let i = 0;
    while (i < bibliotheque.length) {
      if (bibliotheque[i].disponible) {
        dispo++;
        valeurTotale += bibliotheque[i].prix;
      }
      i++;
    }
  
    let moyennePrix = 0;
    if (dispo > 0) {
      moyennePrix = valeurTotale / dispo;
    }
  
    // Livre le plus cher
    let livreCher = null;
    if (bibliotheque.length > 0) {
      livreCher = bibliotheque[0];
      i = 1;
      while (i < bibliotheque.length) {
        if (bibliotheque[i].prix > livreCher.prix) {
          livreCher = bibliotheque[i];
        }
        i++;
      }
    }
  
    let texte = "📚 Total livres: " + total +
                " | ✅ Disponibles: " + dispo +
                " | 💰 Valeur totale du stock: " + valeurTotale + " DH" +
                " | 📈 Moyenne des prix (disponibles): " + moyennePrix+ " DH"+
                " | 🏆 Livre le plus cher: \"" + livreCher.titre + "\" (" + livreCher.prix + " DH)";
  
    document.getElementById("stats").innerText = texte;
  }
  
  // ===============================
  // 🔹 Ajouter un livre
  // ===============================
  const btnAjouter = document.getElementById("btnAjouter");
  btnAjouter.addEventListener("click", function() {
    window.open("ajouter-livre.html", "", "width=400,height=700");
  });
  
  function fenetreAjouter(nouvLivre) {
    bibliotheque.push(nouvLivre);
    afficherLivres();
  }
  window.fenetreAjouter = fenetreAjouter; // permet à la fenêtre ajouter.html d'appeler cette fonction
  
  // ===============================
  // 🔹 Recherche d'un livre
  // ===============================
  // const btnSearch = document.getElementById("btnSearch");
  // btnSearch.addEventListener("click", rechercherLivre);
  
  // function rechercherLivre() {
  //   const motCle = document.getElementById("searchInput").value.toLowerCase();
  
  //   if (motCle === "") {
  //     afficherLivres();
  //     return;//ykheraj mn lfunction hena ndir loop finma ydekhal chi haja khawya ygolih please entrer titre and try again;
  //   }
  
  //   let resultat = [];
  //   let i = 0;
  //   while (i < bibliotheque.length) {
  //     if (bibliotheque[i].titre.toLowerCase().includes(motCle)) {
  //       resultat.push(bibliotheque[i]);
  //     }
  //     i++;
  //   }
  
  //   if (resultat.length === 0) {
  //     document.getElementById("catalogue").innerHTML = "<p>Aucun livre trouvé 😢</p>";
  //   } else {
  //     afficherLivres(resultat);
  //   }
  // }
  const btnnSearch = document.getElementById("btnSearch");
btnnSearch.addEventListener("click", function() {
  const titreSearch = document.getElementById("searchInput").value.toLowerCase();
  
  if (titreSearch === "") {
    afficherLivres();
    return;
  }

  let resultat = [];
  let counter = 0;
  while (counter < bibliotheque.length) {
    if (bibliotheque[counter].titre.toLowerCase().includes(titreSearch)) {
      resultat.push(bibliotheque[counter]);
    }
    counter++;
  }

  if (resultat.length === 0) {
    document.getElementById("catalogue").innerHTML = "<p>Aucun livre trouvé 😢</p>";
  } else {
    afficherLivres(resultat);
  }
});


  // ===============================
  // 🔹 Chargement initial
  // ===============================
  afficherLivres();



 
