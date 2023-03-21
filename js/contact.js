const formEl = document.querySelector("#js-form");
const nameEl = document.querySelector("#js-name");
const emailEl = document.querySelector("#js-email");
const subjectEl = document.querySelector("#js-subject");
const addressEl = document.querySelector("#js-address");
const messageEl = document.querySelector("#js-message-container");

const minLengthRegexName = /^[a-zA-Z]{5,}/;
const minLengthRegexSubject = /^[a-zA-Z]{10,}/;
const minLengthRegexAddress = /^[a-zA-Z]{25,}/;

const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

formEl.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameEl.value;
  const email = emailEl.value;
  const subject = subjectEl.value;
  const address = addressEl.value;

  const nameValid = validateField(nameEl, minLengthRegexName);
  const emailValid = validateField(emailEl, emailRegex);
  const subjectValid = validateField(subjectEl, minLengthRegexSubject);
  const addressValid = validateField(addressEl, minLengthRegexAddress);

  messageEl.innerHTML = "";

  if (!nameValid) {
    alert("Please enter a valid name");
    return;
  }

  if (!emailValid) {
    alert("Please check your email");
    return;
  }

  if (!subjectValid) {
    alert("Please enter a valid subject");
    return;
  }

  if (!addressValid) {
    alert("Please enter a valid address");
    return;
  }

  submitForm(name, email, subject, address);
});

const validateName = () =>
  validateField(nameEl, minLengthRegexName, "Please enter a valid name");
nameEl.addEventListener("input", validateName);
nameEl.addEventListener("blur", validateName);

const validateEmail = () =>
  validateField(emailEl, emailRegex, "Please enter a valid email address");
emailEl.addEventListener("input", validateEmail);
emailEl.addEventListener("blur", validateEmail);

const validateSubject = () =>
  validateField(
    subjectEl,
    minLengthRegexSubject,
    "Please enter a valid subject"
  );
subjectEl.addEventListener("input", validateSubject);
subjectEl.addEventListener("blur", validateSubject);

const validateAddress = () =>
  validateField(
    addressEl,
    minLengthRegexAddress,
    "please enter a valid address"
  );
addressEl.addEventListener("input", validateAddress);
addressEl.addEventListener("blur", validateAddress);

function validateField(field, regex, errorMessage) {
  const value = field.value.trim();
  const validationMessageEl = field.parentNode.querySelector("[data-id]");

  if (regex.test(value) && value !== "") {
    field.classList.add("is-success");
    field.classList.remove("is-error");

    displayError(validationMessageEl);
    return true;
  } else {
    field.classList.add("is-error");
    field.classList.remove("is-success");

    displayError(
      validationMessageEl,
      errorMessage || "Please enter a valid value"
    );
    return false;
  }
}

function displayError(container, error = "") {
  container.innerHTML = error;
}

function resetForm() {
  formEl.reset();

  nameEl.classList.remove("is-success");
  emailEl.classList.remove("is-success");
  subjectEl.classList.remove("is-success");
  addressEl.classList.remove("is-success");

  document.querySelectorAll("[data-id]").forEach(function (el) {
    el.innerHTML = "";
  });
}

async function submitForm(name, email, subject, address) {
  try {
    const response = await fetch("/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        address,
      }),
    });

    alert("Form submitted");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);

    displayError(messageEl, error);
  } finally {
    resetForm();
  }
}