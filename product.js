function getAllProducts() {
  let base = typeof baseProducts !== "undefined" ? baseProducts : [];
  let admin = JSON.parse(localStorage.getItem("products")) || [];
  return [...base, ...admin];
}

const id = new URLSearchParams(window.location.search).get("id");

const product = getAllProducts().find(p => String(p.id) === String(id));

const box = document.getElementById("productDetail");

if (!product) {
  box.innerHTML = "<h2 style='text-align:center'>Product not found</h2>";
} else {
  box.innerHTML = `
    <div class="product-grid">

      <!-- IMAGE -->
      <div class="product-image">
        <img src="${product.image}" />
      </div>

      <!-- DETAILS -->
      <div class="product-info">

        <h1>${product.name}</h1>
        <p class="category">${product.category || ""}</p>

        <h2 class="price">₹${product.price}</h2>

        <p class="desc">${product.desc || "Premium tailoring by ASR Dress Makers"}</p>

        <button onclick="addToCart()" class="btn-glow">
          Add to Cart
        </button>

        <button onclick="buyNow()" class="btn-outline">
          Buy via WhatsApp
        </button>

      </div>

    </div>
  `;
}

function addToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(i => i.id == product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

function buyNow() {
  let msg = `Hello ASR Dress Makers, I want this item:%0A${product.name} - ₹${product.price}`;
  window.open("https://wa.me/91XXXXXXXXXX?text=" + msg);
}
