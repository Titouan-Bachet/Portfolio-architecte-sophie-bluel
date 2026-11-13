// Récupérer les travaux depuis l'API
async function getWorks() {
  const reponseServeur = await fetch("http://localhost:5678/api/works");
  const works = await reponseServeur.json();
  return works;
}

// Afficher les travaux dans la galerie
function displayWorks(travauxAAfficher) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  for (const travail of travauxAAfficher) {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = travail.imageUrl;
    img.alt = travail.title;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = travail.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
}

// Point de départ : récupérer, puis afficher
async function init() {
  const listeTravaux = await getWorks();
  displayWorks(listeTravaux);
}

init();