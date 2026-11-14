// Récupérer les travaux depuis l'API
async function getWorks() {
    const reponseServeur = await fetch("http://localhost:5678/api/works");
    const works = await reponseServeur.json();
    return works;
}

// Récupérer les catégories depuis l'API
async function getCategories() {
    const responseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await responseCategories.json();
    return categories;
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

// Mettre en vert le bouton cliqué
function activerBouton(boutonClique) {
    const tousLesBoutons = document.querySelectorAll(".filters button");

    for (const bouton of tousLesBoutons) {
        bouton.classList.remove("active");
    }

    boutonClique.classList.add("active");
}

// Afficher les boutons de filtres
function displayFilters(listeCategories, travauxAFiltrer) {
    const filtersContainer = document.querySelector(".filters");
    filtersContainer.innerHTML = "";

    const buttonTous = document.createElement("button");
    buttonTous.textContent = "Tous";
    buttonTous.classList.add("active");
    filtersContainer.appendChild(buttonTous);

    buttonTous.addEventListener("click", function () {
        activerBouton(buttonTous);
        displayWorks(travauxAFiltrer);
    });


    for (const categorie of listeCategories) {

        const button = document.createElement("button");
        button.textContent = categorie.name;
        filtersContainer.appendChild(button);

        button.addEventListener("click", function () {
            activerBouton(button);
            const travauxFiltres = travauxAFiltrer.filter(function (travail){
                return travail.categoryId === categorie.id; 
            }); 
            displayWorks(travauxFiltres);
        });

    }
}

// Point de départ : récupérer, puis afficher
async function init() {
    const listeTravaux = await getWorks();
    displayWorks(listeTravaux);

    const categoriesRecues = await getCategories();
    displayFilters(categoriesRecues, listeTravaux);
}

init(); 