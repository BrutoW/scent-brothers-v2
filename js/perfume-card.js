import { addToCart } from './cart.js';

export function createPerfumeCard(perfume) {
  const card = document.createElement('div');
  card.className = 'perfume-card';
  
  card.innerHTML = `
    <img src="${perfume.image}" alt="${perfume.name}" class="perfume-image">
    <div class="perfume-info">
      <h3>${perfume.name}</h3>
      <p>${perfume.description}</p>
      <span class="price">${perfume.price}</span>
      <button class="add-to-cart">Comprar</button>
    </div>
  `;

  // Cambiar el comportamiento del botón para redirigir a una página de Instagram
  card.querySelector('.add-to-cart').addEventListener('click', () => {
    window.location.href = 'https://www.instagram.com/scent.brothersmx/';
  });
  
  return card;
}
