
"use strict";

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar el preloader primero
  initPreloader();
});

/**
 * PRELOADER
 * Animación de carga inicial con efectos visuales mejorados
 */
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  const progressBar = document.querySelector('.preloader-progress-bar');
  const letters = document.querySelectorAll('.preloader-logo .letter');
  
  if (!preloader || !progressBar) return;
  
  // Animar letras individualmente
  letters.forEach((letter, index) => {
    letter.style.opacity = '0';
    letter.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      letter.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      letter.style.opacity = '1';
      letter.style.transform = 'translateY(0)';
    }, index * 150);
  });
  
  // Simular progreso de carga con efecto de aceleración
  let width = 0;
  let speed = 1;
  const maxSpeed = 3;
  
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      
      // Pequeña pausa antes de ocultar el preloader
      setTimeout(() => {
        preloader.style.transition = 'opacity 0.8s ease-out, visibility 0.8s ease-out';
        preloader.classList.add('loaded');
        
        // Inicializar el resto de la aplicación cuando el preloader termine
        setTimeout(() => {
          initApp();
          
          // Mostrar notificación de bienvenida con animación
          setTimeout(() => {
            showNotification({
              title: '¡Bienvenido a mi portafolio!',
              message: 'Explora mis proyectos y conecta conmigo',
              icon: 'bx bx-code-alt',
              color: '#01A4F7' // Color cyan
            });
          }, 500);
        }, 300);
      }, 500);
    } else {
      // Incremento con aceleración gradual para efecto realista
      speed = Math.min(maxSpeed, speed + 0.05);
      width += Math.floor(Math.random() * speed) + 0.5;
      
      if (width > 100) width = 100;
      progressBar.style.width = width + '%';
    }
  }, 100);
  
  // Por seguridad, asegurar que el preloader se oculte después de cierto tiempo
  setTimeout(() => {
    if (!preloader.classList.contains('loaded')) {
      clearInterval(interval);
      progressBar.style.width = '100%';
      
      setTimeout(() => {
        preloader.classList.add('loaded');
        initApp();
      }, 500);
    }
  }, 6000);
}

/**
 * INICIALIZACIÓN DE LA APLICACIÓN
 * Punto de entrada principal después del preloader
 */
function initApp() {
  // Inicializar componentes principales
  initNavigation();
  initScrollEvents();
  initThemeToggle();
  initSkillsTabs();
  initSkillsAnimation();
  initProjectsWithAJAX();
  initProjectFilters();
  initProjectSearch();
  initContactForm();
  initAuthModals();
  initCommunityEvents();
  initBackToTop();
  initHeroAnimations();
  initParallaxEffects();
  initAnimatedElements();
  initHoverEffects();
  init3DEffects();
  initLightboxGallery();
  initTestimonialsSlider();
  initClientsSlider();
  initBlogSlider();
  initFooterYear();


// Obtener el año actual para el copyright
updateCopyrightYear();
}

/**
 * UTILIDADES
 * Funciones auxiliares reutilizables
 */

// Añadir eventos a múltiples elementos
function addEventOnElements(elements, eventType, callback) {
  if (!elements) return;
  
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

// Función de debounce para limitar la frecuencia de ejecución
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// Función throttle para limitar la frecuencia de ejecución
function throttle(callback, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
}

// Función para animar valores numéricos con efecto de conteo
function animateNumber(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end;
    }
  };
  window.requestAnimationFrame(step);
}

// Función para detectar si un elemento está en el viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0 &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right >= 0
  );
}

// Función para aplicar efecto parallax
function applyParallax(element, speed) {
  const offsetY = window.pageYOffset;
  element.style.transform = `translateY(${offsetY * speed}px)`;
}

/**
 * NAVEGACIÓN
 * Header, menú móvil y eventos de scroll
 */
function initNavigation() {
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-toggle');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.navbar-link');
  const overlay = document.createElement("div");
  
  // Configurar overlay para cuando se abre el menú móvil
  overlay.className = 'mobile-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 19, 51, 0.85)';
  overlay.style.backdropFilter = 'blur(10px)';
  overlay.style.zIndex = '25';
  overlay.style.opacity = '0';
  overlay.style.visibility = 'hidden';
  overlay.style.transition = 'opacity 0.5s cubic-bezier(0.77, 0, 0.175, 1), visibility 0.5s cubic-bezier(0.77, 0, 0.175, 1)';
  document.body.appendChild(overlay);
  
  // Añadir índice a enlaces de navegación para animación escalonada
  navLinks.forEach((link, index) => {
    link.style.setProperty('--item-index', index);
  });
  
  // Mostrar/ocultar menú móvil al hacer clic en el botón de navegación
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isActive = navbar.classList.contains('active');
      
      if (!isActive) {
        // Abrir menú
        navbar.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        
        // Animar enlaces del menú
        navLinks.forEach((link, index) => {
          setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
          }, 100 + (index * 100));
        });
      } else {
        // Cerrar menú
        navbar.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        
        // Restablecer animación de enlaces
        navLinks.forEach(link => {
          link.style.opacity = '0';
          link.style.transform = 'translateY(20px)';
        });
      }
    });
  }
  
  // Cerrar menú al hacer clic en el overlay
  overlay.addEventListener('click', () => {
    navbar.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    
    // Restablecer animación de enlaces
    navLinks.forEach(link => {
      link.style.opacity = '0';
      link.style.transform = 'translateY(20px)';
    });
  });
  
  // Cerrar menú al hacer clic en un enlace
  addEventOnElements(navLinks, 'click', () => {
    navbar.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
  });
  
  // Animación del botón toggle en móvil con efecto suavizado
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      
      const spans = this.querySelectorAll('span');
      
      if (this.classList.contains('active')) {
        // Animar a estado abierto
        spans[0].style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), background 0.3s ease';
        spans[1].style.transition = 'opacity 0.2s ease';
        spans[2].style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), background 0.3s ease';
        
        spans[0].style.transform = 'translateY(9px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        
        // Cambiar colores gradualmente
        setTimeout(() => {
          spans[0].style.background = 'linear-gradient(90deg, #dc286f, #9D6BEE)';
          spans[2].style.background = 'linear-gradient(90deg, #9D6BEE, #dc286f)';
        }, 150);
      } else {
        // Animar a estado cerrado
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        
        // Revertir colores
        spans[0].style.background = '';
        spans[2].style.background = '';
      }
    });
  }
}

/**
 * SCROLL EVENTS
 * Manejo de eventos relacionados con el scroll
 */
