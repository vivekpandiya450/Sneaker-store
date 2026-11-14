const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    // Get input values
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;

    // Create login object
    const loginData = {
        email,
        password
    };

    try {

        // Send login request to backend
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        // Get server response
        const data = await response.json();

        if (response.ok) {

            // Save JWT token
            localStorage.setItem("token", data.token);

            alert("Login successful!");

            // Redirect to home page
            window.location.href = "index.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);
        alert("Something went wrong. Please try again.");

    }

});