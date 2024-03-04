(function () {
  // Function to toggle Bionic Reading on the page
  function applyBionicReading() {
    document
      .querySelectorAll("p, h1, h2, h3, h4, h5, h6, span")
      .forEach((element) => {
        // Skip if the element is a hyperlink or within a hyperlink
        if (element.tagName === "A" || element.closest("a")) {
          return;
        }

        if (element.hasAttribute("data-original-text")) {
          // Revert to original text if already processed
          element.innerHTML = element.getAttribute("data-original-text");
          element.removeAttribute("data-original-text");
        } else {
          // Apply Bionic Reading
          element.setAttribute("data-original-text", element.innerHTML);
          const modifiedHtml = element.innerHTML.replace(
            /\b(\w+)\b/g,
            (match) => {
              const mid = Math.ceil(match.length / 2);
              // Skip over non-word characters and hyperlinks
              if (!match.match(/^\w+$/)) {
                return match; // Return the original string if it contains special characters
              }
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
