// Cart state management



export function addToCart(perfume) {
  const existingItem = cartItems.find(item => item.id === perfume.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      id: perfume.name,
      name: perfume.name,
      price: perfume.price,
      image: perfume.image,
      quantity: 1
    });
  }
  updateCartCount();
  updateCartTotal();
  renderCartItems();
}

export function removeFromCart(id) {
  cartItems = cartItems.filter(item => item.id !== id);
  updateCartCount();
  updateCartTotal();
  renderCartItems();
}

export function updateQuantity(id, newQuantity) {
  if (newQuantity < 1) {
    removeFromCart(id);
    return;
  }
  const item = cartItems.find(item => item.id === id);
  if (item) {
    item.quantity = newQuantity;
    updateCartCount();
    updateCartTotal();
    renderCartItems();
  }
}

export function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = cartItems.length === 0 
    ? '<p class="text-center text-gray-500">El carrito está vacío</p>'
    : cartItems.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>${item.price}</p>
          <div class="quantity-controls">
            <button onclick="window.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button onclick="window.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
          </div>
        </div>
        <button onclick="window.removeFromCart('${item.id}')" class="remove-item">✕</button>
      </div>
    `).join('');
}