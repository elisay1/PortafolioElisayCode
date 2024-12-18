"use strict";

/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * MOBILE NAVBAR TOGGLER
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

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
  totalSliderVisibleItems = Number(
    getComputedStyle(slider).getPropertyValue("--slider-items")
  );
  totalSlidableItems =
    sliderContainer.childElementCount - totalSliderVisibleItems;

  moveSliderItem();
});

/**
 * esto es para el dark
 */
const toggleIcon = document.querySelector(".toggle-icon");

toggleIcon.addEventListener("click", () => {
  toggleIcon.classList.toggle("bxs-sun");
  document.body.classList.toggle("dark-mode");
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
updateProgressBar("progressBar1", 80);
updateProgressBar("progressBar2", 50);
updateProgressBar("progressBar3", 30);
updateProgressBar("progressBar4", 60);
updateProgressBar("progressBar5", 35);
updateProgressBar("progressBar6", 40);
updateProgressBar("progressBar7", 34);
updateProgressBar("progressBar8", 45);
updateProgressBar("progressBar9", 60);
updateProgressBar("progressBar10", 41);
updateProgressBar("progressBar11", 80);
updateProgressBar("progressBar12", 55);
updateProgressBar("progressBar13", 99);
updateProgressBar("progressBar14", 29);
updateProgressBar("progressBar15", 40);
updateProgressBar("progressBar16", 34);

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const posts = document.querySelectorAll(".post");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const checkedCategories = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    posts.forEach((post) => {
      const postCategories = post.getAttribute("data-category").split(" ");

      // Comprueba si al menos una de las categorías del post está seleccionada
      const isVisible = postCategories.some((category) =>
        checkedCategories.includes(category)
      );

      if (isVisible) {
        post.style.display = "block";
      } else {
        post.style.display = "none";
      }
    });
  });
});

