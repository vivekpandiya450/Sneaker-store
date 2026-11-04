fetch("/api/products/section/newly")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const products = data.products;
        console.log(products);
        const newlyGrid = document.querySelector("#newly-grid");

        products.forEach((product) => {
            const card = document.createElement("div");
            card.classList.add("product-card");
            newlyGrid.appendChild(card);

            const productImg=document.createElement("div")
            productImg.classList.add("product-img");
            const img=document.createElement("img");

            img.src=product.image;
            img.alt=product.name;

            productImg.appendChild(img);

            card.appendChild(productImg)

            const productTop=document.createElement("div");
            productTop.classList.add("product-top");

            const price=document.createElement("span");
            price.classList.add("price");
            price.textContent=`$${product.price}`;

            const tag=document.createElement("span");
            tag.classList.add("tag");
            tag.textContent=product.category;
             
            productTop.appendChild(price);
            productTop.appendChild(tag)

            card.appendChild(productTop)

            //product name
            const productName=document.createElement("h4");
            productName.classList.add("product-name");
            productName.textContent=product.name;

            // product Description
            const productDesc=document.createElement("p");
            productDesc.classList.add("product-desc");
            productDesc.textContent=product.description;

            //add in card
            card.appendChild(productName);
            card.appendChild(productDesc)

            // product Button 
            const productBtns=document.createElement("div");
            productBtns.classList.add("product-btns");

            // Add to cart Button
            const addToCartBtn=document.createElement("button");
            addToCartBtn.classList.add("btn","btn-light");
            addToCartBtn.textContent="Add to Cart"
            // add button into div
            productBtns.appendChild(addToCartBtn);

            // add button into card
            card.appendChild(productBtns)

        });

        console.log("Product Cards Created!");
    })
    .catch((error) => {
        console.log("Error:", error);
    });