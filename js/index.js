const copyrightYear = new Date().getFullYear();
document.getElementById("year").innerHTML = copyrightYear;

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");
    const fullNameInput = document.getElementById("name");
    const companyNameInput = document.getElementById("company");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const submitButton = document.querySelector(".contact-form button");
    const responseMessage = document.getElementById("responseMessage");
    const nameError = document.getElementById("nameError");
    const companyError = document.getElementById("companyError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
  
    function sanitizeInput(input) {
      return input.replace(/[<>\'"]/g, "");
    }
  
    function validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    }
  
    function validateForm() {
      let isValid = true;
  
      // Sanitize and check Full Name
      fullNameInput.value = sanitizeInput(fullNameInput.value);
      if (fullNameInput.value.trim() === "") {
        nameError.textContent = "Full Name is required.";
        isValid = false;
      } else {
        nameError.textContent = "";
      }
  
      // Sanitize and check Company Name
      companyNameInput.value = sanitizeInput(companyNameInput.value);
      if (companyNameInput.value.trim() === "") {
        companyError.textContent = "Company Name is required.";
        isValid = false;
      } else {
        companyError.textContent = "";
      }
  
      // Sanitize and validate Email
      emailInput.value = sanitizeInput(emailInput.value);
      if (!validateEmail(emailInput.value)) {
        emailError.textContent = "Enter a valid email.";
        isValid = false;
      } else {
        emailError.textContent = "";
      }
  
      // Sanitize and check Message
      messageInput.value = sanitizeInput(messageInput.value);
      if (messageInput.value.trim() === "") {
        messageError.textContent = "Message cannot be empty.";
        isValid = false;
      } else {
        messageError.textContent = "";
      }
  
      return isValid;
    }
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validateForm()) {
        responseMessage.textContent = "Invalid input. Please check the form.";
        responseMessage.classList.remove("hidden");
        responseMessage.style.color = "red";
        setTimeout(() => {
            responseMessage.classList.add("hidden");
          }, 3000);
        return;
      }
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      fetch("https://formsubmit.co/lowendoongle@gmail.com", {
        method: "POST",
        body: new FormData(form),
      })
        .then((response) => {
          if (response.ok) {
            responseMessage.textContent = "Message successfully sent!";
            responseMessage.classList.remove("hidden");
            responseMessage.style.color = "green";
            form.reset();
          } else {
            responseMessage.textContent = "Message failed to send.";
            responseMessage.classList.remove("hidden");
            responseMessage.style.color = "red";
          }
        })
        .catch((error) => {
          responseMessage.textContent = "An error occurred. Please try again.";
          responseMessage.classList.remove("hidden");
          responseMessage.style.color = "red";
          console.error(error);
        })
        .finally(() => {
          submitButton.disabled = false;
          submitButton.textContent = "Send";
          setTimeout(() => {
            responseMessage.classList.add("hidden");
          }, 5000);
        });
    });
  });
