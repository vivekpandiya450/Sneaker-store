let cart = [];
try {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = Array.isArray(savedCart) ? savedCart : [];
} catch (error) {
    cart = [];
}
// CALCULATE TOTAL
const subtotal = cart.reduce((sum, product) => {
    const price = Number(
        String(product.price || "").replace("$", "").trim()
    ) || 0;

    const quantity = Math.max(1, Number(product.quantity) || 1);

    return sum + price * quantity;
}, 0);

const shipping = cart.length > 0 ? 10 : 0;
const total = subtotal + shipping;

// DISPLAY AMOUNTS
document.querySelector("#subtotal").textContent =
    "$" + subtotal.toFixed(2);

document.querySelector("#shipping").textContent =
    "$" + shipping.toFixed(2);

document.querySelector("#total").textContent =
    "$" + total.toFixed(2);

// PLACE ORDER
const placeOrderBtn = document.querySelector("#place-order");

if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            window.location.href = "cart.html";
            return;
        }

        const selectedPayment = document.querySelector(
            'input[name="payment"]:checked'
        );

        if (!selectedPayment) {
            alert("Please select a payment method.");
            return;
        }

        if (selectedPayment.value !== "cod") {
            alert("Online payment is not connected yet. Please select Cash on Delivery.");
            return;
        }

        alert("Order placed successfully! Payment method: Cash on Delivery.");

        localStorage.removeItem("cart");

        window.location.href = "cart.html";
    });
}

