document.getElementById('toggle').addEventListener('change', function() {
  chrome.storage.local.set({ adBlockerEnabled: this.checked });
  chrome.runtime.sendMessage({ action: "updateRules" });
});

// Load saved state
chrome.storage.local.get('adBlockerEnabled', (data) => {
  document.getElementById('toggle').checked = data.adBlockerEnabled ?? true;
});