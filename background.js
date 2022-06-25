/**
 * Execute script on extension icon click
 */
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['script.js']
  });
});