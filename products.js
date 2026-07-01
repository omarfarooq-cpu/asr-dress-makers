const grid = document.getElementById("productGrid");

function getProducts() {
  return typeof baseProducts !== "undefined" ? baseProducts : [];
}

// OPEN PRODUCT PAGE
function openProduct(id) {
  window.location.href = "product.html?id=" + id;
}

// RENDER PRODUCTS
function render(products) {
  grid.innerHTML = "";

  products.forEach(p => {
    grid.innerHTML += `
      <div class="card" onclick="openProduct('${p.id}')">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.category}</p>
        <p>₹${p.price}</p>
      </div>
    `;
  });
}

// LOAD ALL
function load() {
  render(getProducts());
}

// INIT
load();