/*=========================================
    ASR DRESS MAKERS
    SERVICES.JS
=========================================*/

// Change this to your WhatsApp Number
const WHATSAPP_NUMBER = "919876543210";

// Book Service
function bookWhatsApp() {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const requirements = document.getElementById("requirements").value.trim();

    // Validation
    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    if (phone === "") {
        alert("Please enter your phone number.");
        return;
    }

    if (date === "") {
        alert("Please select an appointment date.");
        return;
    }

    if (time === "") {
        alert("Please select an appointment time.");
        return;
    }

    // Generate Booking ID
    const bookingId = "ASR-" + Date.now();

    // Save Booking
    const booking = {
        bookingId,
        name,
        phone,
        service,
        date,
        time,
        requirements,
        status: "Pending",
        createdAt: new Date().toLocaleString()
    };

    let bookings = JSON.parse(localStorage.getItem("serviceBookings")) || [];
    bookings.push(booking);
    localStorage.setItem("serviceBookings", JSON.stringify(bookings));

    // WhatsApp Message
    const message = `🧵 *ASR DRESS MAKERS*

📋 *SERVICE BOOKING*

🆔 Booking ID:
${bookingId}

👤 Name:
${name}

📱 Phone:
${phone}

🛍️ Service:
${service}

📅 Appointment Date:
${date}

⏰ Time:
${time}

📝 Requirements:
${requirements || "None"}

Thank you for choosing ASR Dress Makers ❤️`;

    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(url, "_blank");

    // Success
    alert("Booking saved successfully!");

    // Clear Form
    document.getElementById("bookingForm").reset();

}

// Load Previous Bookings
function loadBookings() {

    let bookings =
        JSON.parse(localStorage.getItem("serviceBookings")) || [];

    console.log("Bookings:", bookings);

}

// Run on Page Load
window.onload = function () {

    loadBookings();

};