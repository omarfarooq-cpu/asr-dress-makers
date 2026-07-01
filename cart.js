let cart = JSON.parse(localStorage.getItem("cart")) || [];

const box = document.getElementById("cartItems");
const totalBox = document.getElementById("total");

function render() {
  box.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    box.innerHTML = "<p style='text-align:center'>Your cart is empty 🛒</p>";
    totalBox.innerText = "Total: ₹0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    box.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" />
        
        <div>
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
        </div>

        <div class="qty">
          <button onclick="dec(${index})">-</button>
          <span>${item.qty}</span>
          <button onclick="inc(${index})">+</button>
        </div>

        <div>
          ₹${item.price * item.qty}
        </div>

        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalBox.innerText = "Total: ₹" + total;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function inc(i) {
  cart[i].qty++;
  render();
}

function dec(i) {
  if (cart[i].qty > 1) cart[i].qty--;
  else cart.splice(i, 1);
  render();
}

function removeItem(i) {
  cart.splice(i, 1);
  render();
}
function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  let order = {
    id: "ORD" + Date.now(),
    items: cart,
    total: cart.reduce((a, b) => a + b.price * b.qty, 0),
    date: new Date().toLocaleString(),
    status: "Pending"
  };

  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");

  alert("Order placed successfully!");
  window.location.href = "index.html";
}

render();