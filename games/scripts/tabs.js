function opentab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabs-parallel" and hide them
  tabcontent = document.querySelectorAll(".game-tabs");
  tabcontent.forEach(tab => {
      tab.style.display = "none"
      console.warn(tab)
  }) 

  // Get all elements with class="tablinks-parallel" and remove the class "active"
  tablinks = document.querySelectorAll(".tablinks-gb");
  tablinks.forEach(tabB => {
      tabB.classList.remove("active-tab");
      console.warn(tabB)
  }) 
  



  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "flex";
  evt.currentTarget.classList.add("active-tab");
}

document.addEventListener('DOMContentLoaded', function() {
  
 // document.getElementById("storeB").click();
//  document.getElementById("badgeB").click();
//  document.getElementById("vidB").click();
 // document.getElementById("serverB").click();
  document.getElementById("descB").click();
});



