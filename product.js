const id = new URLSearchParams(window.location.search).get("id");

function getAllProducts() {
  return [
    ...(baseProducts || []),
    ...(JSON.parse(localStorage.getItem("products")) || [])
  ];
}

const product = getAllProducts().find(p => p.id == id);

document.getElementById("productDetail").innerHTML = `
  <div class="card" style="max-width:500px;margin:auto;">
    <img src="${product.image}" />
    <h1>${product.name}</h1>
    <p>${product.desc}</p>
    <h2>₹${product.price}</h2>
    <button onclick="addToCart()">Add to Cart</button>
  </div>
`;

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