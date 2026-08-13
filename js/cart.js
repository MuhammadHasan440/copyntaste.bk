// cart.js - Cart Management with LocalStorage

let cart = JSON.parse(localStorage.getItem('cnt_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  initCartUI();
  updateCartCount();
});

function saveCart() {
  localStorage.setItem('cnt_cart', JSON.stringify(cart));
  updateCartCount();
  renderCartDrawer();
}

function addToCart(productId, quantity = 1) {
  const product = window.products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();
  openCartDrawer();
  
  // Shake cart icon
  const cartIcon = document.querySelector('.cart-link i');
  if (cartIcon) {
    cartIcon.classList.remove('cart-shake');
    void cartIcon.offsetWidth; // trigger reflow
    cartIcon.classList.add('cart-shake');
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function updateQuantity(productId, newQty) {
  if (newQty < 1) {
    removeFromCart(productId);
    return;
  }
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = newQty;
    saveCart();
  }
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const countEls = document.querySelectorAll('.cart-count');
  countEls.forEach(el => {
    el.textContent = `(${count})`;
  });
}

function initCartUI() {
  const cartLinks = document.querySelectorAll('.cart-link');
  const closeBtn = document.querySelector('.close-cart');
  const overlay = document.querySelector('.cart-overlay');
  const continueBtn = document.querySelector('.btn-continue');

  cartLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  if (overlay) overlay.addEventListener('click', closeCartDrawer);
  if (continueBtn) continueBtn.addEventListener('click', closeCartDrawer);

  renderCartDrawer();
}

function openCartDrawer() {
  const drawer = document.querySelector('.cart-drawer');
  const overlay = document.querySelector('.cart-overlay');
  if (!drawer || !overlay) return;

  overlay.classList.add('active');
  if (window.gsap) {
    gsap.to(drawer, { right: 0, duration: 0.5, ease: 'power3.out' });
  } else {
    drawer.style.right = '0';
  }
  renderCartDrawer();
}

function closeCartDrawer() {
  const drawer = document.querySelector('.cart-drawer');
  const overlay = document.querySelector('.cart-overlay');
  if (!drawer || !overlay) return;

  overlay.classList.remove('active');
  if (window.gsap) {
    gsap.to(drawer, { right: '-100%', duration: 0.5, ease: 'power3.in' });
  } else {
    drawer.style.right = '-100%';
  }
}

function renderCartDrawer() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const subtotalEl = document.querySelector('.cart-subtotal-amount');
  if (!cartItemsContainer || !subtotalEl) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart-msg" style="text-align:center; padding: 2rem 0; color: var(--muted);">
        <p>YOUR CART IS FEELING A LITTLE EMPTY.</p>
        <p>Let's fix that.</p>
      </div>
    `;
    subtotalEl.textContent = '$0.00';
    return;
  }

  let html = '';
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          <div class="quantity-controls">
            <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
          </div>
        </div>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = html;
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}

// Global scope
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
