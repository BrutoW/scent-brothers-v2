import { perfumes } from './data/perfumes.js';
import { createPerfumeCard } from './js/perfume-card.js';
import { observer } from './js/animation.js';
import { initSmoothScroll } from './js/navigation.js';
import { updateQuantity, removeFromCart } from './js/cart.js';

function populatePerfumes() {
  Object.entries(perfumes).forEach(([section, items]) => {
    const grid = document.querySelector(`#${section} .perfume-grid`);
    items.forEach(perfume => {
      grid.appendChild(createPerfumeCard(perfume));
    });
  });
}

// Cart drawer functionality
function initCartDrawer() {
  const cartButton = document.getElementById('cart-button');
  const cartDrawer = document.getElementById('cart-drawer');
  const closeCart = document.getElementById('close-cart');

  cartButton.addEventListener('click', () => {
    cartDrawer.classList.add('open');
  });

  closeCart.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
  });
}

// Make cart functions available globally
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  populatePerfumes();
  initCartDrawer();
  initSmoothScroll();
  
  // Observe all perfume cards for animation
  document.querySelectorAll('.perfume-card').forEach(card => {
    observer.observe(card);
  });
});