// Array de notificaciones personalizadas para el portafolio
const notifications = [
  {
    title: "¡Bienvenido a mi Portafolio! 👋",
    message: "Descubre mis proyectos y habilidades en desarrollo",
    icon: "bx bx-code-alt",
    color: "#00B0FF",
  },
  {
    title: "¡Nuevo Proyecto Flutter! 📱",
    message: "Mira mi última aplicación de Pokémon",
    icon: "bx bxl-flutter",
    color: "#54C5F8",
  },
  {
    title: "¡Desarrollo Web! 💻",
    message: "Revisa mis proyectos en HTML, CSS y JavaScript",
    icon: "bx bxl-html5",
    color: "#E44D26",
  },
  {
    title: "¡Sígueme en TikTok! 🎵",
    message: "Tutoriales y tips de programación @elisaycode",
    icon: "bx bxl-tiktok",
    color: "#00F2EA",
  },
  {
    title: "¡Nuevo en GitHub! 🚀",
    message: "Explora mi repositorio más reciente",
    icon: "bx bxl-github",
    color: "#171515",
  },
  {
    title: "¡Proyectos PHP! 🐘",
    message: "Sistema de gestión con MySQL",
    icon: "bx bxl-php",
    color: "#777BB3",
  },
  {
    title: "¡Sígueme en Instagram! 📸",
    message: "Contenido sobre programación @eli.sayes",
    icon: "bx bxl-instagram",
    color: "#E4405F",
  },

  {
    title: "Nuevo Proyecto Flutter 📱",
    message: "Revisa mi última aplicación de reservas para barbería",
    icon: "bx bxl-flutter",
    color: "#54C5F8",
  },
  {
    title: "Temas Claro y Oscuro 🌓",
    message: "Mira cómo implementé temas personalizados en Flutter",
    icon: "bx bx-palette",
    color: "#2196F3",
  },
  {
    title: "Fechas y Horas con Intl 📅",
    message:
      "Aprende a formatear fechas y horas en Flutter con el paquete Intl",
    icon: "bx bx-calendar",
    color: "#FF9800",
  },
  {
    title: "Gestión de Estados con Provider 🎯",
    message:
      "Descubre cómo manejo el estado de mi aplicación con el paquete Provider",
    icon: "bx bx-cog",
    color: "#8E44AD",
  },
  {
    title: "Diseño de Aplicación de Barbería 💈",
    message: "Explora el diseño de mi aplicación de reservas para barbería",
    icon: "bx bx-cut",
    color: "#FF5252",
  },
  {
    title: "Integración de Firebase 🔥",
    message: "Mira cómo integré Firebase para gestionar datos y autenticación",
    icon: "bx bxl-firebase",
    color: "#FFCA28",
  },
  {
    title: "Selección de Fechas y Horas 📆",
    message:
      "Revisa cómo permito a los usuarios seleccionar fechas y horas para reservas",
    icon: "bx bx-time",
    color: "#26A69A",
  },
  {
    title: "Diseño Personalizado de Widgets 🖌️",
    message: "Aprende cómo crear y personalizar widgets en Flutter",
    icon: "bx bx-brush",
    color: "#7E57C2",
  },
  {
    title: "Manejo de Errores y Excepciones ⚠️",
    message: "Mira cómo manejo errores y excepciones en mi aplicación Flutter",
    icon: "bx bx-error",
    color: "#EF5350",
  },
  {
    title: "Navegación y Rutas en Flutter 🗺️",
    message: "Descubre cómo implemento navegación y rutas en mi aplicación",
    icon: "bx bx-navigation",
    color: "#29B6F6",
  },
  {
    title: "Autenticación de Usuarios 🔐",
    message:
      "Revisa cómo manejo la autenticación de usuarios en mi app de barbería",
    icon: "bx bx-lock",
    color: "#66BB6A",
  },
  {
    title: "Llamadas a APIs con HTTP 📡",
    message:
      "Aprende cómo hago llamadas a APIs utilizando el paquete HTTP de Dart",
    icon: "bx bx-data",
    color: "#5C6BC0",
  },
  {
    title: "Uso de Widgets Stateful y Stateless 🧩",
    message:
      "Entiende la diferencia entre widgets stateful y stateless en Flutter",
    icon: "bx bx-copy",
    color: "#9575CD",
  },
  {
    title: "Implementación de Mapas 🗺️",
    message: "Mira cómo integro mapas en mi aplicación móvil con Flutter",
    icon: "bx bx-map",
    color: "#4CAF50",
  },
  {
    title: "Almacenamiento Local con SharedPreferences 💾",
    message:
      "Aprende cómo uso SharedPreferences para almacenamiento local en Flutter",
    icon: "bx bx-save",
    color: "#FFA726",
  },
  {
    title: "Animaciones y Transiciones ✨",
    message:
      "Descubre cómo creo animaciones y transiciones atractivas en Flutter",
    icon: "bx bx-shape-triangle",
    color: "#EC407A",
  },
  {
    title: "Integración con Google Maps 🌍",
    message: "Mira cómo integro Google Maps en mi aplicación móvil de barbería",
    icon: "bx bx-map-pin",
    color: "#AB47BC",
  },
  {
    title: "Manejo de Permisos 📝",
    message:
      "Aprende cómo manejo permisos de usuario en aplicaciones Android con Flutter",
    icon: "bx bx-check-shield",
    color: "#26C6DA",
  },
  {
    title: "Uso de Streams y Futuros 🌊",
    message:
      "Entiende cómo trabajo con streams y futures para programación asincrónica en Dart",
    icon: "bx bx-sync",
    color: "#FFA000",
  },
  {
    title: "Notificaciones Push 📩",
    message:
      "Descubre cómo implemento notificaciones push en aplicaciones Flutter",
    icon: "bx bx-bell",
    color: "#EF5350",
  },
  {
    title: "Arquitectura de Aplicación Escalable 📐",
    message:
      "Aprende sobre mi enfoque para crear una arquitectura de aplicación escalable",
    icon: "bx bx-building",
    color: "#5E35B1",
  },
  {
    title: "Widgets Reutilizables 🔄",
    message:
      "Mira cómo creo widgets reutilizables para un código más limpio y mantenible",
    icon: "bx bx-recycle",
    color: "#1DE9B6",
  },
  {
    title: "Pruebas Unitarias y de Widget 🧪",
    message:
      "Descubre cómo implemento pruebas unitarias y de widget en Flutter",
    icon: "bx bx-test-tube",
    color: "#A1887F",
  },
  {
    title: "Diseño Adaptable 📱💻",
    message:
      "Aprende cómo crear diseños adaptables para diferentes tamaños de pantalla",
    icon: "bx bx-devices",
    color: "#42A5F5",
  },
  {
    title: "Gestión de Paquetes 📦",
    message:
      "Mira cómo gestiono las dependencias y paquetes en mi aplicación Flutter",
    icon: "bx bx-package",
    color: "#7CB342",
  },
  {
    title: "Integración con Backend 🌐",
    message:
      "Aprende sobre mi estrategia para integrar Flutter con servicios backend",
    icon: "bx bx-cloud",
    color: "#FF7043",
  },
  {
    title: "Manejo de Imágenes y Cacheo 🖼️",
    message: "Descubre cómo cargo y cacheo imágenes eficientemente en Flutter",
    icon: "bx bx-image",
    color: "#CE93D8",
  },
  {
    title: "Localización e Internacionalización 🌍",
    message:
      "Mira cómo hago que mi aplicación sea compatible con múltiples idiomas",
    icon: "bx bx-world",
    color: "#FF8A65",
  },
  {
    title: "Manejo de Gestos 👆",
    message:
      "Aprende a manejar la entrada del usuario a través de gestos en Flutter",
    icon: "bx bx-hand",
    color: "#4DB6AC",
  },
  {
    title: "Persistencia de Datos con SQLite 💾",
    message: "Descubre cómo almaceno datos localmente usando SQLite en Flutter",
    icon: "bx bx-data",
    color: "#81C784",
  },
  {
    title: "Integración con Plataformas Nativas 🌉",
    message:
      "Aprende cómo mi aplicación Flutter interactúa con código nativo Android/iOS",
    icon: "bx bx-code-block",
    color: "#4DD0E1",
  },
  {
    title: "Gráficos y Visualizaciones 📊",
    message:
      "Mira cómo creo gráficos y visualizaciones atractivas en mis aplicaciones Flutter",
    icon: "bx bx-bar-chart-alt",
    color: "#F06292",
  },
  {
    title: "Optimización del Rendimiento 🏎️",
    message:
      "Descubre las técnicas que uso para optimizar el rendimiento de mis aplicaciones",
    icon: "bx bx-speed",
    color: "#BA68C8",
  },
  {
    title: "Publicación en las Tiendas de Aplicaciones 🚀",
    message:
      "Aprende sobre mi proceso para publicar aplicaciones en Google Play y App Store",
    icon: "bx bx-store",
    color: "#FFB74D",
  },
  {
    title: "Integración de Pagos 💳",
    message: "Mira cómo integro pasarelas de pago en mis aplicaciones móviles",
    icon: "bx bx-credit-card",
    color: "#A5D6A7",
  },
  {
    title: "Animaciones de Inicio 🎬",
    message:
      "Descubre cómo creo animaciones atractivas para las pantallas de inicio",
    icon: "bx bx-slideshow",
    color: "#4FC3F7",
  },
  {
    title: "Autenticación con Huella Dactilar y Face ID 🔒",
    message:
      "Aprende cómo implemento autenticación biométrica en aplicaciones Flutter",
    icon: "bx bx-fingerprint",
    color: "#9FA8DA",
  },
  {
    title: "Configuración de Temas Personalizados 🎨",
    message:
      "Mira cómo permito a los usuarios personalizar la apariencia de la aplicación",
    icon: "bx bx-paint",
    color: "#80CBC4",
  },
  {
    title: "Integración con Servicios de Terceros 🧩",
    message:
      "Descubre cómo integro servicios populares como Google Sign In y Facebook Login",
    icon: "bx bx-extension",
    color: "#BCAAA4",
  },
  {
    title: "Manejo Offline y Sincronización ⚡",
    message:
      "Aprende cómo mi aplicación maneja la funcionalidad offline y la sincronización de datos",
    icon: "bx bx-wifi-off",
    color: "#B39DDB",
  },
  {
    title: "Creación de Paquetes y Plugins 📦",
    message:
      "Mira cómo creo paquetes y plugins personalizados para compartir funcionalidad",
    icon: "bx bx-extension",
    color: "#C5E1A5",
  },
  {
    title: "Gráficos Personalizados Dibujados 🎨",
    message:
      "Descubre cómo dibujo gráficos personalizados usando el lienzo en Flutter",
    icon: "bx bx-paint",
    color: "#F48FB1",
  },
  {
    title: "Integración con Hardware del Dispositivo 📱",
    message:
      "Aprende cómo accedo a características del hardware como la cámara y el GPS",
    icon: "bx bx-chip",
    color: "#90CAF9",
  },
  {
    title: "Widgets Animados 🎥",
    message:
      "Mira cómo creo widgets con animaciones suaves y atractivas en Flutter",
    icon: "bx bx-shape-square",
    color: "#69F0AE",
  },
  {
    title: "Fuentes Personalizadas y Iconos 🆒",
    message:
      "Descubre cómo incluyo fuentes personalizadas e íconos en mis aplicaciones Flutter",
    icon: "bx bx-font",
    color: "#E6EE9C",
  },
  {
    title: "Implementación de Búsqueda 🔍",
    message:
      "Aprende cómo agrego capacidades de búsqueda a mis aplicaciones Flutter",
    icon: "bx bx-search-alt",
    color: "#CE93D8",
  },
  {
    title: "Manejo de Archivos y Descargas ⬇️",
    message: "Mira cómo manejo archivos y descargas en aplicaciones Flutter",
    icon: "bx bx-download",
    color: "#80DEEA",
  },
  {
    title: "Integración de Chat en Tiempo Real 💬",
    message:
      "Descubre cómo implemento funcionalidad de chat en tiempo real con Flutter",
    icon: "bx bx-chat",
    color: "#FFCC80",
  },
  {
    title: "Análisis de Datos y Seguimiento 📈",
    message:
      "Aprende cómo integro análisis de datos y seguimiento en mis aplicaciones móviles",
    icon: "bx bx-line-chart",
    color: "#FFAB91",
  },
];

