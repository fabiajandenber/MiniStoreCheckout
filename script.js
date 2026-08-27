// Calculate the amount of one product
function calculateItemAmount(price, quantity) {
    return price * quantity;
}


// Calculate the discount based on subtotal
function calculateDiscount(subtotal) {

    let discountRate;

    if (subtotal >= 5000) {
        discountRate = 0.10;
    } else if (subtotal >= 3000) {
        discountRate = 0.07;
    } else if (subtotal >= 1000) {
        discountRate = 0.05;
    } else {
        discountRate = 0;
    }

    return subtotal * discountRate;
}


// Get delivery fee using switch statement
function getDeliveryFee(option) {

    let fee;

    switch (Number(option)) {

        case 1:
            fee = 0;
            break;

        case 2:
            fee = 80;
            break;

        case 3:
            fee = 150;
            break;

        default:
            fee = 0;
    }

    return fee;
}


// Generate product inputs
document.getElementById("productCount").addEventListener("input", function () {

    const productCount = Number(this.value);
    const productsContainer = document.getElementById("productsContainer");

    productsContainer.innerHTML = "";

    if (productCount > 0) {

        for (let i = 0; i < productCount; i++) {

            const productDiv = document.createElement("div");

            productDiv.className = "product";

            productDiv.innerHTML = `
                <h3>Product ${i + 1}</h3>

                <div class="form-group">
                    <label for="productName-${i}">Product Name</label>
                    <input 
                        type="text" 
                        id="productName-${i}"
                        placeholder="Enter product name">
                </div>

                <div class="form-group">
                    <label for="productPrice-${i}">Price</label>
                    <input 
                        type="number" 
                        id="productPrice-${i}"
                        min="0.01"
                        step="0.01"
                        placeholder="Enter price">
                </div>

                <div class="form-group">
                    <label for="productQuantity-${i}">Quantity</label>
                    <input 
                        type="number" 
                        id="productQuantity-${i}"
                        min="1"
                        placeholder="Enter quantity">
                </div>
            `;

            productsContainer.appendChild(productDiv);
        }
    }
});


// Calculate the complete order
document.getElementById("calculateBtn").addEventListener("click", function () {

    const customerName =
        document.getElementById("customerName").value.trim();

    const productCount =
        Number(document.getElementById("productCount").value);

    const deliveryOption =
        Number(document.getElementById("deliveryOption").value);

    const validationMessage =
        document.getElementById("validationMessage");

    const orderSummary =
        document.getElementById("orderSummary");

    validationMessage.textContent = "";
    orderSummary.textContent = "";


    // Validate customer name
    if (customerName === "") {

        validationMessage.textContent =
            "Please enter the Customer Name.";

        return;
    }


    // Validate product count
    if (!Number.isFinite(productCount) || productCount <= 0) {

        validationMessage.textContent =
            "Please enter a valid positive Number of Products.";

        return;
    }


    let subtotal = 0;
    let productDetails = "";
    let hasError = false;


    // Process each product using a for loop
    for (let i = 0; i < productCount; i++) {

        const productName =
            document.getElementById(`productName-${i}`).value.trim();

        const price =
            Number(document.getElementById(`productPrice-${i}`).value);

        const quantity =
            Number(document.getElementById(`productQuantity-${i}`).value);


        // Validate product name
        if (productName === "") {

            validationMessage.textContent =
                `Please enter the Product Name for Product ${i + 1}.`;

            hasError = true;
            break;
        }


        // Validate price
        if (!Number.isFinite(price) || price <= 0) {

            validationMessage.textContent =
                `Please enter a valid positive Price for Product ${i + 1}.`;

            hasError = true;
            break;
        }


        // Validate quantity
        if (!Number.isFinite(quantity) || quantity <= 0) {

            validationMessage.textContent =
                `Please enter a valid positive Quantity for Product ${i + 1}.`;

            hasError = true;
            break;
        }


        // Calculate item amount
        const itemAmount =
            calculateItemAmount(price, quantity);


        // Accumulator
        subtotal += itemAmount;


        // Build product details
        productDetails +=
            `${i + 1}. ${productName}\n` +
            `   Price: ₱${price.toFixed(2)}\n` +
            `   Quantity: ${quantity}\n` +
            `   Amount: ₱${itemAmount.toFixed(2)}\n\n`;
    }


    // Stop if there is an error
    if (hasError) {
        return;
    }


    // Calculate discount
    const discountAmount =
        calculateDiscount(subtotal);


    // Determine discount rate for display
    let discountRate;

    if (subtotal >= 5000) {
        discountRate = 10;
    } else if (subtotal >= 3000) {
        discountRate = 7;
    } else if (subtotal >= 1000) {
        discountRate = 5;
    } else {
        discountRate = 0;
    }


    // Get delivery fee
    const deliveryFee =
        getDeliveryFee(deliveryOption);


    // Determine delivery type
    let deliveryType;

    switch (deliveryOption) {

        case 1:
            deliveryType = "Store Pickup";
            break;

        case 2:
            deliveryType = "Standard Delivery";
            break;

        case 3:
            deliveryType = "Express Delivery";
            break;

        default:
            deliveryType = "Store Pickup";
    }


    // Calculate final amount
    const finalAmount =
        subtotal - discountAmount + deliveryFee;


    // Create final order summary
    const summary = `
MINI STORE CHECKOUT SYSTEM

Customer: ${customerName}

${productDetails}ORDER SUMMARY

Subtotal: ₱${subtotal.toFixed(2)}
Discount Rate: ${discountRate}%
Discount Amount: ₱${discountAmount.toFixed(2)}
Delivery Type: ${deliveryType}
Delivery Fee: ₱${deliveryFee.toFixed(2)}
Final Amount: ₱${finalAmount.toFixed(2)}
`;


    // Display the summary
    orderSummary.textContent = summary;
});
