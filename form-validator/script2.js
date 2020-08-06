const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("Password");

//Email Validation
function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value.trim().toLowerCase())) {
    showSuccess(email);
  } else {
    showError(email, "Email must be valid");
  }
}

//Check Required function
function checkRequired(elements) {
  elements.forEach((element) => {
    if (element.value.trim() === "") {
      showError(element, `${getFieldName(element)} is required`);
    }
  });
}

// Check length
function checkLength(element, min, max) {
  if (element.value.length < min) {
    showError(
      element,
      `${getFieldName(element)} must be longer than ${min} characters`
    );
  } else if (element.value.length > max) {
    showError(
      element,
      `${getFieldName(element)} must be shorter than ${max} characters`
    );
  } else {
    showSuccess(element);
  }
}

// Check if password match
function checkPassword(password, password2) {
  if (password.value === password2.value) {
    showSuccess(password);
    showSuccess(password2);
  } else {
    showError(password2, "Passwords must match");
  }
}

// Get Field Name
function getFieldName(element) {
  return element.id.charAt(0).toUpperCase() + element.id.slice(1);
}

// Show input error Message
function showError(element, message) {
  const formControl = element.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.textContent = message;
}
// Show success outline
function showSuccess(element) {
  const formControl = element.parentElement;
  formControl.className = "form-control success";
}
// Event Listners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 16);
  checkLength(password, 6, 16);
  checkEmail(email);
  checkPassword(password, password2);
});
