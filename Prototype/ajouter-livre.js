const formLivre = document.getElementById("formLivre");

formLivre.addEventListener("submit", function (e) {
  e.preventDefault();

  const livre = {
    code:document.getElementById("code").value,
    titre: document.getElementById("titre").value,
    auteur: document.getElementById("auteur").value,
    annee:document.getElementById("annee").value,
    prix:document.getElementById("prix").value,
    disponible: document.getElementById("disponible").checked,
  };

  // if (window.opener && window.opener.fenetreAjouter) {
    window.opener.fenetreAjouter(livre);
  // }

  window.close();
});

