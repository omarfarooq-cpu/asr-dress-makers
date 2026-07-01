const grid = document.getElementById("productGrid");

function getBaseProducts() {
  return typeof baseProducts !== "undefined" ? baseProducts : [];
}

function getAdminProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function getAllProducts() {
  return [...getBaseProducts(), ...getAdminProducts()];
}

// MAIN RENDER FUNCTION
function renderProducts(list) {
  grid.innerHTML = "";

  list.forEach(p => {
    grid.innerHTML += `
      <div class="card" onclick="openProduct(${p.id})">

        <img src="${p.image}" />

        <h3>${p.name}</h3>
        <p>${p.category}</p>
        <p>₹${p.price}</p>

      </div>
    `;
  });
}

// LOAD PRODUCTS
function load(filter = "all") {
  let products = getAllProducts();

  let filtered = filter === "all"
    ? products
    : products.filter(p => p.category === filter);

  renderProducts(filtered);
}

// CATEGORY FILTER
function filter(cat) {
  load(cat);
}

// SEARCH
document.getElementById("searchInput").addEventListener("input", function(e) {
  let value = e.target.value.toLowerCase();

  let products = getAllProducts().filter(p =>
    p.name.toLowerCase().includes(value) ||
    p.category.toLowerCase().includes(value)
  );

  renderProducts(products);
});

// NAVIGATION FIX
function openProduct(id) {
  window.location.href = "product.html?id=" + id;
}

// INIT
load();