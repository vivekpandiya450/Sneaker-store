// ===== CART =====
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");

let cart = JSON.parse(localStorage.getItem("cart") || "[]");
if (!Array.isArray(cart)) cart = [];

cart.forEach(p => {
    p.quantity = Math.max(1, Number(p.quantity) || 1);
});

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (cartCount) cartCount.textContent = cart.length;
}

function displayCart() {
    if (!cartItems) return;
    cartItems.innerHTML = "";

    if (!cart.length) {
        cartItems.textContent = "Your cart is empty.";
        updateOrderSummary();
        return;
    }

    cart.forEach(product => {
        const item = document.createElement("div");
        const price = Number(String(product.price ?? "").replace("$", "")) || 0;

        item.innerHTML = `
            <h3></h3>
            <img width="100" alt="">
            <p class="price"></p>
            <button class="minus">-</button>
            <span class="quantity"></span>
            <button class="plus">+</button>
            <p class="description"></p>
            <button class="remove">Remove</button>
        `;

        item.querySelector("h3").textContent = product.name || "";

        const img = item.querySelector("img");
        img.src = product.image || "";
        img.alt = product.name || "";

        item.querySelector(".price").textContent = "$" + price.toFixed(2);
        item.querySelector(".quantity").textContent = product.quantity;
        item.querySelector(".description").textContent = product.description || "";

        item.querySelector(".plus").onclick = () => {
            product.quantity++;
            refreshCart();
        };

        item.querySelector(".minus").onclick = () => {
            if (product.quantity > 1) {
                product.quantity--;
                refreshCart();
            }
        };

        item.querySelector(".remove").onclick = () => {
            cart = cart.filter(p => p !== product);
            refreshCart();
        };

        cartItems.appendChild(item);
    });

    updateOrderSummary();
}

function refreshCart() {
    saveCart();
    displayCart();
}

function updateOrderSummary() {
    const subtotalEl = document.querySelector("#subtotal");
    const shippingEl = document.querySelector("#shipping");
    const totalEl = document.querySelector("#total");

    if (!subtotalEl || !shippingEl || !totalEl) return;

    const subtotal = cart.reduce((sum, p) => {
        const price = Number(String(p.price ?? "").replace("$", "")) || 0;
        return sum + price * p.quantity;
    }, 0);

    const shipping = cart.length ? 10 : 0;

    subtotalEl.textContent = "$" + subtotal.toFixed(2);
    shippingEl.textContent = "$" + shipping.toFixed(2);
    totalEl.textContent = "$" + (subtotal + shipping).toFixed(2);
}


// ===== ADDRESS =====
const modal = document.querySelector("#address-modal");
const addBtn = document.querySelector("#add-address-btn");
const closeBtn = document.querySelector("#close-modal");
const form = document.querySelector("#address-form");
const addressBox = document.querySelector("#saved-addresses");

let editingId = null;

const fields = {
    fullname: document.querySelector("#full-name"),
    mobile: document.querySelector("#mobile-number"),
    pincode: document.querySelector("#pincode"),
    city: document.querySelector("#city"),
    state: document.querySelector("#state")
};

// Read addresses; migrate the old single address only once.
function getAddresses() {
    let addresses = [];

    if (localStorage.getItem("deliveryAddresses") !== null) {
        try {
            addresses = JSON.parse(localStorage.getItem("deliveryAddresses"));
            if (!Array.isArray(addresses)) addresses = [];
        } catch {
            addresses = [];
        }
    } else {
        try {
            const old = JSON.parse(localStorage.getItem("deliveryAddress"));
            if (old && typeof old === "object") {
                addresses.push({
                    ...old,
                    id: old.id || Date.now(),
                    mobile: old.mobile || old.moblie || ""
                });
            }
        } catch {}

        localStorage.setItem("deliveryAddresses", JSON.stringify(addresses));
    }

    let changed = false;

    addresses.forEach(a => {
        if (a.id == null) {
            a.id = Date.now() + Math.random();
            changed = true;
        }

        if (!a.mobile && a.moblie) {
            a.mobile = a.moblie;
            changed = true;
        }
    });

    if (changed) {
        localStorage.setItem("deliveryAddresses", JSON.stringify(addresses));
    }

    return addresses;
}

