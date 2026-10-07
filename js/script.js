async function loadCV() {

    //response représente la réponse du serveur. Elle contient notamment le contenu de ton fichier JSON.
    //Mais ce contenu n'est pas encore directement utilisable comme objet JavaScript.
    const response = await fetch("data/cv.json");

    //Attends que le JSON soit récupéré et transformé (await), puis stocke le résultat dans une constante appelée cv
    const cv = await response.json();

    //On affiche dans la console le prénom
    console.log(cv.personal.firstName);

    return cv;
}

async function main() {

    const cv = await loadCV();

    console.log(cv);

    //Informations personnelles
    document.getElementById("nom").textContent = `${cv.personal.firstName} ${cv.personal.lastName}`;
    document.getElementById("titre").textContent = cv.personal.jobTitle;

    let lientel = "<img src=\"img/phone.png\" class=\"icone\"/> <a href=\"tel:" + cv.personal.phone + "\"> Me téléphoner </a>";
    document.getElementById("phone").innerHTML = lientel;

    let lienmail = "<img src=\"img/mail.png\" class=\"icone\"/> <a href=\"mailto:" + cv.personal.email + "\"> M'envoyer un mail </a>";
    document.getElementById("email").innerHTML = lienmail;

    let lienadresse = "<img src=\"img/address.png\" class=\"icone\"/>" + cv.personal.city;
    document.getElementById("ville").innerHTML = lienadresse;

    //Partie description
    afficheDescription(cv.profile);

    //Partie compétences
    afficheCompetences(cv.skills);

    //Partie formations
    afficheFormations(cv.education);

    //Partie expériences
    afficheExperiences(cv.experiences);

    //Partie projets
    afficheProjets(cv.projects);

    //Partie langues
    afficheLangues(cv.languages);

    //Partie centres d'intérêts
    afficheInterets(cv.interests);
    
    //Bouton pour afficher/masquer +/-
    ajouterBoutonAfficherMasquer(
        document.getElementById("bouton-competences"),
        document.getElementById("competences")
    );

    ajouterBoutonAfficherMasquer(
        document.getElementById("bouton-langues"),
        document.getElementById("langues")
    );

    ajouterBoutonAfficherMasquer(
        document.getElementById("bouton-interets"),
        document.getElementById("interets")
    );

    //Panneau de navigation
    const boutons = document.querySelectorAll(".navigation button");
    const panneaux = document.querySelectorAll(".panneau-menu");

    //Bouton contact désolidarisé des autres
    const boutonContact = document.querySelector(".bouton-contact");

    //Action sur le clic des boutons de navigation
    boutons.forEach(function(bouton) {
        bouton.addEventListener("click", function() {

            const cible = bouton.dataset.cible;

            panneaux.forEach(function(panneau) {
                panneau.classList.remove("actif");
            });

            boutons.forEach(function(b) {
                b.classList.remove("actif");
            });

            document.getElementById(cible).classList.add("actif");
            bouton.classList.add("actif");
        });
    });

    //Action sur le clic du bouton contact
    boutonContact.addEventListener("click", function() {

        const contact = document.getElementById("contact");

        if (contact.classList.contains("actif")) {
            contact.classList.remove("actif");
            boutonContact.classList.remove("actif");
        } else {
            contact.classList.add("actif");
            boutonContact.classList.add("actif");
        }

    });
}

//Fonctions pour charger les éléments suivant le type (pour réduire un peu le main)
//Fonction qui met la description dans le sélecteur ayant pour id description
function afficheDescription(profile) {
    const container = document.querySelector("#description");
    container.textContent = profile;
}

//Fonction qui affiche les compétences
function afficheCompetences(skills) {
    const container = document.querySelector("#competences");

    skills.forEach(function(skill) {

        const element = document.createElement("div");

        //boostrap
        element.classList.add(
            "d-flex",
            "justify-content-between",
            "align-items-center",
            "p-2",
            "bg-white",
            "rounded",
            "mb-2"
        );
        element.innerHTML = `
            <strong>${skill.name}</strong>
            <span class="badge text-bg-dark">${skill.level}</span>
        `;

        container.appendChild(element);
    });
}

