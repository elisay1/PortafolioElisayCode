'use strict';



/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * MOBILE NAVBAR TOGGLER
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);



/**
 * HEADER ANIMATION
 * When scrolled donw to 100px header will be active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});


// Obtener el año actual
var year = new Date().getFullYear();

// Insertar el año actual en el elemento con el id "year"
document.getElementById("year").textContent = year;

/**
 * RESPONSIVE
 */
window.addEventListener("resize", function () {
  totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  moveSliderItem();
});

/**
 * esto es para el dark
 */
const toggleIcon = document.querySelector('.toggle-icon');

toggleIcon.addEventListener('click', () =>{
    toggleIcon.classList.toggle('bxs-sun');
    document.body.classList.toggle('dark-mode');
});


 // Función para actualizar una barra de progreso
 function updateProgressBar(barId, targetValue) {
  let progress = 0;
  const progressBar = document.getElementById(barId); 

  function updateProgress() {
    if (progress < targetValue) {
      progress += 1;
      progressBar.style.width = `${progress}%`;
      progressBar.innerText = `${progress}%`;
      setTimeout(updateProgress, 40); // Actualiza cada décima de segundo
    }
  }

  updateProgress();
}

// Llama a la función para cada barra de progreso
updateProgressBar('progressBar1', 80); 
updateProgressBar('progressBar2', 50); 
updateProgressBar('progressBar3', 30); 
updateProgressBar('progressBar4', 60);
updateProgressBar('progressBar5', 35);
updateProgressBar('progressBar6', 40);
updateProgressBar('progressBar7', 34);
updateProgressBar('progressBar8', 45);
updateProgressBar('progressBar9', 60);
updateProgressBar('progressBar10', 41);
updateProgressBar('progressBar11', 80);
updateProgressBar('progressBar12', 55);
updateProgressBar('progressBar13', 99);
updateProgressBar('progressBar14', 29);
updateProgressBar('progressBar15', 40);
updateProgressBar('progressBar16', 34);

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const posts = document.querySelectorAll('.post');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const checkedCategories = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    posts.forEach(post => {
      const postCategories = post.getAttribute('data-category').split(' ');

      // Comprueba si al menos una de las categorías del post está seleccionada
      const isVisible = postCategories.some(category => checkedCategories.includes(category));

      if (isVisible) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });
  });
});

