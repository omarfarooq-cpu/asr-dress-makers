/*====================================================
        ASR DRESS MAKERS
        PREMIUM PDF INVOICE
====================================================*/

async function generateInvoice() {

    // Load jsPDF
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    //========================
    // SHOP INFORMATION
    //========================

    const SHOP = {
        name: "ASR DRESS MAKERS",
        tagline: "Premium Tailoring Studio",
        address: "Pallavaram, Chennai, Tamil Nadu",
        phone: "+91 7092840069",
        email: "asrdressmakers@gmail.com",
        website: "www.asrdressmakers.com"
    };

    //========================
    // CUSTOMER DETAILS
    //========================

    const customerName =
        document.getElementById("name").value.trim();

    const customerPhone =
        document.getElementById("phone").value.trim();

    const customerAddress =
        document.getElementById("address").value.trim();

    if(customerName===""){
        alert("Please enter customer name");
        return;
    }

    if(customerPhone===""){
        alert("Please enter phone number");
        return;
    }

    if(customerAddress===""){
        alert("Please enter address");
        return;
    }

    //========================
    // CART
    //========================

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length===0){
        alert("Your cart is empty.");
        return;
    }

    //========================
    // INVOICE INFO
    //========================

    const invoiceNo =
        "ASR-" + Date.now();

    const orderId =
        "ORD-" + Math.floor(Math.random()*900000+100000);

    const now = new Date();

    const invoiceDate =
        now.toLocaleDateString();

    const invoiceTime =
        now.toLocaleTimeString();

    //========================
    // HEADER
    //========================

    doc.setFillColor(20,20,20);

    doc.rect(0,0,210,35,"F");

    doc.setTextColor(212,175,55);

    doc.setFont("helvetica","bold");

    doc.setFontSize(22);

    doc.text(
        SHOP.name,
        105,
        14,
        {align:"center"}
    );

    doc.setFontSize(12);

    doc.text(
        SHOP.tagline,
        105,
        22,
        {align:"center"}
    );

    doc.setTextColor(255,255,255);

    doc.setFontSize(9);

    doc.text(
        SHOP.address,
        105,
        28,
        {align:"center"}
    );

    //========================
    // INVOICE DETAILS
    //========================

    let y = 45;

    doc.setTextColor(0,0,0);

    doc.setFont("helvetica","bold");

    doc.setFontSize(11);

    doc.text("Invoice No",20,y);
    doc.text(":",55,y);
    doc.text(invoiceNo,60,y);

    y+=7;

    doc.text("Order ID",20,y);
    doc.text(":",55,y);
    doc.text(orderId,60,y);

    y+=7;

    doc.text("Date",20,y);
    doc.text(":",55,y);
    doc.text(invoiceDate,60,y);

    y+=7;

    doc.text("Time",20,y);
    doc.text(":",55,y);
    doc.text(invoiceTime,60,y);

    //========================
    // CUSTOMER BOX
    //========================

    y+=12;

    doc.setFillColor(240,240,240);

    doc.rect(15,y-5,180,35,"F");

    doc.setTextColor(212,175,55);

    doc.setFontSize(13);

    doc.text("CUSTOMER DETAILS",20,y+2);

    doc.setTextColor(0,0,0);

    doc.setFontSize(11);

    y+=10;

    doc.text("Name",20,y);
    doc.text(":",55,y);
    doc.text(customerName,60,y);

    y+=8;

    doc.text("Phone",20,y);
    doc.text(":",55,y);
    doc.text(customerPhone,60,y);

    y+=8;

    doc.text("Address",20,y);
    doc.text(":",55,y);

    const addressLines =
        doc.splitTextToSize(customerAddress,120);

    doc.text(addressLines,60,y);

    y += addressLines.length * 6 + 10;
        //========================================
    // PRODUCT TABLE
    //========================================

    doc.setFillColor(212,175,55);
    doc.setTextColor(255,255,255);

    doc.rect(15,y,180,9,"F");

    doc.setFont("helvetica","bold");
    doc.setFontSize(11);

    doc.text("Product",20,y+6);
    doc.text("Qty",120,y+6);
    doc.text("Price",145,y+6);
    doc.text("Total",173,y+6);

    y += 14;

    doc.setTextColor(0,0,0);
    doc.setFont("helvetica","normal");

    let grandTotal = 0;

    cart.forEach((item,index)=>{

        const qty = item.qty || 1;

        const price = Number(item.price) || 0;

        const total = qty * price;

        grandTotal += total;

        // Page Break
        if(y>265){

            doc.addPage();

            y=20;

            doc.setFillColor(212,175,55);
            doc.setTextColor(255,255,255);

            doc.rect(15,y,180,9,"F");

            doc.text("Product",20,y+6);
            doc.text("Qty",120,y+6);
            doc.text("Price",145,y+6);
            doc.text("Total",173,y+6);

            y+=14;

            doc.setTextColor(0,0,0);

        }

        doc.setDrawColor(230);

        doc.line(15,y+5,195,y+5);

        doc.text(item.name,20,y);

        doc.text(String(qty),122,y);

        doc.text("Rs. "+price,145,y);

        doc.text("Rs. "+total,173,y);

        y+=10;

    });

    doc.line(15,y,195,y);

    y+=10;

    //========================================
    // TOTAL BOX
    //========================================

    doc.setFillColor(245,245,245);

    doc.rect(115,y-5,80,24,"F");

    doc.setFont("helvetica","bold");

    doc.setFontSize(12);

    doc.text("Subtotal",120,y+2);

    doc.text("Rs. "+grandTotal,165,y+2);

    y+=8;

    doc.text("Discount",120,y+2);

    doc.text("Rs. 0",165,y+2);

    y+=8;

    doc.setTextColor(212,175,55);

    doc.setFontSize(14);

    doc.text("Grand Total",120,y+3);

    doc.text("Rs. "+grandTotal,162,y+3);

    doc.setTextColor(0,0,0);

    y+=20;
        //========================================
    // PAYMENT DETAILS
    //========================================

    doc.setFont("helvetica","bold");
    doc.setFontSize(13);

    doc.text("PAYMENT DETAILS",20,y);

    y += 8;

    doc.setFont("helvetica","normal");
    doc.setFontSize(11);

    doc.text("Payment Method :",20,y);
    doc.text("WhatsApp Order",70,y);

    y += 7;

    doc.text("Payment Status :",20,y);
    doc.text("Pending",70,y);

    y += 7;

    doc.text("Order Status :",20,y);
    doc.text("WhatsApp Confirmation Pending",70,y);

    //========================================
    // SHOP DETAILS
    //========================================

    y += 15;

    doc.setFillColor(245,245,245);
    doc.rect(15,y-5,180,35,"F");

    doc.setFont("helvetica","bold");
    doc.setFontSize(13);
    doc.setTextColor(212,175,55);

    doc.text("SHOP DETAILS",20,y+2);

    doc.setFont("helvetica","normal");
    doc.setFontSize(11);
    doc.setTextColor(0,0,0);

    y += 10;

    doc.text("Shop :",20,y);
    doc.text(SHOP.name,55,y);

    y += 7;

    doc.text("Phone :",20,y);
    doc.text(SHOP.phone,55,y);

    y += 7;

    doc.text("Email :",20,y);
    doc.text(SHOP.email,55,y);

    y += 7;

    doc.text("Address :",20,y);
    doc.text(SHOP.address,55,y);

    //========================================
    // TERMS & CONDITIONS
    //========================================

    y += 18;

    if(y > 235){
        doc.addPage();
        y = 20;
    }

    doc.setFont("helvetica","bold");
    doc.setFontSize(13);

    doc.text("TERMS & CONDITIONS",20,y);

    y += 8;

    doc.setFont("helvetica","normal");
    doc.setFontSize(10);

    doc.text("• Customized dresses cannot be returned.",20,y);

    y += 6;

    doc.text("• Delivery time depends on design complexity.",20,y);

    y += 6;

    doc.text("• Please verify all measurements before confirmation.",20,y);

    y += 6;

    doc.text("• Prices are subject to change without prior notice.",20,y);

    //========================================
    // THANK YOU
    //========================================

    y += 18;

    doc.setDrawColor(212,175,55);
    doc.line(20,y,190,y);

    y += 10;

    doc.setFont("helvetica","bold");
    doc.setFontSize(16);
    doc.setTextColor(212,175,55);

    doc.text("Thank You For Choosing",105,y,{align:"center"});

    y += 8;

    doc.setFontSize(20);

    doc.text("ASR DRESS MAKERS",105,y,{align:"center"});

    y += 10;

    doc.setFontSize(11);
    doc.setTextColor(80);

    doc.text(
        "We appreciate your trust and look forward to serving you again.",
        105,
        y,
        {align:"center"}
    );

    //========================================
    // SIGNATURE
    //========================================

    y += 28;

    doc.setDrawColor(0);

    doc.line(135,y,190,y);

    y += 6;

    doc.setFont("helvetica","bold");
    doc.setFontSize(11);

    doc.text("Authorized Signature",140,y);

    //========================================
    // FOOTER
    //========================================

    doc.setFontSize(9);
    doc.setTextColor(120);

    doc.text(
        "Generated by ASR Dress Makers Management System",
        105,
        288,
        {align:"center"}
    );

    //========================================
    // SAVE PDF
    //========================================

    doc.save(invoiceNo + ".pdf");

}