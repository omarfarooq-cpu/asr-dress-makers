// ==========================================
// ASR DRESS MAKERS - PRODUCTS PAGE
// ==========================================

const grid = document.getElementById("productGrid");

// Get Products
function getProducts() {
    return typeof baseProducts !== "undefined" ? baseProducts : [];
}

// Open Product Page
    function openProduct(id) {
    alert("Opening: " + id);
    window.location.href = `product.html?id=${id}`;
}

// Render Products
function render(products) {

    grid.innerHTML = "";

    if (products.length === 0) {
        grid.innerHTML = `
            <h2 style="text-align:center;width:100%;">
                No Products Found
            </h2>
        `;

        return;
    }

    products.forEach(product => {

        let discount = "";

        if (product.oldPrice) {
            const off = Math.round(
                ((product.oldPrice - product.price) / product.oldPrice) * 100
            );

            discount = `<span class="discount">${off}% OFF</span>`;
        }

        grid.innerHTML += `

        <div class="card">

            <img
                src="${product.images[0]}"
                alt="${product.name}"
                onclick="openProduct('${product.id}')">

            <h3>${product.name}</h3>

            <p>${product.category}</p>

            <div class="price-box">

                <span class="price">
                    ₹${product.price}
                </span>

                ${
                    product.oldPrice
                    ? `<span class="old-price">₹${product.oldPrice}</span>`
                    : ""
                }

                ${discount}

            </div>

            <div class="rating">

                ⭐ ${product.rating}

                (${product.reviews})

            </div>

            <button
                class="btn-glow"
                onclick="openProduct('${product.id}')">

                View Product

            </button>

        </div>

        `;

    });
    
}

// Category Filter
function filter(category) {

    if (category === "all") {
        render(getProducts());

        return;

    }

    const filtered = getProducts().filter(product =>
        product.category === category
    );

    render(filtered);

}
// Update Cart Count
function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {
        total += item.qty || 1;

    });

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerText = total;
    }
}

// Initial Load
render(getProducts());
updateCartCount();