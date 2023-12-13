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
    .addEventListener('input', (event) => {
      const color = event.target.value;
    
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          args: [color],
          func: setColor
        });
      });
    });

  function setColor(color) {
    document.body.style.backgroundColor = color;

  }

  document
    .getElementById("textColorPicker")
    .addEventListener('input', (event) => {
      const color = event.target.value;
    
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          args: [color],
          func: setTextColor
        });
      });
    });

  function setTextColor(color) {
    var eles = document.getElementsByTagName("*");
    for (var i=0; i < eles.length; i++) 
    {    
        eles[i].style.color = color;
    }
  }

  // Add click event listener to the Search button for dictionary search
  document
    .getElementById("searchButton")
    .addEventListener("click", handleDictionarySearch);
});
