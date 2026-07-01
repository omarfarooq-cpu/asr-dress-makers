function login() {
  let pass = document.getElementById("pass").value;

  if (pass === "1234") {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
  } else {
    alert("Wrong password");
  }
}

function logout() {
  location.reload();
}
function loadOrders() {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  let box = document.getElementById("ordersList");
  box.innerHTML = "";

  orders.forEach(o => {
    box.innerHTML += `
      <div class="admin-product-card">
        <div>
          <h3>${o.id}</h3>
          <p>${o.date}</p>
          <small>${o.total ? "₹" + o.total : o.service}</small>
          <p>Status: ${o.status}</p>
        </div>
      </div>
    `;
  });
}

loadOrders();