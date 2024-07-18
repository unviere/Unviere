(function() {
  "use strict";

  // Fetch all the forms we want to apply custom validation styles to
  const forms = document.querySelectorAll(".form-p");
  const result = document.getElementById("result");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function(form) {
    form.addEventListener(
      "submit",
      function(event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();

          // Focus on the first invalid input
          form.querySelectorAll(":invalid")[0].focus();
        } else {
          // Prevent default form submission
          event.preventDefault();
          event.stopPropagation();

          // Serialize form data to JSON
          const formData = new FormData(form);
          const object = {};
          formData.forEach((value, key) => {
            object[key] = value;
          });
          const json = JSON.stringify(object);

          // Display "Please wait..." message
          result.innerHTML = "Please wait...";
          result.style.display = "block"; // Ensure result div is visible

          // Submit form data using fetch
          fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: json,
            })
            .then(async (response) => {
              let json = await response.json();
              if (response.status == 200) {
                // Successful submission
                result.innerHTML = json.message;
              } else {
                // Error in submission
                console.log(response);
                result.innerHTML = json.message;
              }
            })
            .catch((error) => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
            })
            .finally(() => {
              // Reset form after submission attempt
              form.reset();
              form.classList.remove("was-validated");
              setTimeout(() => {
                result.style.display = "none"; // Hide result div after 5 seconds
              }, 5000);
            });
        }

        // Add 'was-validated' class to form to display validation styles
        form.classList.add("was-validated");
      },
      false
    );
  });
})();