function initScrollEvents() {
  const header = document.querySelector('.header');
  const backTopBtn = document.querySelector('.back-top-btn');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-link');
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Observer para animaciones al hacer scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Añadir clase y animar con retraso progresivo si hay múltiples elementos
        const childElements = entry.target.querySelectorAll('[data-delay]');
        if (childElements.length) {
          childElements.forEach(el => {
            const delay = el.dataset.delay || 0;
            setTimeout(() => {
              el.classList.add('animated');
            }, delay);
          });
        }
        
        entry.target.classList.add('animated');
        
        // Animar contadores numéricos si existen
        const counters = entry.target.querySelectorAll('.stat-value');
        counters.forEach(counter => {
          const target = parseInt(counter.textContent.replace(/[^\d]/g, ''), 10);
          animateNumber(counter, 0, target, 2000);
        });
      }
    });
  };
  
  const observer = new IntersectionObserver(handleIntersection, observerOptions);
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Función para manejar eventos de scroll (throttled para rendimiento)
  const handleScroll = throttle(() => {
    // Añadir/quitar clase scrolled al header con efecto
    if (window.scrollY > 50) {
      if (!header.classList.contains('scrolled')) {
        header.classList.add('scrolled');
        // Añadir efecto de aparición
        header.style.animation = 'headerFadeIn 0.5s forwards';
      }
      
      // Mostrar botón de volver arriba con animación
      if (!backTopBtn.classList.contains('active')) {
        backTopBtn.classList.add('active');
        backTopBtn.style.animation = 'backTopBtnFadeIn 0.5s forwards';
      }
    } else {
      header.classList.remove('scrolled');
      header.style.animation = '';
      
      backTopBtn.classList.remove('active');
      backTopBtn.style.animation = '';
    }
    
    // Actualizar enlaces activos en la navegación para reflejar la sección actual
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
            // Añadir efecto de resaltado
            link.style.animation = 'pulse 0.5s ease';
            
            // Quitar la animación después
            setTimeout(() => {
              link.style.animation = '';
            }, 500);
          }
        });
      }
    });
    
    // Efecto parallax para fondos y elementos decorativos
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.1;
      applyParallax(element, speed);
    });
  }, 100);
  
  // Añadir event listener para el scroll
  window.addEventListener('scroll', handleScroll);
  
  // Ejecutar una vez al inicio para establecer el estado inicial
  handleScroll();
  
  // Añadir animación de entrada para CSS
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes headerFadeIn {
      from { transform: translateY(-100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes backTopBtnFadeIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(styleSheet);
}

/**
 * TOGGLE DE TEMA
 * Cambio entre modo claro y oscuro con animaciones
 */
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Recuperar preferencia del usuario
  const savedTheme = localStorage.getItem('theme');
  
  // Función para aplicar transición suave al cambiar el tema
  const applyThemeTransition = () => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      body * {
        transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease !important;
      }
    `;
    document.head.appendChild(styleSheet);
    
    // Quitar las transiciones después
    setTimeout(() => {
      document.head.removeChild(styleSheet);
    }, 500);
  };
  
  // Aplicar tema guardado o predeterminado del sistema
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-mode');
    updateThemeIcon(true);
  } else if (savedTheme === 'dark') {
    document.documentElement.classList.remove('light-mode');
    updateThemeIcon(false);
  } else {
    // Usar preferencia del sistema
    if (prefersDarkScheme.matches) {
      document.documentElement.classList.remove('light-mode');
      updateThemeIcon(false);
    } else {
      document.documentElement.classList.add('light-mode');
      updateThemeIcon(true);
    }
  }
  
  // Cambiar tema al hacer clic en el botón con animación
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Aplicar transición suave a todos los elementos
      applyThemeTransition();
      
      if (document.documentElement.classList.contains('light-mode')) {
        document.documentElement.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon(false);
        
        // Mostrar notificación de cambio de tema
        showNotification({
          title: 'Modo Oscuro Activado',
          message: 'Has cambiado al tema oscuro.',
          icon: 'bx bxs-moon',
          color: '#9D6BEE'
        });
      } else {
        document.documentElement.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        updateThemeIcon(true);
        
        // Mostrar notificación de cambio de tema
        showNotification({
          title: 'Modo Claro Activado',
          message: 'Has cambiado al tema claro.',
          icon: 'bx bxs-sun',
          color: '#F8B133'
        });
      }
    });
  }
  
  // Actualizar el ícono del botón según el tema con animación
  function updateThemeIcon(isLight) {
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    
    if (isLight) {
      // Animar transición
      icon.style.transform = 'rotate(360deg) scale(0)';
      
      setTimeout(() => {
        icon.classList.remove('bxs-moon');
        icon.classList.add('bxs-sun');
        icon.style.transform = 'rotate(0) scale(1)';
      }, 150);
    } else {
      // Animar transición
      icon.style.transform = 'rotate(360deg) scale(0)';
      
      setTimeout(() => {
        icon.classList.remove('bxs-sun');
        icon.classList.add('bxs-moon');
        icon.style.transform = 'rotate(0) scale(1)';
      }, 150);
    }
  }
}

/**
 * TABS DE HABILIDADES
 * Sistema de pestañas para la sección de habilidades con animaciones
 */
function initSkillsTabs() {
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillContents = document.querySelectorAll('.skills-grid');
  
  // Añadir animación de entrada inicial para la primera pestaña
  if (skillContents[0]) {
    setTimeout(() => {
      skillContents[0].querySelectorAll('.skill-card').forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }, 500);
  }
  
  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Quitar clase activa de todas las pestañas con efecto
      skillTabs.forEach(t => {
        if (t.classList.contains('active')) {
          t.classList.remove('active');
          t.style.transform = 'translateY(0)';
        }
      });
      
      // Añadir clase activa a la pestaña clickeada con efecto
      tab.classList.add('active');
      tab.style.transform = 'translateY(-5px)';
      
      // Efecto de rebote después de la transición
      setTimeout(() => {
        tab.style.transform = 'translateY(0)';
      }, 300);
      
      // Obtener el contenido asociado a esta pestaña
      const tabContent = tab.getAttribute('data-tab');
      
      // Ocultar todos los contenidos con fade out
      skillContents.forEach(content => {
        if (content.classList.contains('active')) {
          // Animar salida
          const cards = content.querySelectorAll('.skill-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
            }, index * 50);
          });
          
          // Quitar clase después de la animación
          setTimeout(() => {
            content.classList.remove('active');
          }, cards.length * 50 + 200);
        }
      });
      
      // Mostrar el contenido correspondiente con fade in
      const activeContent = document.querySelector(`.skills-grid[data-content="${tabContent}"]`);
      
      setTimeout(() => {
        activeContent.classList.add('active');
        
        // Animar entrada de tarjetas escalonadamente
        const cards = activeContent.querySelectorAll('.skill-card');
        cards.forEach((card, index) => {
          // Reiniciar estilos
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }, 400);
    });
  });
}

/**
 * ANIMACIÓN DE BARRAS DE HABILIDADES
 * Animación de las barras de progreso al hacer scroll
 */
function initSkillsAnimation() {
  const skillsSection = document.querySelector('.skills');
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach((bar, index) => {
          const targetProgress = bar.getAttribute('data-progress') || '75';
          
          // Retardo progresivo para que las barras se animen secuencialmente
          setTimeout(() => {
            // Añadir efecto de brillo al final
            bar.style.transition = `width 1.5s cubic-bezier(0.18, 0.89, 0.32, 1.28)`;
            bar.style.width = `${targetProgress}%`;
            
            // Añadir efecto de resplandor al completar
            bar.innerHTML = `<span class="progress-glow"></span>`;
            
            // Mostrar porcentaje al lado de la barra
            const progressContainer = bar.closest('.progress-container');
            const progressText = document.createElement('span');
            progressText.className = 'progress-text';
            progressText.textContent = `${targetProgress}%`;
            progressText.style.position = 'absolute';
            progressText.style.right = '0';
            progressText.style.top = '-20px';
            progressText.style.fontSize = '12px';
            progressText.style.color = 'var(--color-cyan-600)';
            progressText.style.opacity = '0';
            progressText.style.transition = 'opacity 0.5s ease';
            
            progressContainer.appendChild(progressText);
            
            setTimeout(() => {
              progressText.style.opacity = '1';
            }, 500);
          }, index * 200);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  if (skillsSection) {
    observer.observe(skillsSection);
  }
  
  // Añadir los estilos de animación para el brillo
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .progress-glow {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 15px;
      background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5));
      animation: progressGlow 1.5s ease-in-out infinite;
    }
    
    @keyframes progressGlow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
  `;
  document.head.appendChild(styleSheet);
}

/**
 * FILTRADO DE PROYECTOS CON AJAX
 * Implementación de filtrado de proyectos con simulación AJAX y animaciones
 */
function initProjectsWithAJAX() {
  const projectsGrid = document.querySelector('.projects-grid');
  const projectsLoader = document.querySelector('.projects-loader');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!projectsGrid) return;
  
  // Añadir efecto de entrada inicial a los proyectos
  setTimeout(() => {
    projectCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, index * 100);
    });
  }, 500);
  
  // Función para simular carga AJAX con animaciones
  window.loadProjects = async (filterValue) => {
    // Ocultar la cuadrícula de proyectos con animación
    projectsGrid.style.opacity = '0';
    projectsGrid.style.transform = 'translateY(20px)';
    
    // Mostrar el loader con animación
    projectsLoader.classList.add('active');
    const dots = projectsLoader.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.style.animation = `loader-animation 1.5s ${index * 0.2}s infinite ease-in-out`;
    });
    
    // Simulación de petición AJAX
    await mockAjaxRequest();
    
    // Filtrar proyectos con una animación suave
    const filteredCards = filterProjects(filterValue);
    
    // Ocultar el loader con animación
    projectsLoader.classList.remove('active');
    dots.forEach(dot => {
      dot.style.animation = '';
    });
    
    // Mostrar la cuadrícula de proyectos con animación
    projectsGrid.style.opacity = '1';
    projectsGrid.style.transform = 'translateY(0)';
    
    // Animar entrada de cada tarjeta filtrada
    setTimeout(() => {
      filteredCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, index * 100);
      });
    }, 300);
    
    return filteredCards;
  };
  
  // Filtrar proyectos según la categoría
  function filterProjects(category) {
    const filteredCards = [];
    
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      // Restablecer estilos
      card.style.display = 'flex';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      
      // Comprobar si se debe mostrar esta tarjeta
      if (category === 'all' || cardCategory.includes(category)) {
        filteredCards.push(card);
      } else {
        card.style.display = 'none';
      }
    });
    
    return filteredCards;
  }
  
  // Simulación de petición AJAX
  function mockAjaxRequest() {
    return new Promise(resolve => {
      // Simular tiempo de carga entre 0.8 y 1.5 segundos
      const loadTime = Math.random() * 700 + 800;
      setTimeout(() => {
        resolve();
      }, loadTime);
    });
  }
}

