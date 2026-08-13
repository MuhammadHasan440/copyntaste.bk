// checkout.js - Mock checkout logic and Stripe placeholder

document.addEventListener('DOMContentLoaded', () => {
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    renderCheckoutSummary();
    
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'PROCESSING...';
      submitBtn.disabled = true;

      // Mock payment processing delay
      setTimeout(() => {
        // Clear cart on successful purchase
        localStorage.removeItem('cnt_cart');
        
        // Redirect to success page
        window.location.href = 'order-success.html';
      }, 2000);
    });
  }

  const customOrderForm = document.getElementById('custom-order-form');
  if (customOrderForm) {
    customOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = customOrderForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'SENDING...';
      submitBtn.disabled = true;

      setTimeout(() => {
        customOrderForm.innerHTML = `
          <div style="text-align: center; padding: 4rem 0;">
            <h3 style="margin-bottom: 1rem; color: var(--berry);">Thank you!</h3>
            <p>Your custom order request has been received. We'll be in touch soon.</p>
          </div>
        `;
      }, 1500);
    });
  }
});

function renderCheckoutSummary() {
  const cartData = JSON.parse(localStorage.getItem('cnt_cart')) || [];
  const itemsContainer = document.querySelector('.checkout-summary-items');
  const subtotalEl = document.querySelector('.checkout-subtotal');
  const totalEl = document.querySelector('.checkout-total');
  
  if (!itemsContainer) return;

  if (cartData.length === 0) {
    itemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }

  let html = '';
  let subtotal = 0;

  cartData.forEach(item => {
    subtotal += item.price * item.quantity;
    html += `
      <div class="summary-item" style="display:flex; gap:1rem; align-items:center; margin-bottom:1.5rem;">
        <div style="position:relative; flex-shrink:0;">
          <img src="${item.image}" alt="${item.name}" style="width:64px; height:64px; object-fit:cover; border-radius:8px; border:1px solid rgba(41,24,23,0.1);">
          <span style="position:absolute; top:-8px; right:-8px; background:var(--chocolate); color:var(--warm-white); font-size:12px; font-weight:600; width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center;">${item.quantity}</span>
        </div>
        <div style="flex:1;">
          <h4 style="font-family:var(--font-body); font-size:14px; font-weight:500; margin:0;">${item.name}</h4>
        </div>
        <div style="font-family:var(--font-body); font-weight:500;">
          $${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    `;
  });

  const tax = subtotal * 0.08875; // NY tax approx
  const total = subtotal + tax;

  itemsContainer.innerHTML = html;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  
  const taxEl = document.querySelector('.checkout-tax');
  if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;

  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}