function saveAddresses(addresses) {
    localStorage.setItem("deliveryAddresses", JSON.stringify(addresses));
}

function closeAddressForm() {
    if (modal) modal.style.display = "none";
    if (form) form.reset();
    editingId = null;
}

function openAddressForm(address = null) {
    if (!modal || !form) return;

    form.reset();
    editingId = address ? address.id : null;

    Object.keys(fields).forEach(key => {
        fields[key].value = address
            ? address[key] || (key === "mobile" ? address.moblie : "") || ""
            : "";
    });

    const title = modal.querySelector("h2");
    if (title) title.textContent = address
        ? "Edit Delivery Address"
        : "Add Delivery Address";

    modal.style.display = "flex";
}

if (addBtn) addBtn.onclick = () => openAddressForm();
if (closeBtn) closeBtn.onclick = closeAddressForm;

if (modal) {
    modal.addEventListener("click", e => {
        if (e.target === modal) closeAddressForm();
    });
}


// ===== DISPLAY ADDRESSES =====
function displayAddresses() {
    if (!addressBox) return;

    const addresses = getAddresses();
    addressBox.innerHTML = "";

    if (!addresses.length) {
        addressBox.textContent = "No saved addresses yet.";
        return;
    }

    addresses.forEach((a, index) => {
        const card = document.createElement("div");
        card.className = "saved-address";

        const title = document.createElement("h3");
        title.textContent = `Delivery Address ${index + 1}`;

        const name = document.createElement("p");
        name.className = "display-name";
        name.textContent = a.fullname || "";

        const details = document.createElement("p");
        details.className = "display-address";
        details.textContent =
            `Mobile: ${a.mobile || a.moblie || ""} | PIN: ${a.pincode || ""} | ${a.city || ""}, ${a.state || ""}`;

        const actions = document.createElement("div");
        actions.className = "address-actions";

        const edit = document.createElement("button");
        edit.type = "button";
        edit.textContent = "Edit Address";
        edit.className = "edit-address-btn";
        edit.onclick = () => openAddressForm(a);

        const del = document.createElement("button");
        del.type = "button";
        del.textContent = "Delete Address";
        del.className = "delete-address-btn";

        del.onclick = () => {
            if (!confirm("Kya aap is address ko delete karna chahte hain?")) return;

            const updated = getAddresses().filter(
                item => String(item.id) !== String(a.id)
            );

            saveAddresses(updated);

            if (!updated.length) {
                localStorage.removeItem("deliveryAddress");
            }

            displayAddresses();
        };

        actions.append(edit, del);
        card.append(title, name, details, actions);
        addressBox.appendChild(card);
    });
}


// ===== SAVE / EDIT ADDRESS =====
if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();

        const address = {
            id: editingId ?? Date.now() + Math.random(),
            fullname: fields.fullname.value.trim(),
            mobile: fields.mobile.value.trim(),
            pincode: fields.pincode.value.trim(),
            city: fields.city.value.trim(),
            state: fields.state.value.trim()
        };

        if (Object.values(address).some(v => v === "" || v == null)) {
            alert("Please fill in all address fields.");
            return;
        }

        let addresses = getAddresses();

        if (editingId !== null) {
            addresses = addresses.map(a =>
                String(a.id) === String(editingId) ? address : a
            );
        } else {
            addresses.push(address);
        }

        saveAddresses(addresses);
        displayAddresses();
        closeAddressForm();
        alert("Address saved successfully!");
    });
}
// "pay now button"
const buyNowBtn = document.querySelector("#buy-now");

if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        window.location.href = "payment.html";
    });
}
// ===== START =====
saveCart();
displayCart();
displayAddresses();

