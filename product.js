// ===============================
// ASR DRESS MAKERS PRODUCT PAGE
// ===============================

// Get Product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Product Container
const container = document.getElementById("productContainer");

// Cart Count
updateCartCount();

// Find Product
const product = products.find(p => p.id == productId);

if (!product) {

    container.innerHTML = `
        <div class="product-not-found">
            <h2>Product Not Found</h2>
            <p>The product you're looking for does not exist.</p>
            <a href="products.html" class="btn-glow">
                Back to Shop
            </a>
        </div>
    `;

} else {

    loadProduct(product);

}

// ===============================
// LOAD PRODUCT
// ===============================

function loadProduct(product){

    let discount = 0;

    if(product.oldPrice){
        discount = Math.round(
            ((product.oldPrice - product.price) /
            product.oldPrice) * 100
        );
    }

    container.innerHTML = `
    
    <div class="product-left">

        <img
            id="mainImage"
            class="main-image"
            src="${product.images[0]}"
            alt="${product.name}">

        <div class="thumbnail-row">

            ${product.images.map(img => `
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

        <p class="description">

            ${product.description}

        </p>

        <h3>Select Size</h3>

        <div class="sizes">

            ${product.sizes.map(size => `
                <button
                    class="size-btn"
                    onclick="selectSize(this,'${size}')">

                    ${size}

                </button>
            `).join("")}

        </div>

        <h3>Quantity</h3>

        <div class="qty-box">

            <button onclick="changeQty(-1)">−</button>

            <span id="qty">1</span>

            <button onclick="changeQty(1)">+</button>

        </div>

        <p class="stock">

            ✔ ${product.stock} Pieces Available

        </p>

        <div class="action-buttons">

            <button
                class="btn-glow"
                onclick="addCurrentProduct()">

                Add to Cart

            </button>

            <button
                class="buy-btn"
                onclick="buyNow()">

                Buy Now

            </button>

        </div>

    </div>

    `;

}
//====================================
// GLOBAL VARIABLES
//====================================

let selectedSize = "";
let quantity = 1;

//====================================
// CHANGE MAIN IMAGE
//====================================

function changeImage(image){

    document.getElementById("mainImage").src = image;

}

//====================================
// SELECT SIZE
//====================================

function selectSize(button,size){

    document
        .querySelectorAll(".size-btn")
        .forEach(btn=>btn.classList.remove("active"));

    button.classList.add("active");

    selectedSize = size;

}

//====================================
// CHANGE QUANTITY
//====================================

function changeQty(value){

    quantity += value;

    if(quantity < 1){

        quantity = 1;

    }

    document.getElementById("qty").innerText = quantity;

}

//====================================
// ADD CURRENT PRODUCT
//====================================

function addCurrentProduct(){

    if(product.sizes.length && selectedSize===""){

        alert("Please select a size.");

        return;

    }

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item=>

        item.id===product.id &&

        item.size===selectedSize

    );

    if(existing){

        existing.qty += quantity;

    }else{

        cart.push({

            id:product.id,

            name:product.name,

            image:product.images[0],

            price:product.price,

            qty:quantity,

            size:selectedSize

        });

    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    updateCartCount();

    alert("Added to cart successfully.");

}

//====================================
// BUY NOW
//====================================

function buyNow(){

    addCurrentProduct();

    window.location.href="cart.html";

}

//====================================
// CART COUNT
//====================================

function updateCartCount(){

    let cart =

        JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    cart.forEach(item=>{

        count += item.qty;

    });

    let cartCount = document.getElementById("cartCount");

    if(cartCount){

        cartCount.innerText = count;

    }

}

//====================================
// RELATED PRODUCTS
//====================================

loadRelatedProducts();

function loadRelatedProducts(){

    const relatedBox =
        document.getElementById("relatedProducts");

    if(!relatedBox) return;

    let related = products.filter(p=>

        p.category===product.category &&

        p.id!==product.id

    );

    related = related.slice(0,4);

    relatedBox.innerHTML = related.map(item=>`

        <div class="product-card">

            <img src="${item.images[0]}">

            <h3>${item.name}</h3>

            <p>₹${item.price}</p>

            <button
            class="btn-glow"

            onclick="location.href='product.html?id=${item.id}'">

            View Product

            </button>

        </div>

    `).join("");

}