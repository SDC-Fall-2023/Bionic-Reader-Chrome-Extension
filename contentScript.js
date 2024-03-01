(function () {
  // Function to toggle Bionic Reading on the page
  function applyBionicReading() {
    const textElements = document.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, span"
    );
    textElements.forEach((element) => {
      if (element.hasAttribute("data-original-text")) {
        // If already processed, revert to original text
        element.innerHTML = element.getAttribute("data-original-text");
        element.removeAttribute("data-original-text");
      } else {
        // Store original text and apply Bionic Reading
        element.setAttribute("data-original-text", element.innerHTML);
        const modifiedHtml = element.innerHTML.replace(
          /\b(\w+)\b/g,
          (match) => {
            const mid = Math.ceil(match.length / 2);
            return `<span><strong>${match.substring(
              0,
              mid
            )}</strong>${match.substring(mid)}</span>`;
          }
        );
        element.innerHTML = modifiedHtml;
      }
    });
  }

  // Listen for messages from the extension
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.action === "toggleBionicReading") {
      applyBionicReading();
      sendResponse({ status: "Bionic Reading toggled" });
    }
  });
})();
