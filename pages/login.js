// Get references to the necessary DOM elements
const formOpenBtn = document.querySelector("#form-open"),
    home = document.querySelector(".home"),
    formContainer = document.querySelector(".form_container"),
    formCloseBtn = document.querySelector(".form_close"),
    signupBtn = document.querySelector("#signup"),
    loginBtn = document.querySelector("#login"),
    pwShowHide = document.querySelectorAll(".pw_hide");

// Open the form without clicking the button by adding the "show" class to the home element
home.classList.add("show");

// Event listener for the form close button
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

// Event listener for password show/hide icons
pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
        // Get the corresponding password input field
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
            // If the input type is password, change it to text and switch icon classes
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            // If the input type is text, change it back to password and switch icon classes
            getPwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

// Event listener for the signup button
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Add the "active" class to the form container
    formContainer.classList.add("active");
});

// Event listener for the login button
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Remove the "active" class from the form container
    formContainer.classList.remove("active");
});