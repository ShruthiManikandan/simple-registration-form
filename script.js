// ---------- 1. Get references to the HTML elements ----------
const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");
const togglePassword = document.getElementById("togglePassword");

// ---------- 2. Validation functions ----------
// Each function returns an error message (string) if the value is invalid,
// or an empty string "" if the value is valid.

function getNameError() {
  // trim() removes spaces so "   " counts as empty
  if (nameInput.value.trim() === "") {
    return "Name is required.";
  }
  return "";
}

function getEmailError() {
  // Pattern: text @ text . text (no spaces allowed)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    return "Please enter a valid email address.";
  }
  return "";
}

function getPasswordError() {
  if (passwordInput.value.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return "";
}

// ---------- 3. Show or clear the error for one field ----------
function showFieldState(input, errorElement, message) {
  // Putting text in the error element shows it; empty text removes it
  errorElement.textContent = message;

  // Red border if invalid, green border if valid
  input.classList.toggle("invalid", message !== "");
  input.classList.toggle("valid", message === "");
}

// ---------- 4. Enable or disable the Register button ----------
// Checks all three fields WITHOUT showing error messages.
function updateSubmitButton() {
  const allValid =
    getNameError() === "" &&
    getEmailError() === "" &&
    getPasswordError() === "";

  // disabled = true when the form is NOT valid
  submitBtn.disabled = !allValid;
}

// ---------- 5. Helper that validates one field and updates the button ----------
function validateField(input, errorElement, getError) {
  showFieldState(input, errorElement, getError());
  successMessage.textContent = ""; // hide old success message when editing
  updateSubmitButton();
}

// ---------- 6. Real-time validation ----------
// "input" fires every time the user types, deletes, or pastes.
// "blur" fires when the user leaves a field, so an EMPTY field
// shows its error even if the user never typed anything.

nameInput.addEventListener("input", function () {
  validateField(nameInput, nameError, getNameError);
});
nameInput.addEventListener("blur", function () {
  validateField(nameInput, nameError, getNameError);
});

emailInput.addEventListener("input", function () {
  validateField(emailInput, emailError, getEmailError);
});
emailInput.addEventListener("blur", function () {
  validateField(emailInput, emailError, getEmailError);
});

passwordInput.addEventListener("input", function () {
  validateField(passwordInput, passwordError, getPasswordError);
});
passwordInput.addEventListener("blur", function () {
  validateField(passwordInput, passwordError, getPasswordError);
});

// ---------- 7. Show / Hide password ----------
togglePassword.addEventListener("click", function () {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePassword.textContent = isHidden ? "Hide" : "Show";
});

// ---------- 8. Handle form submission ----------
form.addEventListener("submit", function (event) {
  // Stop the page from refreshing
  event.preventDefault();

  // Check everything one more time (safety check)
  const nameMsg = getNameError();
  const emailMsg = getEmailError();
  const passwordMsg = getPasswordError();

  // If any field is invalid, show all errors and stop here
  if (nameMsg || emailMsg || passwordMsg) {
    showFieldState(nameInput, nameError, nameMsg);
    showFieldState(emailInput, emailError, emailMsg);
    showFieldState(passwordInput, passwordError, passwordMsg);
    updateSubmitButton();
    return;
  }

  // All fields are valid: show the success message
  successMessage.textContent = "Registration successful!";

  // Clear the form and reset the visual state
  form.reset();
  [nameInput, emailInput, passwordInput].forEach(function (input) {
    input.classList.remove("valid", "invalid");
  });

  // Put the password field back to hidden mode
  passwordInput.type = "password";
  togglePassword.textContent = "Show";

  // Button goes back to disabled because the fields are empty again
  updateSubmitButton();
});

// ---------- 9. Set the correct button state when the page first loads ----------
updateSubmitButton();