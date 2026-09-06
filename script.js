// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Cart state, loaded from sessionStorage (if any) on startup
let cart = loadCartFromSession();

// Load cart from sessionStorage
function loadCartFromSession() {
  const storedCart = window.sessionStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
}

// Save cart to sessionStorage
function saveCartToSession() {
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    li.dataset.id = item.id;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  cart.push({ id: product.id, name: product.name, price: product.price });
  saveCartToSession();
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCartToSession();
    renderCart();
  }
}

// Clear cart
function clearCart() {
  cart = [];
  saveCartToSession();
  renderCart();
}

// Event delegation for "Add to Cart" buttons
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = Number(event.target.dataset.id);
    addToCart(productId);
  }
});

// Clear cart button
clearCartBtn.addEventListener("click", () => {
  clearCart();
});

// Initial render
renderProducts();
renderCart();