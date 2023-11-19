function handleBackgroundColorChange() {
    // Set color in color picker to a variable
    // Chrome query to access tab?
    // Set background color
  
    /* EXAMPLE from chrome extension sample "tutorial.broken-color"
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Use the Scripting API to execute a script
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        args: [color],
        func: setColor
      });
    }); */
  }
  
  function handleTextColorChange() {
    // Similar logic to handleBackgroundColorChange function but for text
  }