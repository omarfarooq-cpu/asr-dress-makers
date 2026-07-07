// =========================================
// ASR DRESS MAKERS - PRODUCT PAGE
// =========================================

// Get Product ID
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Products
const products = typeof baseProducts !== "undefined" ? baseProducts : [];

// Find Product
const product = products.find(p => p.id === productId);

// Containers
const container = document.getElementById("productContainer");
const relatedContainer = document.getElementById("relatedProducts");

// Variables
let quantity = 1;
let selectedSize = "";

// ===========================
// Cart Count
// ===========================

updateCartCount();

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => total += item.qty || 1);

    document.getElementById("cartCount").innerText = total;

}

// ===========================
// Product Not Found
// ===========================

if (!product) {

    container.innerHTML = `

        <div style="text-align:center;padding:80px;">

            <h2>Product Not Found</h2>

            <a href="products.html">

                Back To Shop

            </a>

        </div>

    `;

} else {

    loadProduct();

    loadRelatedProducts();

}

// ===========================
// Load Product
// ===========================

function loadProduct() {

    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    container.innerHTML = `

<div class="product-wrapper">

<div class="product-left">

<img
id="mainImage"
class="main-image"
src="${product.images[0]}">

<div class="thumbnail-row">

${product.images.map(img=>`

<img
src="${img}"
class="thumb"
onclick="changeImage('${img}')">

`).join("")}

</div>

</div>

<div class="product-right">

<h1>${product.name}</h1>

<div class="rating">

⭐ ${product.rating}

(${product.reviews} Reviews)

</div>

<div class="price-box">

<span class="price">

₹${product.price}

</span>

${
product.oldPrice
?

`<span class="old-price">

₹${product.oldPrice}

</span>`

:

""

}

${
discount
?

`<span class="discount">

${discount}% OFF

</span>`

:

""

}

</div>

<p>

${product.description}

</p>

<h3>Select Size</h3>

<div class="sizes">

${product.sizes.map(size=>`

<button
class="size-btn"
onclick="selectSize(this,'${size}')">

${size}

</button>

`).join("")}

</div>

<h3>Quantity</h3>

<div class="qty-box">

<button onclick="changeQty(-1)">-</button>

<span id="qty">1</span>

<button onclick="changeQty(1)">+</button>

</div>

<p>

Stock : ${product.stock}

</p>

<div class="action-buttons">

<button
class="btn-glow"
onclick="addToCart()">

Add To Cart

</button>

<button
class="buy-btn"
onclick="buyNow()">

Buy Now

</button>

</div>

</div>

</div>

`;

}

// ===========================
// Change Image
// ===========================

function changeImage(src) {

    document.getElementById("mainImage").src = src;

}

// ===========================
// Select Size
// ===========================

function selectSize(button, size) {

    document.querySelectorAll(".size-btn").forEach(btn =>
        btn.classList.remove("active")
    );

    button.classList.add("active");

    selectedSize = size;

}

// ===========================
// Quantity
// ===========================

function changeQty(value) {

    quantity += value;

    if (quantity < 1) quantity = 1;

    document.getElementById("qty").innerText = quantity;

}

// ===========================
// Add To Cart
// ===========================

function addToCart() {

    if (product.sizes.length && selectedSize === "") {

        alert("Please select a size.");

        return;

    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item =>
        item.id === product.id &&
        item.size === selectedSize
    );

    if (existing) {

        existing.qty += quantity;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            image: product.images[0],

            price: product.price,

            qty: quantity,

            size: selectedSize

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product Added Successfully");

}

// ===========================
// Buy Now
// ===========================

function buyNow() {

    addToCart();

    window.location.href = "cart.html";

}

// ===========================
// Related Products
// ===========================

function loadRelatedProducts() {

    if (!relatedContainer) return;

    const related = products.filter(item =>

        item.category === product.category &&

        item.id !== product.id

    );

    relatedContainer.innerHTML = "";

    related.forEach(item => {

        relatedContainer.innerHTML += `

<div class="card">

<img src="${item.images[0]}">

<h3>${item.name}</h3>

<p>₹${item.price}</p>

<button
class="btn-glow"
onclick="location.href='product.html?id=${item.id}'">

View Product

</button>

</div>

`;

    });

}