/**
 * FILTROS DE PROYECTOS
 * Funcionalidad mejorada de filtrado con animaciones
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  if (!filterBtns.length) return;
  
  // Configurar el primer botón como activo por defecto
  if (filterBtns[0]) {
    filterBtns[0].classList.add('active');
  }
  
  // Añadir evento de clic a los botones de filtrado
  filterBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      // Si ya está activo, no hacer nada
      if (btn.classList.contains('active')) return;
      
      // Actualizar clases activas con efecto
      filterBtns.forEach(b => {
        if (b.classList.contains('active')) {
          b.classList.remove('active');
          // Añadir efecto de salida
          b.style.transform = 'translateY(0)';
        }
      });
      
      // Añadir clase activa con efecto
      btn.classList.add('active');
      btn.style.transform = 'translateY(-5px)';
      
      // Efecto de rebote después de la transición
      setTimeout(() => {
        btn.style.transform = 'translateY(0)';
      }, 300);
      
      // Obtener categoría a filtrar
      const filterValue = btn.getAttribute('data-filter');
      
      // Cargar proyectos con animación
      const filteredCards = await window.loadProjects(filterValue);
      
      // Mostrar mensaje si no hay resultados
      updateNoResultsMessage(filteredCards.length === 0);
    });
  });
  
  // Función para mostrar/ocultar mensaje de "sin resultados"
  function updateNoResultsMessage(show) {
    let noResultsMessage = document.querySelector('.no-results-message');
    
    if (!noResultsMessage && show) {
      // Crear mensaje si no existe
      noResultsMessage = document.createElement('div');
      noResultsMessage.className = 'no-results-message animate-on-scroll';
      noResultsMessage.textContent = 'No se encontraron proyectos que coincidan con tu búsqueda.';
      noResultsMessage.style.textAlign = 'center';
      noResultsMessage.style.padding = '2rem';
      noResultsMessage.style.color = 'var(--color-text-tertiary)';
      noResultsMessage.style.width = '100%';
      noResultsMessage.style.opacity = '0';
      noResultsMessage.style.transform = 'translateY(20px)';
      noResultsMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      
      // Añadir ícono
      const icon = document.createElement('i');
      icon.className = 'bx bx-search-alt';
      icon.style.fontSize = '48px';
      icon.style.display = 'block';
      icon.style.margin = '0 auto 1rem';
      icon.style.color = 'var(--color-cyan-600)';
      
      noResultsMessage.prepend(icon);
      
      // Añadir al DOM
      const projectsGrid = document.querySelector('.projects-grid');
      if (projectsGrid) {
        projectsGrid.parentNode.insertBefore(noResultsMessage, projectsGrid.nextSibling);
      }
    }
    
    if (noResultsMessage) {
      if (show) {
        // Mostrar con animación
        setTimeout(() => {
          noResultsMessage.style.display = 'block';
          
          setTimeout(() => {
            noResultsMessage.style.opacity = '1';
            noResultsMessage.style.transform = 'translateY(0)';
          }, 50);
        }, 300);
      } else {
        // Ocultar con animación
        noResultsMessage.style.opacity = '0';
        noResultsMessage.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          noResultsMessage.style.display = 'none';
        }, 500);
      }
    }
  }
}

/**
 * BÚSQUEDA DE PROYECTOS
 * Filtrado de proyectos mediante búsqueda en tiempo real con efectos visuales
 */
