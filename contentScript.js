function processTextNode(node) {
  const processedText = node.textContent
    .split(" ")
    .map((word) => {
      const midpoint = Math.floor(word.length / 2);
      const firstHalf = `<strong>${word.slice(0, midpoint)}</strong>`;
      const secondHalf = `${word.slice(midpoint)}`;
      return `${firstHalf}${secondHalf}`;
    })
    .join(" ");
  return processedText;
}

function applyBionicReading() {
  document
    .querySelectorAll("p, h1, h2, h3, h4, h5, h6, span")
    .forEach((element) => {
      if (element.tagName === "A" || element.closest("a")) {
        return; // Skip hyperlinks
      }
      Array.from(element.childNodes).forEach((node) => {
        if (node.nodeType === 3 && node.textContent.trim().length > 0) {
          // Node is a text node and not just whitespace
          const span = document.createElement("span");
          span.innerHTML = processTextNode(node);
          node.replaceWith(span);
        }
      });
    });
}

let isBionicEnabled = false; // Tracks the state of the Bionic Reading effect

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleBionicReading") {
    isBionicEnabled = !isBionicEnabled; // Toggle state
    if (isBionicEnabled) {
      applyBionicReading(); // Apply effect
    } else {
      // Reload the page or undo the bionic reading effect, based on your implementation preference
      window.location.reload();
      // Note: Reloading the page is a simple way to undo changes but might not be ideal for user experience.
      // Consider a more refined approach for reverting text modifications.
    }
    sendResponse({ status: "Bionic Reading toggled" });
  }
});
