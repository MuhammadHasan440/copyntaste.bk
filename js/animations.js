// animations.js - GSAP & ScrollTrigger Animations for Copy N' Taste

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded.');
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);

  initHeroAnimations();
  initScrollReveals();
  initParallax();
});

function initHeroAnimations() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  const tl = gsap.timeline({ delay: 0.5 }); // wait for loader

  // Basic split text animation without external splitText plugin
  const words = heroTitle.innerText.split(' ');
  heroTitle.innerHTML = '';
  words.forEach(word => {
    const span = document.createElement('span');
    span.classList.add('reveal-text-wrapper');
    const innerSpan = document.createElement('span');
    innerSpan.innerText = word + ' ';
    innerSpan.classList.add('reveal-text');
    span.appendChild(innerSpan);
    heroTitle.appendChild(span);
  });

  tl.to('.hero-title .reveal-text', {
    y: '0%',
    duration: 1.2,
    stagger: 0.1,
    ease: 'power4.out'
  })
  .fromTo('.hero-subtitle', 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
    '-=0.8'
  )
  .fromTo('.hero-cta',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
    '-=0.8'
  )
  .fromTo('.hero-img',
    { scale: 1.15, opacity: 0, filter: 'blur(10px)' },
    { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' },
    '-=1.2'
  );

  // Hero Scroll Zoom
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    gsap.to('.hero-img', {
      scale: 1.35,
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.hero-content', {
      opacity: 0,
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}

function initScrollReveals() {
  // Staggered Product Cards Reveal
  const productSections = document.querySelectorAll('.products-section');
  productSections.forEach(section => {
    const cards = section.querySelectorAll('.product-card');
    if (cards.length === 0) return;

    gsap.fromTo(cards, 
      { opacity: 0, y: 80, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );
  });

  // Editorial Text Reveal
  const introText = document.querySelector('.intro-brand-title');
  if (introText) {
    // Similar fake split logic
    const lines = introText.innerHTML.split('<br>');
    introText.innerHTML = '';
    lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('reveal-text-wrapper');
      const inner = document.createElement('div');
      inner.innerHTML = line;
      inner.classList.add('reveal-text');
      wrapper.appendChild(inner);
      introText.appendChild(wrapper);
    });

    gsap.to('.intro-brand-title .reveal-text', {
      y: '0%',
      opacity: 1, // needed if starting from opacity 0 inside CSS
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.intro-brand',
        start: 'top 75%'
      }
    });
  }

  // Image Mask Reveal
  const aboutImg = document.querySelector('.about-img-container img');
  if (aboutImg) {
    gsap.fromTo(aboutImg,
      { clipPath: 'inset(20% 20% 20% 20%)', scale: 1.15 },
      { 
        clipPath: 'inset(0% 0% 0% 0%)', 
        scale: 1, 
        duration: 1.5, 
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 70%'
        }
      }
    );
  }
}

function initParallax() {
  const floatElements = document.querySelectorAll('.float-element');
  floatElements.forEach(el => {
    const speed = el.getAttribute('data-speed') || 1;
    gsap.to(el, {
      y: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}