function initProjectSearch() {
  const searchInput = document.querySelector('.projects-search input');
  const projectCards = document.querySelectorAll('.project-card');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  if (!searchInput || !projectCards.length) return;

  
  // Buscar proyectos mientras se escribe (con debounce para rendimiento)
  searchInput.addEventListener('input', debounce(async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    // Si el campo está vacío, volver al filtro "all"
    if (!searchTerm) {
      // Actualizar botón activo
      filterBtns.forEach(btn => {
        btn.classList.remove('active');
      });
      const allFilter = document.querySelector('.filter-btn[data-filter="all"]');
      if (allFilter) {
        allFilter.classList.add('active');
      }
      
      // Mostrar todos los proyectos
      await window.loadProjects('all');
      return;
    }
    
    // Realizar efecto de búsqueda
    if (searchIcon) {
      searchIcon.className = 'bx bx-loader-alt bx-spin';
      setTimeout(() => {
        searchIcon.className = 'bx bx-search';
      }, 500);
    }
    
    // Reiniciar el filtro activo
    filterBtns.forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Buscar en título, descripción y etiquetas
    let hasResults = false;
    projectCards.forEach(card => {
      const title = card.querySelector('.project-title').textContent.toLowerCase();
      const description = card.querySelector('.project-description').textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll('.project-tag')).map(tag => tag.textContent.toLowerCase());
      
      const matchesSearch = 
        title.includes(searchTerm) || 
        description.includes(searchTerm) || 
        tags.some(tag => tag.includes(searchTerm));
      
      // Restablecer estilos
      card.style.display = 'flex';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      
      if (matchesSearch) {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, Math.random() * 300); // Efecto escalonado aleatorio
        hasResults = true;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Mostrar/ocultar mensaje de "no hay resultados"
    let noResultsMessage = document.querySelector('.no-results-message');
    
    if (!hasResults) {
      if (!noResultsMessage) {
        // Crear mensaje si no existe
        noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results-message';
        noResultsMessage.innerHTML = `
          <i class='bx bx-search-alt' style="font-size: 48px; display: block; margin: 0 auto 1rem; color: var(--color-cyan-600);"></i>
          <p>No se encontraron proyectos que coincidan con "<span class="search-term">${searchTerm}</span>"</p>
          <button class="clear-search">Limpiar búsqueda</button>
        `;
        noResultsMessage.style.textAlign = 'center';
        noResultsMessage.style.padding = '2rem';
        noResultsMessage.style.color = 'var(--color-text-tertiary)';
        noResultsMessage.style.width = '100%';
        noResultsMessage.style.opacity = '0';
        noResultsMessage.style.transform = 'translateY(20px)';
        noResultsMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Estilos para el botón
        const clearButton = noResultsMessage.querySelector('.clear-search');
        clearButton.style.marginTop = '1rem';
        clearButton.style.padding = '0.5rem 1rem';
        clearButton.style.background = 'var(--color-bg-tertiary)';
        clearButton.style.color = 'var(--color-text-primary)';
        clearButton.style.border = 'none';
        clearButton.style.borderRadius = '0.5rem';
        clearButton.style.cursor = 'pointer';
        clearButton.style.transition = 'all 0.3s ease';
        
        clearButton.addEventListener('mouseover', () => {
          clearButton.style.background = 'var(--color-cyan-600)';
          clearButton.style.color = 'white';
          clearButton.style.transform = 'translateY(-2px)';
        });
        
        clearButton.addEventListener('mouseout', () => {
          clearButton.style.background = 'var(--color-bg-tertiary)';
          clearButton.style.color = 'var(--color-text-primary)';
          clearButton.style.transform = 'translateY(0)';
        });
        
        clearButton.addEventListener('click', () => {
          searchInput.value = '';
          searchInput.dispatchEvent(new Event('input'));
        });
        
        // Añadir al DOM
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
          projectsGrid.parentNode.insertBefore(noResultsMessage, projectsGrid.nextSibling);
        }
      } else {
        // Actualizar término de búsqueda
        const searchTermSpan = noResultsMessage.querySelector('.search-term');
        if (searchTermSpan) {
          searchTermSpan.textContent = searchTerm;
        }
      }
      
      // Mostrar con animación
      setTimeout(() => {
        noResultsMessage.style.display = 'block';
        
        setTimeout(() => {
          noResultsMessage.style.opacity = '1';
          noResultsMessage.style.transform = 'translateY(0)';
        }, 50);
      }, 300);
    } else if (noResultsMessage) {
      // Ocultar con animación
      noResultsMessage.style.opacity = '0';
      noResultsMessage.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        noResultsMessage.style.display = 'none';
      }, 500);
    }
  }, 300));
}

/**
 * FORMULARIO DE CONTACTO
 * Validación y envío del formulario de contacto con efectos visuales
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  // Mejorar interacción de los campos del formulario
  const formInputs = contactForm.querySelectorAll('.form-control');
  formInputs.forEach(input => {
    // Estado inicial
    const inputContainer = input.closest('.input-container');
    const icon = inputContainer.querySelector('i');
    const label = inputContainer.parentElement.querySelector('.form-label');
    
    // Efecto de focus
    input.addEventListener('focus', () => {
      inputContainer.style.transform = 'translateY(-5px)';
      icon.style.color = 'var(--color-cyan-600)';
      icon.style.transform = input.tagName === 'TEXTAREA' ? 'scale(1.1)' : 'translateY(-50%) scale(1.1)';
      
      if (label) {
        label.style.color = 'var(--color-cyan-600)';
        label.style.transform = 'translateY(-3px)';
      }
    });
    
    // Restaurar al quitar focus si no hay error
    input.addEventListener('blur', () => {
      if (!inputContainer.classList.contains('error')) {
        inputContainer.style.transform = '';
        icon.style.color = '';
        icon.style.transform = '';
        
        if (label) {
          label.style.color = '';
          label.style.transform = '';
        }
      }
    });
    
    // Efecto al escribir
    input.addEventListener('input', () => {
      if (input.value) {
        inputContainer.classList.add('has-text');
      } else {
        inputContainer.classList.remove('has-text');
      }
    });
  });
  
  // Manejo del envío del formulario con animaciones
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validar formulario
    if (!validateContactForm(name, email, message)) {
      // Efecto de error en formulario
      contactForm.classList.add('form-error');
      
      setTimeout(() => {
        contactForm.classList.remove('form-error');
      }, 400);
      
      return;
    }
    
    // Mostrar estado de carga en el botón con animación
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Enviando...';
    submitBtn.style.background = 'linear-gradient(135deg, var(--color-cyan-700), var(--color-purple-700))';
    
    // Animar formulario durante el envío
    formInputs.forEach(input => {
      input.disabled = true;
      input.style.opacity = '0.7';
    });
    
    try {
      // Simulación de envío AJAX
      await mockFormSubmission();
      
      // Mensaje de éxito
      showNotification({
        title: '¡Mensaje enviado!',
        message: 'Gracias por contactarme. Te responderé lo antes posible.',
        icon: 'bx bx-check-circle',
        color: '#01A4F7' 
      });
      
      // Efecto de éxito en el formulario
      contactForm.classList.add('form-success');
      
      // Limpiar formulario con animación
      formInputs.forEach((input, index) => {
        setTimeout(() => {
          input.value = '';
          input.disabled = false;
          input.style.opacity = '1';
          input.closest('.input-container').classList.remove('has-text');
        }, index * 100);
      });
      
      setTimeout(() => {
        contactForm.classList.remove('form-success');
      }, 1000);
      
    } catch (error) {
      // Mensaje de error
      showNotification({
        title: 'Error al enviar',
        message: 'Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.',
        icon: 'bx bx-error-circle',
        color: '#F8B133'
      });
      
      // Habilitar campos nuevamente
      formInputs.forEach(input => {
        input.disabled = false;
        input.style.opacity = '1';
      });
      
      console.error('Error al enviar el formulario:', error);
    } finally {
      // Restaurar botón con animación
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        
        // Efecto de transición para el botón
        submitBtn.style.transition = 'all 0.3s ease';
        submitBtn.innerHTML = originalHTML;
        
        // Animación de pulsación
        submitBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
          submitBtn.style.transform = '';
        }, 300);
      }, 500);
    }
  });
  
  // Validación del formulario con efectos visuales mejorados
  function validateContactForm(name, email, message) {
    let isValid = true;
    
    // Validar nombre
    if (!name.trim()) {
      showFieldError('name', 'Por favor ingresa tu nombre');
      isValid = false;
    } else {
      clearFieldError('name');
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      showFieldError('email', 'Por favor ingresa un email válido');
      isValid = false;
    } else {
      clearFieldError('email');
    }
    
    // Validar mensaje
    if (!message.trim()) {
      showFieldError('message', 'Por favor ingresa un mensaje');
      isValid = false;
    } else {
      clearFieldError('message');
    }
    
    return isValid;
  }
  
  // Mostrar error en campo con animación
  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const inputContainer = field.closest('.input-container');
    const label = inputContainer.parentElement.querySelector('.form-label');
    const icon = inputContainer.querySelector('i');
    
    // Añadir clase de error con efecto
    inputContainer.classList.add('error');
    inputContainer.style.transform = 'translateX(0)';
    
    // Animar sacudida de error
    setTimeout(() => {
      inputContainer.style.transition = 'transform 0.1s ease';
      inputContainer.style.transform = 'translateX(-5px)';
      
      setTimeout(() => {
        inputContainer.style.transform = 'translateX(5px)';
        
        setTimeout(() => {
          inputContainer.style.transform = 'translateX(-3px)';
          
          setTimeout(() => {
            inputContainer.style.transform = 'translateX(3px)';
            
            setTimeout(() => {
              inputContainer.style.transform = 'translateX(0)';
              
              // Restaurar transición original
              setTimeout(() => {
                inputContainer.style.transition = '';
              }, 100);
            }, 50);
          }, 50);
        }, 50);
      }, 50);
    }, 0);
    
    // Cambiar estilos de icono y label
    icon.style.color = 'var(--color-pink-600)';
    if (label) label.style.color = 'var(--color-pink-600)';
    
    // Crear y añadir mensaje de error si no existe
    let errorMsg = inputContainer.parentNode.querySelector('.error-message');
    if (!errorMsg) {
      errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      errorMsg.style.color = 'var(--color-pink-600)';
      errorMsg.style.fontSize = '0.75rem';
      errorMsg.style.marginTop = '0.25rem';
      errorMsg.style.display = 'flex';
      errorMsg.style.alignItems = 'center';
      errorMsg.style.gap = '0.25rem';
      errorMsg.style.transform = 'translateY(-10px)';
      errorMsg.style.opacity = '0';
      errorMsg.style.transition = 'all 0.3s ease';
      
      // Añadir icono de error
      errorMsg.innerHTML = `<i class='bx bx-error'></i> ${message}`;
      
      inputContainer.parentNode.appendChild(errorMsg);
      
      // Animar entrada
      setTimeout(() => {
        errorMsg.style.transform = 'translateY(0)';
        errorMsg.style.opacity = '1';
      }, 10);
    } else {
      errorMsg.innerHTML = `<i class='bx bx-error'></i> ${message}`;
    }
  }
  
  // Limpiar error en campo con animación
  function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const inputContainer = field.closest('.input-container');
    const label = inputContainer.parentElement.querySelector('.form-label');
    const icon = inputContainer.querySelector('i');
    
    // Quitar clase de error
    inputContainer.classList.remove('error');
    
    // Restaurar estilos
    icon.style.color = '';
    if (label) label.style.color = '';
    
    // Eliminar mensaje de error si existe
    const errorMsg = inputContainer.parentNode.querySelector('.error-message');
    if (errorMsg) {
      // Animar salida
      errorMsg.style.transform = 'translateY(-10px)';
      errorMsg.style.opacity = '0';
      
      setTimeout(() => {
        errorMsg.remove();
      }, 300);
    }
  }
  
  // Simulación de envío de formulario
  function mockFormSubmission() {
    return new Promise((resolve, reject) => {
      // Simular envío con 80% de éxito
      const isSuccess = Math.random() > 0.2;
      
      setTimeout(() => {
        if (isSuccess) {
          resolve({ success: true, message: 'Mensaje enviado correctamente' });
        } else {
          reject(new Error('Error en el servidor'));
        }
      }, 1500);
    });
  }
  
  // Añadir estilos para animaciones del formulario
  const formStyles = document.createElement('style');
  formStyles.textContent = `
    .form-error {
      animation: formShake 0.4s ease;
    }
    
    .form-success {
      animation: formSuccess 1s ease;
    }
    
    @keyframes formShake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-5px); }
      80% { transform: translateX(5px); }
    }
    
    @keyframes formSuccess {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    
    .input-container.has-text i {
      color: var(--color-cyan-500);
    }
  `;
  document.head.appendChild(formStyles);
}

/**
 * MODALES DE AUTENTICACIÓN
 * Funcionalidad para modales de login y registro con efectos visuales mejorados
 */
