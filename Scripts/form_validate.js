(function () {
  "use strict";

  // Fetch all the forms we want to apply custom validation styles to
  const forms = document.querySelectorAll(".form-p");
  const result = document.getElementById("result");

  // Function to ensure only one checkbox is checked per group and manage 'required' attribute
  function manageCheckboxGroup(checkbox, groupName) {
    const checkboxes = document.getElementsByName(groupName);
    const isRequiredGroup = checkbox.closest('.checkbox-group').dataset.requiredGroup === "true"; // Check if group is required

    // Uncheck all checkboxes in the group and remove 'required' attribute
    checkboxes.forEach(function (item) {
      item.checked = false;
      item.required = false; 
    });

    // Check the clicked checkbox
    checkbox.checked = true;

    // If it's a required group, set the 'required' attribute on the checked checkbox
    if (isRequiredGroup) {
      checkbox.required = true;
    }
  }

  // Attach the manageCheckboxGroup function to checkbox click events
  document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener('click', function () {
      manageCheckboxGroup(checkbox, checkbox.getAttribute('name'));
    });
  });

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        // Check if the form is valid
        if (!form.checkValidity()) {
          console.log("Form is invalid"); // Debugging log
          event.preventDefault();
          event.stopPropagation();

          // Focus on the first invalid input and show validation messages
          const firstInvalidField = form.querySelector(":invalid");
          if (firstInvalidField) {
            firstInvalidField.focus();
            console.log(`Invalid field: ${firstInvalidField.name}`); // Log which field is invalid
          }

          // Show custom validation feedback
          form.querySelectorAll(":invalid").forEach(function (field) {
            const feedback = field.nextElementSibling;
            if (feedback && feedback.classList.contains("invalid-feedback")) {
              feedback.style.display = "block";
            }
          });
        } else {
          // Prevent default form submission
          event.preventDefault();
          event.stopPropagation();

          // Serialize form data to JSON
          var formData = new FormData(form);
          var object = {};
          formData.forEach((value, key) => {
            object[key] = value;
          });
          var json = JSON.stringify(object);

          console.log("Form data ready for submission:", json); // Debugging log

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
              console.log("Response received:", response); // Log the response object
              let json = await response.json();
              console.log("Response JSON:", json); // Log the parsed JSON
              if (response.status == 200) {
                // Successful submission
                result.innerHTML = json.message;

                // Get redirect URL from hidden input
                const redirectUrl = form.querySelector('input[name="redirect"]').value;
                console.log("Redirecting to:", redirectUrl); // Debugging log

                // Redirect to success page after a short delay
                setTimeout(() => {
                  window.location.href = redirectUrl; // Redirect to the URL specified in the form
                }, 2000); // Adjust the delay as needed
              } else {
                // Error in submission
                console.log("Error response:", response);
                result.innerHTML = json.message;
              }
            })
            .catch((error) => {
              console.log("Fetch error:", error);
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

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form'); // Adjust if your form has a different selector
    const checkboxGroup = document.querySelector('.checkbox');
    const errorMessage = document.querySelector('.checkbox-error-message');
    
    form.addEventListener('submit', function(event) {
      const checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');
      let isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
      if (!isChecked) {
        event.preventDefault(); // Prevent form submission
        errorMessage.style.display = 'block'; // Show error message
      } else {
        errorMessage.style.display = 'none'; // Hide error message
      }
    });
    
    
    const checkboxGroup2 = document.querySelector('.checkbox2');
    const errorMessage2 = document.querySelector('.checkbox-error-message2');
    
    form.addEventListener('submit', function(event) {
      const checkboxes = checkboxGroup2.querySelectorAll('input[type="checkbox"]');
      let isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
      if (!isChecked) {
        event.preventDefault(); // Prevent form submission
        errorMessage2.style.display = 'block'; // Show error message
      } else {
        errorMessage2.style.display = 'none'; // Hide error message
      }
    });
    
    const checkboxGroup3 = document.querySelector('.checkbox3');
    const errorMessage3 = document.querySelector('.checkbox-error-message3');
    
    form.addEventListener('submit', function(event) {
      const checkboxes = checkboxGroup3.querySelectorAll('input[type="checkbox"]');
      let isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
      if (!isChecked) {
        event.preventDefault(); // Prevent form submission
        errorMessage3.style.display = 'block'; // Show error message
      } else {
        errorMessage3.style.display = 'none'; // Hide error message
      }
    });
    
    const checkboxGroup4 = document.querySelector('.checkbox4');
    const errorMessage4 = document.querySelector('.checkbox-error-message4');
    
    form.addEventListener('submit', function(event) {
      const checkboxes = checkboxGroup4.querySelectorAll('input[type="checkbox"]');
      let isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
      if (!isChecked) {
        event.preventDefault(); // Prevent form submission
        errorMessage4.style.display = 'block'; // Show error message
      } else {
        errorMessage4.style.display = 'none'; // Hide error message
      }
    });
    

    
});