//Fonction qui affiche les formations
function afficheFormations(formations) {
    const container = document.querySelector("#formations");

    formations.forEach(item => {

        const element = document.createElement("article");

        element.innerHTML = `
            <div class="titre-formation">
            <h3>${item.degree}</h3>
            <p class="date">
                ${formatDate(item.startDate)}
                    —
                ${formatDate(item.endDate)}
            </p>
            </div>
            ${item.school} - ${item.location}
            <p>${item.description}</p>
        `;

        container.appendChild(element);
    });
}

//Fonction qui affiche les expériences
function afficheExperiences(experiences) {

    const container = document.querySelector("#experiences");

    experiences.forEach(function(experience) {

        const element = document.createElement("article");

        element.innerHTML = `
            <div class="titre-experience">
                <h3>${experience.position}</h3>
                <p class="date">  ${formatDate(experience.startDate)} — ${formatDate(experience.endDate)}  </p>
            </div>
            <p class="company">
                ${experience.company} - ${experience.location} 
            </p>
            <p>${experience.description}</p>
            <div><div class="technologies"></div></div>
        `;

        const technologies = element.querySelector(".technologies");
        technologies.classList.add("blocElements");


        experience.technologies.forEach(function(technology) {
            technologies.innerHTML += `
                <span class="element">${technology}</span>
            `;

        });

        container.appendChild(element);
    });
}

//Fonction qui affiche les projets
function afficheProjets(projets) {

    const container = document.querySelector("#projets");

    projets.forEach(function(project) {

        const element = document.createElement("article");

        element.innerHTML = `
            <h3>${project.name}</h3>

            <p>${project.description}</p>

            <div class="technologies blocElements"></div>
        `;

        const technologies = element.querySelector(".technologies");

        project.technologies.forEach(function(technology) {
            technologies.innerHTML += `
                <span class="element">${technology}</span>
            `;

        });

        container.appendChild(element);
    });
}

//Fonction pour afficher les langues
function afficheLangues(langues){
    const container = document.querySelector("#langues");

    const list = document.createElement("div");

    langues.forEach(language => {

        const item = document.createElement("div");
        //bootstrap
        item.classList.add(
            "d-flex",
            "justify-content-between",
            "align-items-center",
            "p-2",
            "bg-white",
            "rounded",
            "mb-2"
        );

        item.innerHTML = `
            <strong>${language.name}</strong>
            <span class="text-muted">${language.level}</span>
        `;

        list.appendChild(item);
    });

    container.appendChild(list);
}

function afficheInterets(interets){
    const container = document.querySelector("#interets");

    interets.forEach(interest => {

        const element = document.createElement("span");

        element.classList.add(
            "badge",
            "text-bg-dark",
            "p-2"
        );

        element.textContent = interest;

        container.appendChild(element);
    });
}

//Fonction pour ajouter un bouton afficher/masquer +/- 
function ajouterBoutonAfficherMasquer(bouton, contenu) {
    //On ajoute l'EventListener sur le bouton avec notre fonction comme réponse du click
    bouton.addEventListener("click", function() {
        if (contenu.classList.contains("visible")) {

             // Le contenu est visible → on le rend invisible
            contenu.classList.remove("visible");
            contenu.classList.add("invisible");

            bouton.textContent = "+";
        } else {
            // Le contenu est invisible → on le rend visible
            contenu.classList.remove("invisible");
            contenu.classList.add("visible");

            bouton.textContent = "−";
        }
    });
}

function formatDate(date) {

    if (!date) {
        return "Aujourd'hui";
    }

    // Si seule l'année est renseignée
    if (!date.includes("-")) {
        return date;
    }

    const [annee, mois] = date.split("-");

    const moisNoms = [
        "Janvier", "Février", "Mars", "Avril",
        "Mai", "Juin", "Juillet", "Août",
        "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    return `${moisNoms[parseInt(mois) - 1]} ${annee}`;
}

main();
