document.addEventListener('DOMContentLoaded', function() {

    // Simular carga (en producción usarías eventos reales de carga)
        setTimeout(function() {
            document.querySelector('.loader-container').style.display = 'none';
        }, 2000); // 3 segundos
    // =============================================
    // Mobile Menu Elements
    // =============================================
    const menuToggle = document.getElementById('mobile-menu');
    const menuContainer = document.querySelector('.menu-container');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

    // =============================================
    // Mobile Menu Toggle Functionality
    // =============================================
    if (menuToggle && menuContainer) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            menuContainer.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking overlay
        menuOverlay.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            menuContainer.classList.remove('active');
            this.classList.remove('active');
            body.classList.remove('menu-open');
        });
    }

    // =============================================
    // Enhanced Dropdown Functionality
    // =============================================
    const dropdowns = document.querySelectorAll('.dropdown');
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    const dropdownLinks = document.querySelectorAll('.dropdown > a:not(.dropdown-trigger)');

    // Click en el icono de flecha (despliega el menú)
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const parentDropdown = this.closest('.dropdown');
            const isActive = parentDropdown.classList.contains('active');
            
            // Cerrar todos los dropdowns primero
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // Abrir el actual si no estaba activo
            if (!isActive) {
                parentDropdown.classList.add('active');
            }
        });
    });

    // Click en el texto "LANZAMIENTOS" (redirige a etiqueta.html)
    // Solo evitar navegación si NO es el enlace principal (Lanzamientos)
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const isMainDropdown = this.closest('.dropdown') && this === this.closest('.dropdown').querySelector('a:not(.dropdown-trigger)');

            if (window.innerWidth <= 992 && !isMainDropdown) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });


    // Cerrar dropdowns al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Cerrar menú móvil al seleccionar una opción (excepto dropdowns)
    document.querySelectorAll('.main-menu > li:not(.dropdown) > a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                menuToggle.classList.remove('active');
                menuContainer.classList.remove('active');
                menuOverlay.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });

    // =============================================
    // Smooth Scrolling (para anclas internas)
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // =============================================
    // Back to Top Button (si existe)
    // =============================================
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =============================================
    // Platform Modal Function (si la necesitas)
    // =============================================
    window.showPlatformModal = function(releaseTitle) {
        console.log("Mostrar modal para:", releaseTitle);
        // Implementa la lógica del modal aquí
    };
    
    document.addEventListener('DOMContentLoaded', function() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const menuLinks = document.querySelectorAll('.main-menu > li > a');
        
        // Remover estados activos previos
        menuLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
            
        // Activar el item correspondiente
        if (currentPage === 'singles.html' || currentPage === 'eps.html' || currentPage === 'various.html') {
            const lanzamientosLink = document.querySelector('.dropdown-toggle[href="etiqueta.html"]');
            lanzamientosLink.classList.add('active');
            lanzamientosLink.setAttribute('aria-current', 'page');
        } else {
            // Activar otros items del menú
            menuLinks.forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop();
                if (linkPage === currentPage) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                }
            });
        }
    });
    
    // Activar solo en móvil cuando está en subpáginas
    document.addEventListener('DOMContentLoaded', function() {
        const isLanzamientosPage = window.location.pathname.includes('etiqueta/');
        const isMobile = window.matchMedia('(max-width: 991px)').matches;
        
        if (isMobile && isLanzamientosPage) {
            document.querySelector('#lanzamientos-link').classList.add('active');
        }
    });

    document.querySelectorAll('.past-event .event-info').forEach(eventInfo => {
      const gallery = eventInfo.nextElementSibling;

      // Función para mostrar/ocultar galería
      function toggleGallery() {
        const isOpen = gallery.classList.toggle('open');
        eventInfo.setAttribute('aria-expanded', isOpen);
        gallery.setAttribute('aria-hidden', !isOpen);
      }

      // Hover para escritorio
      eventInfo.addEventListener('mouseenter', () => {
        gallery.classList.add('open');
        eventInfo.setAttribute('aria-expanded', true);
        gallery.setAttribute('aria-hidden', false);
      });
      eventInfo.addEventListener('mouseleave', () => {
        gallery.classList.remove('open');
        eventInfo.setAttribute('aria-expanded', false);
        gallery.setAttribute('aria-hidden', true);
      });

      // Para que el hover no se pierda al pasar galería, añadimos también eventos a gallery
      gallery.addEventListener('mouseenter', () => {
        gallery.classList.add('open');
        eventInfo.setAttribute('aria-expanded', true);
        gallery.setAttribute('aria-hidden', false);
      });
      gallery.addEventListener('mouseleave', () => {
        gallery.classList.remove('open');
        eventInfo.setAttribute('aria-expanded', false);
        gallery.setAttribute('aria-hidden', true);
      });

      // Click para móviles (toggle)
      eventInfo.addEventListener('click', () => {
        if(window.innerWidth <= 768) { // Considerar dispositivos móviles
          toggleGallery();
        }
      });
    });
    
});

// Funcionalidad del popup
document.addEventListener('DOMContentLoaded', function() {
  const popup = document.getElementById('popup-lanzamiento');
  const closeBtn = document.querySelector('.popup-close');
  const closePopupBtn = document.querySelector('.btn-close-popup');
  
  // Mostrar popup después de 2 segundos
  setTimeout(function() {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }, 2000);
  
  // Cerrar popup al hacer clic en la X
  closeBtn.addEventListener('click', function() {
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  // Cerrar popup al hacer clic en el botón
  closePopupBtn.addEventListener('click', function() {
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  // Cerrar popup al hacer clic fuera del contenido
  popup.addEventListener('click', function(e) {
    if (e.target === popup) {
      popup.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Cerrar popup con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
      popup.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});