function initAuthModals() {
  // Botones para abrir modales
  const loginBtn = document.querySelector('.btn-login');
  const registerBtn = document.querySelector('.btn-register');
  
  // Modales y overlays
  const loginModal = document.querySelector('.login-modal-overlay');
  const registerModal = document.querySelector('.register-modal-overlay');
  const closeButtons = document.querySelectorAll('.modal-close');
  
  // Enlaces para cambiar entre modales
  const switchToRegister = document.querySelector('.switch-to-register');
  const switchToLogin = document.querySelector('.switch-to-login');
  
  // Formularios
  const loginForm = document.querySelector('.login-form');
  const registerForm = document.querySelector('.register-form');
  
  // Mejorar estética de los modales
  document.querySelectorAll('.modal').forEach(modal => {
    // Añadir efecto de resplandor al fondo del modal
    const modalGlow = document.createElement('div');
    modalGlow.className = 'modal-glow';
    modalGlow.style.position = 'absolute';
    modalGlow.style.top = '0';
    modalGlow.style.left = '0';
    modalGlow.style.width = '100%';
    modalGlow.style.height = '100%';
    modalGlow.style.background = 'radial-gradient(circle at 50% 0%, rgba(1, 164, 247, 0.1) 0%, transparent 70%)';
    modalGlow.style.zIndex = '-1';
    modalGlow.style.opacity = '0';
    modalGlow.style.transition = 'opacity 1s ease';
    
    modal.prepend(modalGlow);
    
    // Añadir líneas decorativas
    const decorLines = document.createElement('div');
    decorLines.className = 'modal-decor-lines';
    decorLines.style.position = 'absolute';
    decorLines.style.top = '20px';
    decorLines.style.right = '20px';
    decorLines.style.width = '80px';
    decorLines.style.height = '80px';
    decorLines.style.zIndex = '0';
    decorLines.style.opacity = '0.2';
    decorLines.style.pointerEvents = 'none';
    
    decorLines.innerHTML = `
      <div style="position: absolute; top: 0; right: 0; width: 50px; height: 2px; background: var(--color-cyan-600);"></div>
      <div style="position: absolute; top: 0; right: 0; width: 2px; height: 50px; background: var(--color-purple-500);"></div>
      <div style="position: absolute; top: 15px; right: 15px; width: 30px; height: 1px; background: var(--color-teal-600);"></div>
      <div style="position: absolute; top: 15px; right: 15px; width: 1px; height: 30px; background: var(--color-pink-600);"></div>
    `;
    
    modal.appendChild(decorLines);
  });
  
  // Mejorar interacción de los campos de los formularios
  document.querySelectorAll('.modal-form .form-control').forEach(input => {
    // Añadir efecto de focus
    input.addEventListener('focus', function() {
      this.closest('.input-container').style.borderColor = 'var(--color-cyan-600)';
      this.closest('.input-container').style.boxShadow = '0 0 0 2px rgba(1, 164, 247, 0.2)';
      this.closest('.input-container').querySelector('i').style.color = 'var(--color-cyan-600)';
    });
    
    input.addEventListener('blur', function() {
      this.closest('.input-container').style.borderColor = '';
      this.closest('.input-container').style.boxShadow = '';
      this.closest('.input-container').querySelector('i').style.color = '';
    });
  });
  
  // Abrir modal de login con animación
  if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', () => {
      loginModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      const modal = loginModal.querySelector('.modal');
      const glow = modal.querySelector('.modal-glow');
      
      // Animar resplandor
      setTimeout(() => {
        glow.style.opacity = '1';
      }, 300);
      
      // Animar campos de formulario
      const formControls = modal.querySelectorAll('.form-control');
      formControls.forEach((control, index) => {
        control.style.transform = 'translateY(20px)';
        control.style.opacity = '0';
        control.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        
        setTimeout(() => {
          control.style.transform = 'translateY(0)';
          control.style.opacity = '1';
        }, 300 + (index * 100));
      });
    });
  }
  
  // Abrir modal de registro con animación
  if (registerBtn && registerModal) {
    registerBtn.addEventListener('click', () => {
      registerModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      const modal = registerModal.querySelector('.modal');
      const glow = modal.querySelector('.modal-glow');
      
      // Animar resplandor
      setTimeout(() => {
        glow.style.opacity = '1';
      }, 300);
      
      // Animar campos de formulario
      const formControls = modal.querySelectorAll('.form-control');
      formControls.forEach((control, index) => {
        control.style.transform = 'translateY(20px)';
        control.style.opacity = '0';
        control.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        
        setTimeout(() => {
          control.style.transform = 'translateY(0)';
          control.style.opacity = '1';
        }, 300 + (index * 100));
      });
    });
  }
  
  // Cerrar modales al hacer clic en botón X con animación
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal-overlay');
      
      // Animar cierre
      const modalElement = modal.querySelector('.modal');
      modalElement.style.transform = 'scale(0.95) translateY(20px)';
      modalElement.style.opacity = '0';
      modal.style.backdropFilter = 'blur(0px)';
      
      setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Restaurar estado para próxima apertura
        setTimeout(() => {
          modalElement.style.transform = '';
          modalElement.style.opacity = '';
          modal.style.backdropFilter = '';
        }, 300);
      }, 300);
    });
  });
  
  // Cerrar modal al hacer clic fuera del modal con efecto
  [loginModal, registerModal].forEach(modal => {
    if (!modal) return;
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        // Animar cierre
        const modalElement = modal.querySelector('.modal');
        modalElement.style.transform = 'scale(0.95) translateY(20px)';
        modalElement.style.opacity = '0';
        modal.style.backdropFilter = 'blur(0px)';
        
        setTimeout(() => {
          modal.classList.remove('active');
          document.body.style.overflow = '';
          
          // Restaurar estado para próxima apertura
          setTimeout(() => {
            modalElement.style.transform = '';
            modalElement.style.opacity = '';
            modal.style.backdropFilter = '';
          }, 300);
        }, 300);
      }
    });
  });
  
  // Cambiar entre modales con animación
  if (switchToRegister) {
    switchToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Animar salida del modal de login
      const loginModalElement = loginModal.querySelector('.modal');
      loginModalElement.style.transform = 'translateX(-100%)';
      loginModalElement.style.opacity = '0';
      
      setTimeout(() => {
        loginModal.classList.remove('active');
        registerModal.classList.add('active');
        
        // Animar entrada del modal de registro
        const registerModalElement = registerModal.querySelector('.modal');
        registerModalElement.style.transform = 'translateX(100%)';
        registerModalElement.style.opacity = '0';
        
        setTimeout(() => {
          registerModalElement.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
          registerModalElement.style.transform = 'translateX(0)';
          registerModalElement.style.opacity = '1';
          
          // Restaurar estado del modal de login
          loginModalElement.style.transition = '';
          loginModalElement.style.transform = '';
          loginModalElement.style.opacity = '';
        }, 50);
      }, 300);
    });
  }
  
  if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Animar salida del modal de registro
      const registerModalElement = registerModal.querySelector('.modal');
      registerModalElement.style.transform = 'translateX(100%)';
      registerModalElement.style.opacity = '0';
      setTimeout(() => {
        registerModal.classList.remove('active');
        loginModal.classList.add('active');
        
        // Animar entrada del modal de login
        const loginModalElement = loginModal.querySelector('.modal');
        loginModalElement.style.transform = 'translateX(-100%)';
        loginModalElement.style.opacity = '0';
        
        setTimeout(() => {
          loginModalElement.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
          loginModalElement.style.transform = 'translateX(0)';
          loginModalElement.style.opacity = '1';
          
          // Restaurar estado del modal de registro
          registerModalElement.style.transition = '';
          registerModalElement.style.transform = '';
          registerModalElement.style.opacity = '';
        }, 50);
      }, 300);
    });
  }
  
  // Procesar formulario de login con animaciones
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = loginForm.querySelector('#login-email').value;
      const password = loginForm.querySelector('#login-password').value;
      
      // Validación básica con efectos
      if (!email || !password) {
        // Efecto de error
        loginForm.classList.add('form-error');
        
        setTimeout(() => {
          loginForm.classList.remove('form-error');
        }, 400);
        
        showNotification({
          title: 'Campos incompletos',
          message: 'Por favor completa todos los campos',
          icon: 'bx bx-error-circle',
          color: '#F8B133'
        });
        return;
      }
      
      // Estado de carga con animación
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      
      // Efecto de carga en el botón
      submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Iniciando sesión...';
      submitBtn.style.background = 'linear-gradient(135deg, var(--color-cyan-700), var(--color-purple-700))';
      
      // Deshabilitar campos
      const formControls = loginForm.querySelectorAll('.form-control');
      formControls.forEach(control => {
        control.disabled = true;
        control.style.opacity = '0.7';
      });
      
      try {
        // Simulación de autenticación
        await mockAuthRequest(true);
        
        // Efecto de éxito
        submitBtn.innerHTML = '<i class="bx bx-check"></i> ¡Éxito!';
        submitBtn.style.background = 'linear-gradient(135deg, var(--color-teal-600), var(--color-cyan-600))';
        
        // Cerrar modal con animación
        setTimeout(() => {
          const modal = loginModal.querySelector('.modal');
          modal.style.transform = 'translateY(-50px)';
          modal.style.opacity = '0';
          
          setTimeout(() => {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Restaurar estado del modal y formulario
            setTimeout(() => {
              modal.style.transform = '';
              modal.style.opacity = '';
              submitBtn.innerHTML = originalHTML;
              submitBtn.disabled = false;
              submitBtn.style.background = '';
              
              formControls.forEach(control => {
                control.disabled = false;
                control.style.opacity = '1';
              });
            }, 300);
          }, 300);
        }, 800);
        
        // Mensaje de éxito
        showNotification({
          title: '¡Bienvenido de nuevo!',
          message: 'Has iniciado sesión correctamente',
          icon: 'bx bx-check-circle',
          color: '#01A4F7'
        });
        
        // Actualizar UI para estado logueado
        updateLoggedInUI(email.split('@')[0]);
        
      } catch (error) {
        // Efecto de error
        submitBtn.innerHTML = '<i class="bx bx-x"></i> Error';
        submitBtn.style.background = 'linear-gradient(135deg, var(--color-pink-600), var(--color-purple-700))';
        
        // Mensaje de error
        showNotification({
          title: 'Error al iniciar sesión',
          message: error.message,
          icon: 'bx bx-error-circle',
          color: '#F8B133'
        });
        
        // Restaurar formulario
        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          
          formControls.forEach(control => {
            control.disabled = false;
            control.style.opacity = '1';
          });
          
          // Efecto de sacudida
          loginForm.classList.add('form-error');
          setTimeout(() => {
            loginForm.classList.remove('form-error');
          }, 400);
        }, 1000);
      }
    });
  }
  
  // Procesar formulario de registro con animaciones
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = registerForm.querySelector('#register-name').value;
      const email = registerForm.querySelector('#register-email').value;
      const password = registerForm.querySelector('#register-password').value;
      
      // Validación básica con efectos
      if (!name || !email || !password) {
        // Efecto de error
        registerForm.classList.add('form-error');
        
        setTimeout(() => {
          registerForm.classList.remove('form-error');
        }, 400);
        
        showNotification({
          title: 'Campos incompletos',
          message: 'Por favor completa todos los campos',
          icon: 'bx bx-error-circle',
          color: '#F8B133'
        });
        return;
      }
      
      // Estado de carga con animación
      const submitBtn = registerForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      
      // Efecto de carga en el botón
      submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Creando cuenta...';
      submitBtn.style.background = 'linear-gradient(135deg, var(--color-cyan-700), var(--color-purple-700))';
      
      // Deshabilitar campos
      const formControls = registerForm.querySelectorAll('.form-control');
      formControls.forEach(control => {
        control.disabled = true;
        control.style.opacity = '0.7';
      });
      
      try {
        // Simulación de registro
        await mockAuthRequest(false);
        
        // Efecto de éxito
        submitBtn.innerHTML = '<i class="bx bx-check"></i> ¡Cuenta creada!';
        submitBtn.style.background = 'linear-gradient(135deg, var(--color-teal-600), var(--color-cyan-600))';
        
        // Cerrar modal con animación
        setTimeout(() => {
          const modal = registerModal.querySelector('.modal');
          modal.style.transform = 'translateY(-50px)';
          modal.style.opacity = '0';
          
          setTimeout(() => {
            registerModal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Restaurar estado del modal y formulario
            setTimeout(() => {
              modal.style.transform = '';
              modal.style.opacity = '';
              submitBtn.innerHTML = originalHTML;
              submitBtn.disabled = false;
              submitBtn.style.background = '';
              
              formControls.forEach(control => {
                control.disabled = false;
                control.style.opacity = '1';
              });
            }, 300);
          }, 300);
        }, 800);
        
        // Mensaje de éxito
        showNotification({
          title: '¡Cuenta creada!',
          message: 'Tu cuenta ha sido creada correctamente',
          icon: 'bx bx-check-circle',
          color: '#01A4F7'
        });
        
        // Actualizar UI para estado logueado
        updateLoggedInUI(name);
        
      } catch (error) {
        // Efecto de error
        submitBtn.innerHTML = '<i class="bx bx-x"></i> Error';
        submitBtn.style.background = 'linear-gradient(135deg, var(--color-pink-600), var(--color-purple-700))';
        
        // Mensaje de error
        showNotification({
          title: 'Error al crear cuenta',
          message: error.message,
          icon: 'bx bx-error-circle',
          color: '#F8B133'
        });
        
        // Restaurar formulario
        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          
          formControls.forEach(control => {
            control.disabled = false;
            control.style.opacity = '1';
          });
          
          // Efecto de sacudida
          registerForm.classList.add('form-error');
          setTimeout(() => {
            registerForm.classList.remove('form-error');
          }, 400);
        }, 1000);
      }
    });
  }
  
  // Simulación de petición de autenticación
  function mockAuthRequest(isLogin) {
    return new Promise((resolve, reject) => {
      // Simular delay de red
      setTimeout(() => {
        // Simular 90% de éxito
        const isSuccess = Math.random() > 0.1;
        
        if (isSuccess) {
          resolve({ success: true });
        } else {
          if (isLogin) {
            reject(new Error('Credenciales incorrectas'));
          } else {
            reject(new Error('El correo ya está registrado'));
          }
        }
      }, 1500);
    });
  }
  
  // Actualizar UI para usuario logueado con animación
  function updateLoggedInUI(userName) {
    const authButtons = document.querySelector('.auth-buttons');
    if (!authButtons) return;
    
    // Ocultar botones actuales con animación
    authButtons.style.opacity = '0';
    authButtons.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      // Reemplazar botones de auth con menú de usuario
      authButtons.innerHTML = `
        <div class="user-menu">
          <button class="user-menu-btn">
            <span class="user-avatar"><i class='bx bx-user'></i></span>
            <span class="user-name">${userName}</span>
            <i class='bx bx-chevron-down'></i>
          </button>
          <div class="user-dropdown">
            <a href="#"><i class='bx bx-user'></i> Mi Perfil</a>
            <a href="#"><i class='bx bx-cog'></i> Configuración</a>
            <a href="#" class="logout-btn"><i class='bx bx-log-out'></i> Cerrar Sesión</a>
          </div>
        </div>
      `;
      
      // Mostrar con animación
      authButtons.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      authButtons.style.opacity = '1';
      authButtons.style.transform = 'translateY(0)';
      
      // Añadir estilos para el menú desplegable
      const style = document.createElement('style');
      style.textContent = `
        .user-menu {
          position: relative;
        }
        .user-menu-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, rgba(1, 164, 247, 0.1), rgba(157, 107, 238, 0.1));
          padding: 8px 16px;
          border-radius: 50px;
          color: var(--color-text-primary);
          transition: all 0.3s ease;
          border: 1px solid rgba(1, 164, 247, 0.2);
        }
        .user-menu-btn:hover {
          background: linear-gradient(135deg, rgba(1, 164, 247, 0.2), rgba(157, 107, 238, 0.2));
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(1, 164, 247, 0.2);
        }
        .user-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, var(--color-cyan-600), var(--color-purple-500));
          border-radius: 50%;
          color: white;
          font-size: 14px;
        }
        .user-name {
          font-weight: 500;
        }
        .user-dropdown {
          position: absolute;
          top: 120%;
          right: 0;
          width: 220px;
          background-color: var(--color-bg-primary);
          border-radius: 12px;
          box-shadow: var(--shadow-lg), 0 5px 20px rgba(1, 164, 247, 0.2);
          margin-top: 8px;
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
          z-index: 20;
          border: 1px solid rgba(1, 164, 247, 0.1);
        }
        .user-menu:hover .user-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .user-dropdown a {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          color: var(--color-text-secondary);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        .user-dropdown a::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(to bottom, var(--color-cyan-600), var(--color-purple-500));
          opacity: 0;
          transition: all 0.3s ease;
          z-index: -1;
        }
        .user-dropdown a:hover {
          background-color: var(--color-bg-secondary);
          color: var(--color-text-primary);
          padding-left: 25px;
        }
        .user-dropdown a:hover::before {
          opacity: 1;
        }
        .user-dropdown a:hover i {
          transform: scale(1.2);
          color: var(--color-cyan-600);
        }
        .user-dropdown a i {
          transition: all 0.3s ease;
        }
        .logout-btn {
          border-top: 1px solid var(--color-border);
          color: var(--color-pink-600) !important;
        }
        .logout-btn:hover {
          background-color: rgba(220, 40, 111, 0.1) !important;
        }
      `;
      document.head.appendChild(style);
      
      // Añadir funcionalidad al botón de cerrar sesión
      setTimeout(() => {
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Animar logout
            const userMenu = document.querySelector('.user-menu');
            userMenu.style.opacity = '0';
            userMenu.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
              // Restaurar botones de autenticación
              authButtons.innerHTML = `
                <button class="btn-login">Iniciar Sesión</button>
                <button class="btn-register">Registrarse</button>
              `;
              
              // Animar entrada
              authButtons.style.opacity = '0';
              authButtons.style.transform = 'translateY(10px)';
              
              setTimeout(() => {
                authButtons.style.opacity = '1';
                authButtons.style.transform = 'translateY(0)';
                
                // Reinicializar eventos de autenticación
                setTimeout(() => {
                  initAuthModals();
                }, 300);
              }, 50);
            }, 300);
            
            // Notificación de cierre de sesión
            showNotification({
              title: 'Sesión cerrada',
              message: 'Has cerrado sesión correctamente',
              icon: 'bx bx-log-out',
              color: '#01A4F7'
            });
          });
        }
      }, 100);
    }, 300);
  }
  
  // Añadir estilos para animaciones
  const authStyles = document.createElement('style');
  authStyles.textContent = `
    .form-error {
      animation: formShake 0.4s ease;
    }
    
    @keyframes formShake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-5px); }
      80% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(authStyles);
}

/**
 * EVENTOS DE COMUNIDAD
 * Interacciones para la sección de comunidad con efectos visuales mejorados
 */
function initCommunityEvents() {
  const communityCards = document.querySelectorAll('.community-card');
  const joinBtn = document.querySelector('.join-community-btn');
  
  // Añadir efecto hover a las tarjetas con animación 3D
  communityCards.forEach(card => {
    // Añadir clase para efecto 3D
    card.classList.add('card-3d');
    
    // Crear efecto de perspectiva al mover el ratón
    card.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      // Limitar la rotación a un rango razonable
      const maxRotation = 5;
      const rotateX = -maxRotation * y;
      const rotateY = maxRotation * x;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Efecto de iluminación dinámica
      const icon = card.querySelector('.community-card-icon');
      if (icon) {
        const lightX = 100 * x;
        const lightY = 100 * y;
        icon.style.boxShadow = `${lightX}px ${lightY}px 20px rgba(1, 164, 247, 0.3)`;
      }
    });
    
    // Restablecer al salir
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      
      // Restablecer iluminación
      const icon = card.querySelector('.community-card-icon');
      if (icon) {
        icon.style.boxShadow = '';
      }
      
      // Animar icono al salir
      setTimeout(() => {
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      }, 200);
    });
    
    // Efectos adicionales para el icono
    const icon = card.querySelector('.community-card-icon');
    if (icon) {
      // Añadir animación de pulsación sutil
      icon.classList.add('pulse');
    }
    
    // Añadir efecto de brillo al pasar el ratón
    card.classList.add('shine-effect');
  });
  
  // Animación para el botón de unirse
  if (joinBtn) {
    joinBtn.addEventListener('mouseover', () => {
      // Añadir efecto de pulsación
      joinBtn.querySelector('i').classList.add('floating');
    });
    
    joinBtn.addEventListener('mouseout', () => {
      // Quitar efecto
      joinBtn.querySelector('i').classList.remove('floating');
    });
    
    // Funcionalidad del botón con animaciones
    joinBtn.addEventListener('click', () => {
      // Comprobar si el usuario está logueado
      const userMenu = document.querySelector('.user-menu');
      
      if (userMenu) {
        // Usuario logueado - Mostrar animación de éxito
        joinBtn.innerHTML = '<i class="bx bx-check"></i> ¡Te has unido!';
        joinBtn.style.background = 'linear-gradient(135deg, var(--color-teal-600), var(--color-purple-500))';
        
        // Efectos de confeti (simulado con elementos DOM)
        createConfettiEffect(joinBtn);
        
        // Restaurar botón después de un tiempo
        setTimeout(() => {
          joinBtn.innerHTML = '<i class="bx bx-user-plus"></i> Ya eres miembro';
          joinBtn.style.background = '';
        }, 3000);
        
        // Mostrar notificación
        showNotification({
          title: '¡Bienvenido a la comunidad!',
          message: 'Ya eres parte de nuestra comunidad de desarrolladores',
          icon: 'bx bx-group',
          color: '#9D6BEE'
        });
      } else {
        // Usuario no logueado, mostrar efecto y abrir modal de registro
        joinBtn.classList.add('pulse');
        
        setTimeout(() => {
          joinBtn.classList.remove('pulse');
          
          // Mostrar modal de registro con destacado
          const registerModal = document.querySelector('.register-modal-overlay');
          if (registerModal) {
            registerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Destacar el modal
            const modal = registerModal.querySelector('.modal');
            modal.style.boxShadow = '0 0 0 4px var(--color-purple-500), var(--shadow-2xl)';
            
            setTimeout(() => {
              modal.style.boxShadow = '';
            }, 1000);
          }
        }, 400);
      }
    });
  }
  
  // Función para crear efecto de confeti
  function createConfettiEffect(element) {
    // Crear contenedor para el confeti
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.style.position = 'absolute';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.overflow = 'hidden';
    confettiContainer.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.appendChild(confettiContainer);
    
    // Crear piezas de confeti
    const colors = ['#9D6BEE', '#01A4F7', '#01D3D2', '#dc286f', '#F8B133'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      confetti.style.position = 'absolute';
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 5 + 5}px`;
      confetti.style.background = color;
      confetti.style.borderRadius = '50%';
      confetti.style.top = `${Math.random() * 100}%`;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.opacity = Math.random();
      confetti.style.animation = `confettiFall ${Math.random() * 2 + 1}s linear forwards`;
      
      confettiContainer.appendChild(confetti);
    }
    
    // Añadir estilos de animación
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    // Limpiar confeti después de un tiempo
    setTimeout(() => {
      confettiContainer.remove();
    }, 3000);
  }
}

