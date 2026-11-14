// NEWLY DROPPED PRODUCTS
fetch("/api/products/section/newly")
    .then((response) => response.json())
    .then((data) => {

        console.log(data);

        const products = data.products;
        const newlyGrid = document.querySelector("#newly-grid");

        newlyGrid.innerHTML = "";

        products.forEach((product) => {

            // Product Card
            const card = document.createElement("div");
            card.classList.add("product-card");
            card.dataset.productId = product._id;
            newlyGrid.appendChild(card);

            // Product Image
            const productImg = document.createElement("div");
            productImg.classList.add("product-img");

            const img = document.createElement("img");
            img.src = product.image;
            img.alt = product.name;

            productImg.appendChild(img);
            card.appendChild(productImg);

            // Product Price and Category
            const productTop = document.createElement("div");
            productTop.classList.add("product-top");

            const price = document.createElement("span");
            price.classList.add("price");
            price.textContent = `$${product.price}`;

            const tag = document.createElement("span");
            tag.classList.add("tag");
            tag.textContent = product.category;

            productTop.appendChild(price);
            productTop.appendChild(tag);

            card.appendChild(productTop);

            // Product Name
            const productName = document.createElement("h4");
            productName.classList.add("product-name");
            productName.textContent = product.name;

            card.appendChild(productName);

            // Product Description
            const productDesc = document.createElement("p");
            productDesc.classList.add("product-desc");
            productDesc.textContent = product.description;

            card.appendChild(productDesc);

            // Product Buttons
            const productBtns = document.createElement("div");
            productBtns.classList.add("product-btns");

            // Add to Cart Button
            const addToCartBtn = document.createElement("button");
            addToCartBtn.classList.add("btn", "btn-light");
            addToCartBtn.textContent = "Add to Cart";

            productBtns.appendChild(addToCartBtn);
            card.appendChild(productBtns);

        });

        console.log("Newly Product Cards Created!");

    })
    .catch((error) => {
        console.log("Newly Products Error:", error);
    });

// SUMMER COLLECTION PRODUCTS
fetch("/api/products/section/summer")
    .then((response) => response.json())
    .then((data) => {

        console.log(data);

        const products = data.products;
        const summerGrid = document.querySelector("#summer-grid");

        summerGrid.innerHTML = "";

        products.forEach((product) => {

            // Product Card
            const card = document.createElement("div");
            card.classList.add("product-card");
            card.dataset.productId = product._id;
            summerGrid.appendChild(card);

            // Product Image
            const productImg = document.createElement("div");
            productImg.classList.add("product-img");

            const img = document.createElement("img");
            img.src = product.image;
            img.alt = product.name;

            productImg.appendChild(img);
            card.appendChild(productImg);

            // Product Price and Category
            const productTop = document.createElement("div");
            productTop.classList.add("product-top");

            const price = document.createElement("span");
            price.classList.add("price");
            price.textContent = `$${product.price}`;

            const tag = document.createElement("span");
            tag.classList.add("tag");
            tag.textContent = product.category;

            productTop.appendChild(price);
            productTop.appendChild(tag);

            card.appendChild(productTop);

            // Product Name
            const productName = document.createElement("h4");
            productName.classList.add("product-name");
            productName.textContent = product.name;

            card.appendChild(productName);

            // Product Description
            const productDesc = document.createElement("p");
            productDesc.classList.add("product-desc");
            productDesc.textContent = product.description;

            card.appendChild(productDesc);

            // Product Buttons
            const productBtns = document.createElement("div");
            productBtns.classList.add("product-btns");

            // Add to Cart Button
            const addToCartBtn = document.createElement("button");
            addToCartBtn.classList.add("btn", "btn-light");
            addToCartBtn.textContent = "Add to Cart";

            productBtns.appendChild(addToCartBtn);
            card.appendChild(productBtns);

        });

        console.log("Summer Product Cards Created!");

    })
    .catch((error) => {
        console.log("Summer Products Error:", error);
    });