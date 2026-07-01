const container = document.getElementById("productContainer");

// GET ID FROM URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// GET PRODUCTS
function getProducts() {
  return typeof baseProducts !== "undefined" ? baseProducts : [];
}

// FIND PRODUCT
function findProduct(id) {
  return getProducts().find(p => p.id === id);
}

// ADD TO CART
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart!");
}

// RENDER PRODUCT
function renderProduct() {
  let product = findProduct(id);

  if (!product) {
    container.innerHTML = "<h2>Product not found</h2>";
    return;
  }

  container.innerHTML = `
    <div class="product-page">

      <img src="${product.image}" style="width:300px">

      <div>
        <h2>${product.name}</h2>
        <p>${product.category}</p>
        <h3>₹${product.price}</h3>
        <p>${product.desc}</p>

        <button onclick='addToCart(${JSON.stringify(product)})'>
          Add to Cart
        </button>

      </div>

    </div>
  `;
}

// INIT
renderProduct();