/**
 * BOTÓN VOLVER ARRIBA
 * Funcionalidad para el botón de volver arriba con animaciones
 */
function initBackToTop() {
  const backTopBtn = document.querySelector('.back-top-btn');
  
  if (!backTopBtn) return;
  
  // Añadir efecto de resplandor al botón
  backTopBtn.innerHTML = `
    <div class="btn-glow"></div>
    <i class='bx bx-chevron-up'></i>
  `;
  
  // Estilos para el resplandor
  const glowStyle = document.createElement('style');
  glowStyle.textContent = `
    .btn-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      z-index: -1;
      animation: btnGlow 2s infinite;
      filter: blur(8px);
      background: linear-gradient(135deg, var(--color-cyan-600), var(--color-teal-600));
      opacity: 0.5;
    }
    
    @keyframes btnGlow {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.3); opacity: 0.3; }
    }
  `;
  document.head.appendChild(glowStyle);
  
  // Comportamiento del botón con efecto suavizado
  backTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Animación del icono
    const icon = backTopBtn.querySelector('i');
    icon.style.transform = 'translateY(-5px)';
    
    setTimeout(() => {
      icon.style.transform = '';
    }, 300);
    
    // Scroll suave con aceleración/desaceleración personalizada
    const duration = 1000; // 1 segundo
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
    
    function scrollStep(timestamp) {
      const currentTime = timestamp - startTime;
      const progress = Math.min(currentTime / duration, 1);
      
      // Función de aceleración/desaceleración cúbica
      const easeInOutCubic = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition * (1 - easeInOutCubic));
      
      if (currentTime < duration) {
        window.requestAnimationFrame(scrollStep);
      }
    }
    
    window.requestAnimationFrame(scrollStep);
  });
}

