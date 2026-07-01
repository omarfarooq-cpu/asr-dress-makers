const grid = document.getElementById("productGrid");

function getBaseProducts() {
  return baseProducts || [];
}

function getAdminProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function getAllProducts() {
  return [...getBaseProducts(), ...getAdminProducts()];
}

function load(filter = "all") {
  let products = getAllProducts();

  let filtered = filter === "all"
    ? products
    : products.filter(p => p.category === filter);

  grid.innerHTML = "";

  filtered.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <img src="${p.image}" />
        <h3>${p.name}</h3>
        <p>${p.category}</p>
        <p>₹${p.price}</p>

        <a href="product.html?id=${p.id}">
          <button>View</button>
        </a>
      </div>
    `;
  });
}

function filter(cat) {
  load(cat);
}

load();