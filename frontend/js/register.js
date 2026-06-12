const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const messageEl = document.getElementById("message");

    // Basic front-end validation
    if (!username || !email || !password) {
        messageEl.style.color = "red";
        messageEl.innerHTML = "All fields are required.";
        return;
    }

    if (password.length < 6) {
        messageEl.style.color = "red";
        messageEl.innerHTML = "Password must be at least 6 characters.";
        return;
    }

    // Show loading state
    const btn = registerForm.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Registering...";

    try {
        const response = await fetch(`${API_BASE_URL}/users/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            messageEl.style.color = "green";
            messageEl.innerHTML = "Registration successful! Redirecting to login...";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);

        } else {
            // Clean error messages
            if (data.username) {
                messageEl.innerHTML = `Username: ${data.username[0]}`;
            } else if (data.email) {
                messageEl.innerHTML = `Email: ${data.email[0]}`;
            } else if (data.password) {
                messageEl.innerHTML = `Password: ${data.password[0]}`;
            } else {
                messageEl.innerHTML = "Registration failed. Please try again.";
            }
            messageEl.style.color = "red";
        }

    } catch (error) {
        messageEl.style.color = "red";
        messageEl.innerHTML = "Server error. Please try again in a moment.";

    } finally {
        btn.disabled = false;
        btn.textContent = "Register";
    }
});