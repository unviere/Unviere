function opentab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabs-parallel" and hide them
  tabcontent = document.querySelectorAll(".event-tabs-c");
  tabcontent.forEach(tab => {
      tab.style.display = "none"
      console.warn(tab)
  }) 

  // Get all elements with class="tablinks-parallel" and remove the class "active"
  tablinks = document.querySelectorAll(".tablinks-event");
  tablinks.forEach(tabB => {
      tabB.classList.remove("active-tab-ev");
      console.warn(tabB)
  }) 
  



  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "flex";
  evt.currentTarget.classList.add("active-tab-ev");
}

document.addEventListener('DOMContentLoaded', function() {
  
 // document.getElementById("storeB").click();
//  document.getElementById("badgeB").click();
//  document.getElementById("vidB").click();
 // document.getElementById("serverB").click();
  document.getElementById("infoB").click();
});



