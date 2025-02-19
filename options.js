document.getElementById('saveBtn').addEventListener('click', () => {
  const filters = document.getElementById('customFilters').value.split('\n');
  chrome.storage.local.set({ customFilters: filters });
  chrome.runtime.sendMessage({ action: "updateRules" });
});

// सेव्ड फ़िल्टर लोड करें
chrome.storage.local.get('customFilters', (data) => {
  if (data.customFilters) {
    document.getElementById('customFilters').value = data.customFilters.join('\n');
  }
});