// Estilos CSS mejorados para las notificaciones
const styles = `
  .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 1000;
  }

  .notification {
      position: relative;
      width: 320px;
      padding: 16px;
      background: rgba(1, 38, 63, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 176, 255, 0.2);
      display: flex;
      align-items: center;
      gap: 15px;
      transform: translateX(400px);
      transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .notification.show {
      transform: translateX(0);
  }

  .notification::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0.05)
      );
      border-radius: 12px;
      pointer-events: none;
  }

  .notification-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      background: rgba(255, 255, 255, 0.1);
      transition: transform 0.3s ease;
  }

  .notification:hover .notification-icon {
      transform: scale(1.1) rotate(5deg);
  }

  .notification i {
      font-size: 24px;
      color: var(--bg-carolina-blue);
  }

  .notification-content {
      flex: 1;
  }

  .notification-title {
      color: var(--white);
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      line-height: 1.4;
  }

  .notification-message {
      color: rgba(255, 255, 255, 0.7);
      margin: 4px 0 0;
      font-size: 14px;
      line-height: 1.4;
  }

  .notification-progress {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 0 0 12px 12px;
      overflow: hidden;
  }

  .notification-progress::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: var(--bg-carolina-blue);
      animation: progress 5s linear forwards;
  }

  @keyframes progress {
      from { width: 100%; }
      to { width: 0%; }
  }

  .notification.hide {
      transform: translateX(400px);
      opacity: 0;
  }

  @media (max-width: 768px) {
      .notification {
          width: 280px;
      }
  }
`;

