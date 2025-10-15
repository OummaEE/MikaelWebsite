// Mikael Eriksson - Kreativa Scroll-Effekter och Animationer

class ArtistWebsite {
  constructor() {
    this.init();
    this.setupScrollEffects();
    this.setupParallax();
    this.setupMorphingBackground();
    this.setupLoadingScreen();
  }

  init() {
    // Vänta tills DOM är laddad
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.startAnimations());
    } else {
      this.startAnimations();
    }
  }

  startAnimations() {
    this.observeElements();
    this.setupScrollTriggers();
    this.setupMouseEffects();
  }

  // Advanced Scroll-Triggered Animations
  observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.triggerElementAnimation(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observera alla animerbara element
    document.querySelectorAll('.scroll-section, .timeline-item, .art-card').forEach(el => {
      observer.observe(el);
    });
  }

  triggerElementAnimation(element) {
    // Lägg till specifika animationer baserat på elementtyp
    if (element.classList.contains('art-card')) {
      this.animateArtCard(element);
    } else if (element.classList.contains('timeline-item')) {
      this.animateTimelineItem(element);
    }
  }

  animateArtCard(card) {
    card.style.animation = 'cardEntrance 1s ease-out forwards';
  }

  animateTimelineItem(item) {
    const delay = Array.from(item.parentNode.children).indexOf(item) * 200;
    setTimeout(() => {
      item.style.animation = 'timelineSlide 0.8s ease-out forwards';
    }, delay);
  }

  // Parallax Scroll Effects
  setupParallax() {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });

      ticking = false;
    };

    const requestParallax = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestParallax);
  }

  // Morphing Background Effect
  setupMorphingBackground() {
    const morphBg = document.querySelector('.morph-bg') || this.createMorphBg();
    
    window.addEventListener('scroll', () => {
      const scrollPercent = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
      const hue = scrollPercent * 360;
      
      morphBg.style.background = `
        linear-gradient(
          ${45 + scrollPercent * 90}deg,
          hsl(${210 + hue * 0.3}, 70%, 45%),
          hsl(${270 + hue * 0.5}, 80%, 35%),
          hsl(${45 + hue * 0.7}, 85%, 55%)
        )
      `;
    });
  }

  createMorphBg() {
    const morphBg = document.createElement('div');
    morphBg.className = 'morph-bg';
    document.body.appendChild(morphBg);
    return morphBg;
  }

  // 3D Scroll Effects (Inspirerad av kodexemplen)
  setupScrollTriggers() {
    let scrollY = 0;
    let currentSection = 0;

    const updateScrollEffects = () => {
      scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const sections = document.querySelectorAll('.scroll-section');
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(sectionCenter - windowHeight / 2);
        
        // 3D rotation baserat på avstånd från centrum
        const rotation = Math.max(0, 1 - distanceFromCenter / windowHeight) * 15;
        const scale = Math.max(0.8, 1 - distanceFromCenter / windowHeight * 0.2);
        
        section.style.transform = `
          perspective(1000px) 
          rotateX(${rotation}deg) 
          scale(${scale})
        `;

        // Ändra bakgrundsfärg baserat på sektion
        if (rect.top < windowHeight && rect.bottom > 0) {
          currentSection = index;
          this.updateSectionBackground(index);
        }
      });
    };

    window.addEventListener('scroll', updateScrollEffects);
    updateScrollEffects(); // Initial call
  }

  updateSectionBackground(sectionIndex) {
    const colors = [
      'linear-gradient(135deg, #2E86C1, #1B4F72, #F1C40F)',
      'linear-gradient(45deg, #3498DB, #2ECC71, #F39C12)',
      'linear-gradient(90deg, #E74C3C, #E67E22, #F1C40F)',
      'linear-gradient(180deg, #6C3483, #2E86C1, #2ECC71)',
      'linear-gradient(225deg, #1B4F72, #E74C3C, #F39C12)'
    ];
    
    const morphBg = document.querySelector('.morph-bg');
    if (morphBg && colors[sectionIndex]) {
      morphBg.style.background = colors[sectionIndex];
    }
  }

  // Mouse Interaction Effects
  setupMouseEffects() {
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth mouse follow effect
    const animateMouseEffects = () => {
      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;

      // Uppdatera parallax element baserat på musposition
      const parallaxElements = document.querySelectorAll('.art-card, .artwork-item');
      parallaxElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (targetX - centerX) * 0.01;
        const deltaY = (targetY - centerY) * 0.01;
        
        el.style.transform += ` translate(${deltaX}px, ${deltaY}px)`;
      });

      requestAnimationFrame(animateMouseEffects);
    };

    animateMouseEffects();
  }

  // Loading Screen Animation
  setupLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (loadingScreen) {
          loadingScreen.classList.add('fade-out');
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 1000);
        }
      }, 1000);
    });
  }

  // Smooth Scroll för navigation
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Artwork Gallery Lightbox Effect
  setupGalleryEffects() {
    const artworkItems = document.querySelectorAll('.artwork-item');
    
    artworkItems.forEach(item => {
      item.addEventListener('click', (e) => {
        this.openLightbox(item);
      });
    });
  }

  openLightbox(item) {
    // Skapa lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="${item.querySelector('img').src}" alt="Konstverk">
        <div class="lightbox-info">
          <h3>${item.querySelector('h4').textContent}</h3>
          <p>${item.querySelector('p').textContent}</p>
        </div>
        <button class="lightbox-close">×</button>
      </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Stäng lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      lightbox.remove();
    });
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.remove();
      }
    });
  }
}

// CSS för dinamiska animationer som läggs till via JavaScript
const dynamicStyles = `
@keyframes cardEntrance {
  0% {
    opacity: 0;
    transform: translateY(50px) rotateY(-15deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateY(0deg);
  }
}

@keyframes timelineSlide {
  0% {
    opacity: 0;
    transform: translateX(-100px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  animation: lightboxFadeIn 0.3s ease;
}

@keyframes lightboxFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.lightbox-content {
  max-width: 90%;
  max-height: 90%;
  position: relative;
  background: var(--street-gradient);
  border-radius: 15px;
  padding: 2rem;
  border: 3px solid var(--vibrant-yellow);
}

.lightbox-content img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.lightbox-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--graffiti-red);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.lightbox-close:hover {
  background: var(--vibrant-yellow);
  transform: scale(1.1);
}
`;

// Lägg till dynamiska stilar
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Initiera webbplatsen när DOM är redo
new ArtistWebsite();