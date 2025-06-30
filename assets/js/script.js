'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Fonction pour normaliser le texte (supprimer les accents et mettre en minuscule)
const normalizeText = (text) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
};

// Sélection des liens de navigation et des pages
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Ajouter un événement "click" à chaque lien de navigation
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const selectedPage = normalizeText(this.innerText); // Normalisation du texte du bouton

    pages.forEach(page => {
      const pageName = normalizeText(page.dataset.page); // Normalisation du nom de la page

      if (selectedPage === pageName) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    // Mettre à jour l'état actif des liens de navigation
    navigationLinks.forEach(nav => nav.classList.remove("active"));
    this.classList.add("active");

    // Remonter en haut de la page
    window.scrollTo(0, 0);
  });
});

// Project modal variables
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalContent = document.querySelector("[data-project-modal-content]");

// Project data
const projectData = {
  fuelbot: {
    title: "FuelBot",
    description: "Application web permettant de réserver de l'essence et payer en ligne, puis aller se servir directement à la station-service. Le système offre une solution complète de réservation et paiement pour les carburants.",
    skills: ["Angular", "Spring Boot", "Java", "MySQL", "REST API", "Bootstrap", "JWT", "Maven"],
    rncpCompetencies: [
      "Développement d'applications web et mobiles",
      "Conception et développement d'architectures logicielles",
      "Gestion de bases de données et systèmes d'information",
      "Intégration de systèmes et services"
    ],
    github: "https://github.com/miage-amiens-organization/2024_M2_PRO-03_GR10",
    image: "./assets/images/fuelbot.png"
  },
  "billet-express": {
    title: "BilletExpress",
    description: "Site web de création et réservation d'événements en tout genre. Permet aux utilisateurs de créer, gérer et réserver des événements avec un système de gestion complet incluant la billetterie et la gestion des participants.",
    skills: ["Angular", "Spring Boot", "Java", "MySQL", "REST API", "Bootstrap", "JWT", "Maven", "Git"],
    rncpCompetencies: [
      "Développement d'applications web et mobiles",
      "Conception et développement d'architectures logicielles", 
      "Gestion de projets informatiques",
      "Intégration de systèmes et services",
      "Gestion de bases de données et systèmes d'information"
    ],
    github: "https://github.com/miage-amiens-organization/2023_M1_PRO-05_GR16",
    image: "./assets/images/billetexpress.png"
  },
  portfolio: {
    title: "Portfolio",
    description: "Site web personnel présentant mes compétences, expériences et projets. Développé avec des technologies modernes pour offrir une expérience utilisateur optimale et responsive.",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git", "GitHub Pages"],
    rncpCompetencies: [
      "Développement d'applications web et mobiles",
      "Conception d'interfaces utilisateur",
      "Gestion de projets informatiques",
      "Communication et présentation de projets"
    ],
    github: "https://github.com/Nathapvv/portfolio-2025",
    image: "./assets/images/portfolio.png"
  }
};

// Project modal toggle function
const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
  
  // Prevent body scroll when modal is open
  if (projectModalContainer.classList.contains("active")) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }
}

// Add click event to all project items
const projectItems = document.querySelectorAll("[data-project]");
projectItems.forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    
    const projectKey = this.getAttribute("data-project");
    const project = projectData[projectKey];
    
    if (project) {
      projectModalTitle.innerHTML = project.title;
      
      const skillsHTML = project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
      
      projectModalContent.innerHTML = `
        <div class="project-modal-image">
          <img src="${project.image}" alt="${project.title}" width="300">
        </div>
        <div class="project-modal-description">
          <h5>Description</h5>
          <p>${project.description}</p>
        </div>
        <div class="project-modal-skills">
          <h5>Technologies utilisées</h5>
          <div class="skills-container">
            ${skillsHTML}
          </div>
        </div>
        <div class="project-modal-rncp">
          <h5>Compétences RNCP Master MIAGE</h5>
          <div class="rncp-container">
            ${project.rncpCompetencies.map(comp => `<span class="rncp-tag">${comp}</span>`).join('')}
          </div>
        </div>
        <div class="project-modal-links">
          <a href="${project.github}" target="_blank" class="github-link">
            <ion-icon name="logo-github"></ion-icon>
            Voir sur GitHub
          </a>
        </div>
      `;
      
      projectModalFunc();
    }
  });
});

// Add click event to project modal close button
if (projectModalCloseBtn) {
  projectModalCloseBtn.addEventListener("click", projectModalFunc);
}
if (projectOverlay) {
  projectOverlay.addEventListener("click", projectModalFunc);
} 