// Crear contenedor para las notificaciones
function createNotificationContainer() {
  const container = document.createElement("div");
  container.className = "notification-container";
  document.body.appendChild(container);
  return container;
}

// Función para mostrar notificaciones
function showNotification(notification) {
  const container =
    document.querySelector(".notification-container") ||
    createNotificationContainer();

  const notificationElement = document.createElement("div");
  notificationElement.className = "notification";
  notificationElement.innerHTML = `
      <div class="notification-icon" style="background: ${notification.color}20;">
          <i class="${notification.icon}" style="color: ${notification.color}"></i>
      </div>
      <div class="notification-content">
          <h4 class="notification-title">${notification.title}</h4>
          <p class="notification-message">${notification.message}</p>
      </div>
      <div class="notification-progress"></div>
  `;

  container.appendChild(notificationElement);

  // Reproducir el audio cada vez que se muestra una notificación
  var audio = new Audio("assets/sounds/welcome.mp3");
  audio.play();

  // Forzar un reflow para activar la transición
  notificationElement.offsetHeight;
  notificationElement.classList.add("show");

  // Eliminar la notificación
  setTimeout(() => {
    notificationElement.classList.add("hide");
    setTimeout(() => {
      notificationElement.remove();
    }, 500);
  }, 5000);
}

// Función para iniciar el sistema de notificaciones
function startNotifications() {
  let index = 0;

  // Primera notificación después de 3 segundos
  setTimeout(() => {
    showNotification(notifications[index]);
    index = (index + 1) % notifications.length;
  }, 3000);

  // Notificaciones subsecuentes cada 15 segundos
  setInterval(() => {
    showNotification(notifications[index]);
    index = (index + 1) % notifications.length;
  }, 15000);
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
  startNotifications();
});
