document.addEventListener("DOMContentLoaded", function () {
  var bionicReaderEnabled = false;

  // Function to toggle the Bionic Reader state
  function toggleBionicReader() {
    bionicReaderEnabled = !bionicReaderEnabled;
    var toggleBtn = document.getElementById("toggleBtn");

    if (bionicReaderEnabled) {
      toggleBtn.textContent = "Bionic Reader: ON";
      // Add logic to enable Bionic Reader functionality here
    } else {
      toggleBtn.textContent = "Bionic Reader: OFF";
      // Add logic to disable Bionic Reader functionality here
    }
  }

  // Add click event listener to the button
  document
    .getElementById("toggleBtn")
    .addEventListener("click", toggleBionicReader);
});
