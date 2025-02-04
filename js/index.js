const copyrightYear = new Date().getFullYear();
document.getElementById("year").innerHTML = copyrightYear;

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    let form = this;
    let formData = new FormData(form);
    let responseMessage = document.getElementById("responseMessage");
    let submitButton = document.getElementById("submitButton");

    // Show loading message & disable button
    responseMessage.textContent = "Sending...";
    responseMessage.style.color = "blue";
    responseMessage.classList.remove("hidden");
    submitButton.disabled = true;

    fetch(form.action, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error("Form submission failed.");
    })
    .then(() => {
        responseMessage.textContent = "Successfully Sent!";
        responseMessage.style.color = "green";
        form.reset(); // Clears form after submission
    })
    .catch(() => {
        responseMessage.textContent = "Send Failed. Try Again!";
        responseMessage.style.color = "red";
    })
    .finally(() => {
        // Re-enable button & hide message after 3 seconds
        setTimeout(() => {
            responseMessage.classList.add("hidden");
            submitButton.disabled = false;
        }, 3000);
    });
});
