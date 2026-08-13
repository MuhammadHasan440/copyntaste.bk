// products.js - Mock database for Copy N' Taste

const products = [
  {
    id: 'cnt-01',
    name: 'Vintage Heart Cake',
    slug: 'vintage-heart-cake',
    description: 'A beautiful retro-inspired heart cake with delicate piping and maraschino cherries.',
    price: 65.00,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    reviews: 24,
    featured: true
  },
  {
    id: 'cnt-02',
    name: 'Classic Chocolate Brownies',
    slug: 'classic-chocolate-brownies',
    description: 'Fudgy, rich, and decadent dark chocolate brownies baked to perfection.',
    price: 24.00,
    category: 'brownies',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 15,
    featured: true
  },
  {
    id: 'cnt-03',
    name: 'Strawberry Dream Cupcakes',
    slug: 'strawberry-dream-cupcakes',
    description: 'Soft vanilla cupcakes topped with fresh strawberry buttercream.',
    price: 36.00,
    category: 'cupcakes',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 32,
    featured: true
  },
  {
    id: 'cnt-04',
    name: 'Assorted Macaron Box',
    slug: 'assorted-macaron-box',
    description: 'A delicate selection of our best-selling macaron flavors.',
    price: 45.00,
    category: 'dessert-boxes',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    reviews: 40,
    featured: true
  },
  {
    id: 'cnt-05',
    name: 'Brown Butter Chocolate Chip Cookies',
    slug: 'brown-butter-cookies',
    description: 'Crispy edges, chewy centers, loaded with premium dark chocolate chunks.',
    price: 18.00,
    category: 'cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 55,
    featured: false
  },
  {
    id: 'cnt-06',
    name: 'Vanilla Bean Celebration Cake',
    slug: 'vanilla-bean-celebration-cake',
    description: 'Elegant layered vanilla cake with fresh floral decorations.',
    price: 85.00,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    reviews: 18,
    featured: false
  },
  {
    id: 'cnt-07',
    name: 'Seasonal Berry Tart',
    slug: 'seasonal-berry-tart',
    description: 'Crisp pastry shell filled with vanilla custard and topped with seasonal fresh berries.',
    price: 42.00,
    category: 'seasonal',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviews: 12,
    featured: true
  },
  {
    id: 'cnt-08',
    name: 'Red Velvet Cupcakes',
    slug: 'red-velvet-cupcakes',
    description: 'Classic red velvet with our signature cream cheese frosting.',
    price: 38.00,
    category: 'cupcakes',
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 26,
    featured: false
  }
];

// Helper to render product cards
function renderProductCard(product) {
  return `
    <div class="product-card" data-category="${product.category}" data-price="${product.price}">
      <div class="product-img-wrapper img-zoom-container">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" class="product-img img-zoom" loading="lazy">
        </a>
        <div class="product-actions">
          <button class="btn-quick-add" onclick="addToCart('${product.id}')" aria-label="Add to cart">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-rating">
          ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 !== 0 ? '½' : ''} <span>(${product.reviews})</span>
        </div>
        <h3 class="product-title"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </div>
    </div>
  `;
}

// Global scope for product fetching
window.products = products;
window.renderProductCard = renderProductCard;
