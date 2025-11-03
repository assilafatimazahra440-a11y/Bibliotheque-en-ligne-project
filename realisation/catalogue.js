let bibliotheque = [
    { code: 12, titre: "Clean Code", auteur: "Robert C. Martin", annee: 2008, disponible: true, prix: 150 },
    { code: 45, titre: "Eloquent JavaScript", auteur: "Marijn Haverbeke", annee: 2018, disponible: true, prix: 200 },
    { code: 30, titre: "You Don’t Know JS", auteur: "Kyle Simpson", annee: 2020, disponible: false, prix: 180 },
  ];
  
  let ordreCroissant = true; // pour trier (A→Z ou Z→A)
  
  // ===============================
  // 🔹 AFFICHER LES LIVRES
  // ===============================
  function afficherLivres(liste = bibliotheque) {
    const section = document.getElementById("catalogue");
    section.innerHTML = "";
  
    liste.forEach((livre) => {
      const card = document.createElement("article");
      card.innerHTML = `
        <h3>${livre.titre}</h3>
        <p><strong>Auteur:</strong> ${livre.auteur}</p>
        <p><strong>Année:</strong> ${livre.annee}</p>
        <p><strong>Prix:</strong> ${livre.prix} DH</p>
        <p><strong>Disponible:</strong> ${
          livre.disponible ? "✅ Oui" : "<span style='color:#b33'>📕 Réservé</span>"
        }</p>
        <div style="margin-top:8px;">
          <button onclick="supprimerLivre(${livre.code})">🗑 Supprimer</button>
          ${
            livre.disponible
              ? `<button onclick="reserverLivre(${livre.code})">📘 Réserver</button>`
              : `<button disabled style="opacity:0.5; cursor:not-allowed;">📕 Réservé</button>`
          }
        </div>
      `;
      section.appendChild(card);
    });
  
    afficherStats();
  }
  
  // ===============================
  // 🔹 SUPPRIMER
  // ===============================
  function supprimerLivre(code) {
    bibliotheque = bibliotheque.filter((livre) => livre.code !== code);
    afficherLivres();
  }
  
  // ===============================
  // 🔹 RÉSERVER UN LIVRE
  // ===============================
  function reserverLivre(code) {
    const livre = bibliotheque.find((l) => l.code === code);
    if (livre && livre.disponible) {
      livre.disponible = false;
      afficherLivres();
    }
  }
  
  // ===============================
  // 🔹 TRIER PAR TITRE
  // ===============================
  const btnTrier = document.getElementById("btnTrier");
  btnTrier.addEventListener("click", () => {
    bibliotheque.sort((a, b) => {
      if (a.titre.toLowerCase() < b.titre.toLowerCase()) return ordreCroissant ? -1 : 1;
      if (a.titre.toLowerCase() > b.titre.toLowerCase()) return ordreCroissant ? 1 : -1;
      return 0;
    });
    ordreCroissant = !ordreCroissant; // alterner A→Z puis Z→A
    afficherLivres();
  });
  
  // ===============================
  // 🔹 RECHERCHER PAR TITRE
  // ===============================
  const btnSearch = document.getElementById("btnSearch");
  btnSearch.addEventListener("click", rechercherLivre);
  
  function rechercherLivre() {
    const motCle = document.getElementById("searchInput").value.trim().toLowerCase();
    if (motCle === "") {
      afficherLivres();
      return;
    }
    const resultat = bibliotheque.filter((livre) =>
      livre.titre.toLowerCase().includes(motCle)
    );
    if (resultat.length === 0) {
      document.getElementById("catalogue").innerHTML = `<p>Aucun livre trouvé 😢</p>`;
    } else {
      afficherLivres(resultat);
    }
  }
  
  // ===============================
  // 🔹 STATISTIQUES
  // ===============================
  function afficherStats() {
    const total = bibliotheque.length;
    const dispo = bibliotheque.filter((livre) => livre.disponible).length;
    const valeurTotale = bibliotheque.reduce((somme, l) => somme + l.prix, 0);
    const moyennePrix = (valeurTotale / total).toFixed(2);
  
    // 🔸 Livre le plus cher
    const livreCher =
      bibliotheque.length > 0
        ? bibliotheque.reduce((max, l) => (l.prix > max.prix ? l : max))
        : null;
  
    let texteStats = `
      📚 Total: ${total} |
      ✅ Disponibles: ${dispo} |
      💰 Valeur totale: ${valeurTotale} DH |
      📈 Moyenne prix: ${moyennePrix} DH
    `;
  
    if (livreCher) {
      texteStats += ` | 🏆 Livre le plus cher: "${livreCher.titre}" (${livreCher.prix} DH)`;
    }
  
    document.getElementById("stats").innerText = texteStats;
  }
  
  // ===============================
  // 🔹 AJOUTER UN LIVRE (POPUP)
  // ===============================
  const btnAjouter = document.getElementById("btnAjouter");
  btnAjouter.addEventListener("click", () => {
    window.open("ajouter.html", "", "width=400,height=400");
  });
  
  function fenetreAjouter(nouvLivre) {
    bibliotheque.push(nouvLivre);
    afficherLivres();
  }
  window.fenetreAjouter = fenetreAjouter;
  
  // ===============================
  // 🔹 INITIALISATION
  // ===============================
  afficherLivres();