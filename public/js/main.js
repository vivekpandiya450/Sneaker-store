const cartButtons = document.querySelectorAll(".btn-light");
const cartCount = document.querySelector("#cart-count");
// Browser se saved cart data lena
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// Page load hote hi cart count update karna
function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}
updateCartCount();

// Event Delegation
document.addEventListener("click", (event) => {

    const cartButton = event.target.closest(".btn-light");

    if (!cartButton) return;

    const productCard = cartButton.closest(".product-card");
    if (!productCard) return;

    const productName = productCard.querySelector(".product-name");
    const productPrice = productCard.querySelector(".price");
    const productImage = productCard.querySelector(".product-img img");
    const productDesc = productCard.querySelector(".product-desc");

 const product = {
    id: productCard.dataset.productId,
    name: productName.textContent.trim(),
    price: productPrice.textContent.trim(),
    image: productImage.src,
    description: productDesc.textContent.trim()
};

   const existingProduct = cart.find(
    (item) => item.id === product.id
);

    if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    console.log("Product added to cart:", product);
    console.log("Current cart:", cart);
});


// Navbar Authentication

const token = localStorage.getItem("token");

const loginBtn = document.querySelector("#login-btn");
const signupBtn = document.querySelector("#signup-btn");
const profileBtn = document.querySelector("#profile-btn");

if (token) {
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    profileBtn.style.display = "inline-block";
} else {
    loginBtn.style.display = "inline-block";
    signupBtn.style.display = "inline-block";
    profileBtn.style.display = "none";
}