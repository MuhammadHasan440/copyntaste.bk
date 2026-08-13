// filters.js - Shop filtering logic

document.addEventListener('DOMContentLoaded', () => {
  const shopGrid = document.querySelector('.shop-grid');
  if (!shopGrid) return; // Only run on shop page

  // Render all products initially
  renderShopProducts(window.products);

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const category = e.target.getAttribute('data-category');
      
      let filtered = window.products;
      if (category !== 'all') {
        filtered = window.products.filter(p => p.category === category);
      }
      
      // GSAP animate out, then render, then animate in
      if (window.gsap) {
        gsap.to('.product-card', {
          opacity: 0,
          y: 20,
          duration: 0.3,
          stagger: 0.05,
          onComplete: () => {
            renderShopProducts(filtered);
            gsap.fromTo('.product-card', 
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
            );
          }
        });
      } else {
        renderShopProducts(filtered);
      }
    });
  });

  // Search Input
  const searchInput = document.querySelector('.shop-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      const term = e.target.value.toLowerCase();
      const filtered = window.products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      );
      renderShopProducts(filtered);
    }, 300));
  }
});

function renderShopProducts(productsArr) {
  const shopGrid = document.querySelector('.shop-grid');
  if (!shopGrid) return;

  if (productsArr.length === 0) {
    shopGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 4rem 0;">
        <h3 style="margin-bottom: 1rem;">NO SWEET MATCHES FOUND.</h3>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    `;
    return;
  }

  let html = '';
  productsArr.forEach(p => {
    html += window.renderProductCard(p);
  });
  shopGrid.innerHTML = html;
  
  // Re-init hover cursor on new elements if needed
  if (typeof initCustomCursor === 'function') {
    // Note: in a real app we'd delegate events or re-bind carefully
    // For this prototype, the global mousemove handles the position, 
    // we just need to add hover classes.
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      const viewElements = shopGrid.querySelectorAll('.product-card, .img-zoom-container');
      viewElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover-view'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover-view'));
      });
      const addElements = shopGrid.querySelectorAll('.btn-quick-add');
      addElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.remove('hover-view');
          cursor.classList.add('hover-add');
        });
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover-add'));
      });
    }
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
