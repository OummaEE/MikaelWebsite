// Elegant Interactions för Mikael Eriksson webbplats - Inspirerad av Moooi

class ElegantWebsite {
  constructor() {
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  start() {
    this.setupScrollAnimations();
    this.setupSmoothScrolling();
    this.setupImageLazyLoading();
    this.setupParallaxEffects();
    this.setupHeaderBehavior();
    this.setupMobileNavigation();
  }

  // Scroll-triggered animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observera alla element som ska animeras
    document.querySelectorAll('.fade-in, .card, .timeline-item, .gallery-item').forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  // Smooth scrolling för ankarlänkar
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Lazy loading för bilder
  setupImageLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Subtil parallax för hero-sektion
  setupParallaxEffects() {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.hero');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });

      ticking = false;
    };

    const requestParallaxUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestParallaxUpdate);
  }

  // Header beteende vid scroll
  setupHeaderBehavior() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
      }

      lastScrollTop = scrollTop;
    });
  }

  // Mobile navigation functionality
  setupMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    if (!mobileToggle || !navMenu) return;

    // Toggle mobile menu
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('mobile-open');
      
      if (isOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    });

    // Close menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('mobile-open')) {
          this.closeMobileMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('mobile-open') && 
          !navMenu.contains(e.target) && 
          !mobileToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('mobile-open')) {
        this.closeMobileMenu();
      }
    });
  }

  openMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    mobileToggle.classList.add('active');
    navMenu.classList.add('mobile-open');
    body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    mobileToggle.classList.remove('active');
    navMenu.classList.remove('mobile-open');
    body.style.overflow = ''; // Restore scrolling
  }
}

// Initiera när DOM är redo
new ElegantWebsite();