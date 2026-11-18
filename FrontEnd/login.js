const formulaire = document.querySelector("#login form");


formulaire.addEventListener("submit", async function (event) {
    event.preventDefault();
    const champEmail = document.querySelector("#email");
    const champPassword = document.querySelector("#password");
    const identifiants = {
        email: champEmail.value,
        password: champPassword.value,
    };

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(identifiants)

    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
    } else {
        const messageErreur = document.querySelector("#erreur-connexion");
        messageErreur.textContent = "Erreur dans l'identifiant ou le mot de passe";
    }

}); 
