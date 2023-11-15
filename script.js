document.addEventListener("DOMContentLoaded", function () {
  var bionicReaderEnabled = false;

  // Function to toggle the Bionic Reader state
  function toggleBionicReader() {
    bionicReaderEnabled = !bionicReaderEnabled;
    var toggleBtn = document.getElementById("toggleBtn");

    if (bionicReaderEnabled) {
      toggleBtn.textContent = "ON";
      // Add logic to enable Bionic Reader functionality here
    } else {
      toggleBtn.textContent = "OFF";
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

  // Add click event listener to the Search button for dictionary search
  document
    .getElementById("searchButton")
    .addEventListener("click", handleDictionarySearch);
});
