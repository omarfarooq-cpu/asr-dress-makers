// =======================================
// ASR DRESS MAKERS - PRODUCTS PAGE
// =======================================

// Product Grid
const productGrid = document.getElementById("productGrid");

// Products
const products = typeof baseProducts !== "undefined" ? baseProducts : [];

// ----------------------------
// Open Product
// ----------------------------
function openProduct(id) {
    window.location.assign("product.html?id=" + encodeURIComponent(id));
}

// ----------------------------
// Render Products
// ----------------------------
function renderProducts(list) {

    productGrid.innerHTML = "";

    if (list.length === 0) {

        productGrid.innerHTML = `
            <h2 style="text-align:center;width:100%;">
                No Products Found
            </h2>
        `;

        return;
    }

    list.forEach(product => {

        let image = "";

        if (product.images && product.images.length > 0) {
            image = product.images[0];
        } else if (product.image) {
            image = product.image;
        }

        let oldPrice = "";

        if (product.oldPrice) {

            oldPrice = `
                <span class="old-price">
                    ₹${product.oldPrice}
                </span>
            `;

        }

        productGrid.innerHTML += `

        <div class="card">

            <img
                src="${image}"
                alt="${product.name}"
            >

            <h3>${product.name}</h3>

            <p>${product.category}</p>

            <div class="price-box">

                <span class="price">
                    ₹${product.price}
                </span>

                ${oldPrice}

            </div>

            <p>
                ⭐ ${product.rating}
                (${product.reviews})
            </p>

            <button
                class="btn-glow view-btn"
                data-id="${product.id}">

                View Product

            </button>

        </div>

        `;

    });

    // Attach Click Events AFTER rendering

    document.querySelectorAll(".view-btn").forEach(button => {

        button.addEventListener("click", function () {

            const id = this.dataset.id;

            openProduct(id);

        });

    });

}

// ----------------------------
// Category Filter
// ----------------------------
function filter(category) {

    if (category === "all") {

        renderProducts(products);

        return;

    }

    const filtered = products.filter(product =>
        product.category === category
    );

    renderProducts(filtered);

}

// ----------------------------
// Cart Count
// ----------------------------
function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.qty || 1;

    });

    const count =
        document.getElementById("cartCount");

    if (count) {

        count.innerText = total;

    }

}

// ----------------------------
// Initial Load
// ----------------------------
renderProducts(products);

updateCartCount();