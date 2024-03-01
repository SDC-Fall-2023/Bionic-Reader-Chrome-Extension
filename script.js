document.addEventListener("DOMContentLoaded", function () {
  var bionicReaderEnabled = false;

  // Function to toggle the Bionic Reader state
  function toggleBionicReader() {
    bionicReaderEnabled = !bionicReaderEnabled;
    var toggleBtn = document.getElementById("toggleBtn");
    toggleBtn.textContent = bionicReaderEnabled ? "ON" : "OFF";

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggleBionicReading" });
    });
  }

  async function dictionary(word) {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const result = await response.json();
    return result[0].meanings;
  }

  // Add click event listener to the button
  document
    .getElementById("toggleBtn")
    .addEventListener("click", toggleBionicReader);

  // Add input event listeners to color pickers
  document
    .getElementById("backgroundColorPicker")
    .addEventListener("input", (event) => {
      const color = event.target.value;

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          args: [color],
          func: setColor,
        });
      });
    });

  function setColor(color) {
    document.body.style.backgroundColor = color;
  }

  document
    .getElementById("textColorPicker")
    .addEventListener("input", (event) => {
      const color = event.target.value;

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          args: [color],
          func: setTextColor,
        });
      });
    });

  function setTextColor(color) {
    var eles = document.getElementsByTagName("*");
    for (var i = 0; i < eles.length; i++) {
      eles[i].style.color = color;
    }
  }

  // Add click event listener to the Search button for dictionary search
  document
    .getElementById("searchButton")
    .addEventListener("click", async () => {
      const word = document.getElementById("dictionaryInput").value;

      const target = document.getElementById("dictionaryOutput");

      while (target.hasChildNodes()) {
        target.removeChild(target.lastChild);
      }

      if (word === "") {
        return;
      }

      const response = await dictionary(word);
      response.forEach((defType) => {
        const partOfSpeech = document.createElement("h5");
        partOfSpeech.textContent = defType.partOfSpeech;
        target.appendChild(partOfSpeech);

        defType.definitions.forEach((def) => {
          const definition = document.createElement("p");
          definition.textContent = def.definition;
          target.appendChild(definition);
        });
      });
    });
});
