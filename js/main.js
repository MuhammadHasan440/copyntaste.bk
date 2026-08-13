// main.js - Core functionality for Copy N' Taste

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initCustomCursor();
  initNavbar();
  initMobileMenu();
  initMagneticButtons();
  
  // Hide loader after a short delay to simulate loading
  const loader = document.querySelector('.loader');
  if (loader) {
    let pct = 0;
    const pctEl = document.querySelector('.loader-percentage');
    const interval = setInterval(() => {
      pct += Math.floor(Math.random() * 20) + 10;
      if (pct > 100) pct = 100;
      if(pctEl) pctEl.textContent = pct;
      if (pct === 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (window.gsap) {
            gsap.to(loader, {
              y: '-100%',
              duration: 1,
              ease: 'power3.inOut',
              onComplete: () => {
                loader.style.display = 'none';
              }
            });
          } else {
            loader.style.display = 'none';
          }
        }, 500);
      }
    }, 150);
  }
});

// Lenis Smooth Scrolling
function initLenis() {
  if (typeof Lenis === 'undefined') return;
  
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Sync Lenis with GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);
  }
}

// Custom Cursor Logic
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor || window.matchMedia('(max-width: 767px)').matches) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Hover states
  const viewElements = document.querySelectorAll('.product-card, .gallery-img-container');
  viewElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover-view'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover-view'));
  });

  const addElements = document.querySelectorAll('.btn-primary');
  addElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover-add'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover-add'));
  });
}

// Navbar Scroll Effect
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Mobile Menu
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const overlay = document.querySelector('.mobile-overlay');
  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    const isActive = overlay.classList.contains('active');
    if (isActive) {
      overlay.classList.remove('active');
      btn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
      overlay.classList.add('active');
      btn.innerHTML = '<i class="fas fa-times"></i>';
      
      // Animate links in
      if (window.gsap) {
        gsap.fromTo('.mobile-nav-link', 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
        );
      }
    }
  });
}

// Magnetic Buttons
function initMagneticButtons() {
  const magnets = document.querySelectorAll('.btn-magnetic');
  if (window.matchMedia('(max-width: 767px)').matches) return;

  magnets.forEach(magnet => {
    magnet.addEventListener('mousemove', (e) => {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      if (window.gsap) {
        gsap.to(magnet, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
        const inner = magnet.querySelector('.btn-inner');
        if (inner) {
          gsap.to(inner, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: 'power2.out' });
        }
      }
    });

    magnet.addEventListener('mouseleave', () => {
      if (window.gsap) {
        gsap.to(magnet, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
        const inner = magnet.querySelector('.btn-inner');
        if (inner) {
          gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
        }
      }
    });
  });
}
