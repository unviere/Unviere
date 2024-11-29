function opentab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="event-tabs-c" and hide them
 // tabcontent = document.querySelector('#co-card').querySelectorAll(".event-tabs-c");
//  tabcontent.forEach(tab => 
//tab.style.display = "none"; // Hide all tabs
   // console.warn("Hiding tab:", tab); // Log each hidden tab
 // });
 
 document.querySelector('#co-card').querySelector('#desc-ev').style.display = "none"
 
 document.querySelector('#co-card').querySelector('#info').style.display = "none"
 
 document.querySelector('#co-card').querySelector('#reward').style.display = "none"

  // Get all elements with class="tablinks-event" and remove the class "active-tab-ev"
  tablinks = document.querySelector('#co-card').querySelectorAll(".tablinks-event");
  tablinks.forEach(tabB => {
    tabB.classList.remove("active-tab-ev"); // Remove active class from all tabs
    console.warn("Removing active class from:", tabB); // Log each removed class
  });

  // Show the current tab and add an "active" class to the button that opened the tab
  const activeTab = document.querySelector(tabName); // Use tabName directly
  if (activeTab) {
    activeTab.style.display = "flex"; // Show the active tab
    console.warn("Displaying tab:", activeTab); // Log displayed tab
  } else {
    console.warn("No tab found for", tabName); // If no tab is found, log the tabName
  }

  // Add the "active" class to the button that opened the tab
  evt.currentTarget.classList.add("active-tab-ev");
}

document.addEventListener('DOMContentLoaded', function() {
  // Simulate clicking the first tab upon page load
  const firstTabButton = document.querySelector('#co-card').querySelector("#infoB");
  if (firstTabButton) {
    firstTabButton.click();  // Trigger the click event for the first tab
    console.warn("Simulated click on first tab:", firstTabButton); // Log simulated click
  } else {
    console.warn("First tab button not found"); // Log error if first tab button is not found
  }
});