document.addEventListener("DOMContentLoaded", function () {
  var bionicReaderEnabled = false;

  // Function to toggle the Bionic Reader state
  function toggleBionicReader() {
    bionicReaderEnabled = !bionicReaderEnabled;
    var toggleBtn = document.getElementById("toggleBtn");

    if (bionicReaderEnabled) {
      toggleBtn.textContent = "Bionic Text: ON";
      // Add logic to enable Bionic Reader functionality here
    } else {
      toggleBtn.textContent = "Bionic Text: OFF";
      // Add logic to disable Bionic Reader functionality here
    }
  }
  // Add click event listener to the button
  document
    .getElementById("toggleBtn")
    .addEventListener("click", toggleBionicReader);

  // Add input event listeners to color pickers
  document
    .getElementById("backgroundColorPicker")
    .addEventListener("input", handleBackgroundColorChange);
  document
    .getElementById("textColorPicker")
    .addEventListener("input", handleTextColorChange);
});