/**
 * ANIMACIONES DEL HERO
 * Efectos visuales especiales para la sección hero
 */
function initHeroAnimations() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  // Mejorar el efecto del blob de fondo
  const heroBlob = heroSection.querySelector('.hero-blob');
  if (heroBlob) {
    // Hacer que el blob sea más dinámico
    heroBlob.style.filter = 'blur(30px)';
    
    // Añadir efecto de movimiento con el ratón
    heroSection.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = heroSection.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 20;
      const y = ((e.clientY - top) / height - 0.5) * 20;
      
      heroBlob.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
    
    // Restaurar posición al salir
    heroSection.addEventListener('mouseleave', () => {
      heroBlob.style.transform = 'translate(-50%, -50%)';
    });
  }
  
  // Mejorar las badges tecnológicas con efectos 3D
  const techBadges = heroSection.querySelectorAll('.tech-badge');
  techBadges.forEach(badge => {
    // Hacer que las badges tengan efecto 3D al pasar el ratón
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'perspective(500px) rotateY(15deg) translateY(-5px)';
      badge.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
      
      // Efecto en icono
      const icon = badge.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1.2)';
      }
    });
    
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = '';
      badge.style.boxShadow = '';
      
      // Restaurar icono
      const icon = badge.querySelector('i');
      if (icon) {
        icon.style.transform = '';
      }
    });
  });
  
  // Añadir efecto de partículas flotantes
  createFloatingParticles(heroSection);
  
  // Función para crear partículas flotantes
  // function createFloatingParticles(container) {
  //   const particlesContainer = document.createElement('div');
  //   particlesContainer.className = 'particles-container';
  //   container.appendChild(particlesContainer);
}