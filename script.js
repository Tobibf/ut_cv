// Date du CV
document.getElementById("current-date").textContent = new Date().toLocaleDateString("fr-FR");

// Calcul de l'age a partir de l'annee de naissance
var birthYear = 2000;
var currentYear = new Date().getFullYear();
document.getElementById("current-age").textContent = currentYear - birthYear;

// Slider de progression de lecture
var scrollSlider = document.createElement("div");
scrollSlider.className = "scroll-slider";
scrollSlider.innerHTML =
  '<div class="scroll-slider-track"><div class="scroll-slider-fill"></div></div><div class="scroll-slider-thumb"></div>';
document.body.appendChild(scrollSlider);

var sliderFill = scrollSlider.querySelector(".scroll-slider-fill");
var sliderThumb = scrollSlider.querySelector(".scroll-slider-thumb");

function updateScrollSlider() {
  var scrollTop = window.scrollY || document.documentElement.scrollTop;
  var docHeight = document.documentElement.scrollHeight - window.innerHeight;
  var progress = docHeight > 0 ? scrollTop / docHeight : 0;
  var clamped = Math.min(Math.max(progress, 0), 1);
  var percent = clamped * 100;

  sliderFill.style.width = percent + "%";
  sliderThumb.style.left = percent + "%";

  if (percent > 0.5) {
    scrollSlider.classList.add("show");
  } else {
    scrollSlider.classList.remove("show");
  }
}

// Bouton retour en haut
var toTopBtn = document.createElement("button");
toTopBtn.className = "to-top-btn";
toTopBtn.setAttribute("aria-label", "Retour en haut");
toTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(toTopBtn);

toTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function toggleToTopButton() {
  if (window.scrollY > 420) {
    toTopBtn.classList.add("show");
  } else {
    toTopBtn.classList.remove("show");
  }
}

// Animation d'apparition des sections
var sections = document.querySelectorAll("main section");
sections.forEach(function (section) {
  section.classList.add("reveal");
});

var revealObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

sections.forEach(function (section) {
  revealObserver.observe(section);
});

// Mise en evidence de la navigation selon la section visible
var navLinks = document.querySelectorAll("nav a[href^='#']");

function activateNavLink() {
  var currentSectionId = "";
  sections.forEach(function (section) {
    var rect = section.getBoundingClientRect();
    if (rect.top <= 130 && rect.bottom >= 130) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach(function (link) {
    var target = link.getAttribute("href").replace("#", "");
    if (target === currentSectionId) {
      link.classList.add("nav-active");
    } else {
      link.classList.remove("nav-active");
    }
  });
}

// Modal photo
function openModal() {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImage");
  var img = document.querySelector(".profile-picture-header");
  modal.style.display = "block";
  modalImg.src = img.src;
}

function closeModal() {
  var modal = document.getElementById("imageModal");
  modal.style.display = "none";
}

var modal = document.getElementById("imageModal");
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

var isTicking = false;
window.addEventListener("scroll", function () {
  if (isTicking) return;
  isTicking = true;
  window.requestAnimationFrame(function () {
    updateScrollSlider();
    toggleToTopButton();
    activateNavLink();
    isTicking = false;
  });
});

window.addEventListener("load", function () {
  updateScrollSlider();
  toggleToTopButton();
  activateNavLink();
});

window.addEventListener("resize", function () {
  updateScrollSlider();
  activateNavLink();
});
