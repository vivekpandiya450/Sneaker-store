const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    // Get form values
    const fullname = document.querySelector("#fullname").value.trim();
    const email = document.querySelector("#email").value.trim();
    const mobile = document.querySelector("#mobile").value.trim();
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;

    // Password validation
    if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match");
        return;
    }

    // Create user object
    const userData = {
        fullname,
        email,
        mobile,
        password,
        confirmPassword
    };

    try {

        // Send data to backend
           const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        // Get response
        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            signupForm.reset();

            window.location.href = "login.html";

        } else {
            alert(data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
        console.error(error);
    }

});
