// एड्स ब्लॉक करने के लिए फ़िल्टर रूल्स
const adFilters = [
  "*://*.doubleclick.net/*",
  "*://*.googleadservices.com/*",
  "*://*.googlesyndication.com/*",
  "*://*.adsafeprotected.com/*",
  "*://*.adnxs.com/*",
  "*://*.adservice.google.com/*",
  "||ads.example.com^",
  // और भी 1000+ फ़िल्टर यहां एड करें
];

// डायनामिक रूल्स जेनरेट करें
function generateRules() {
  return adFilters.map((filter, index) => ({
    id: index + 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: filter,
      resourceTypes: ["script", "image", "stylesheet", "xmlhttprequest"]
    }
  }));
}

// रूल्स अपडेट करें (ON/OFF के अनुसार)
async function updateRules() {
  const { adBlockerEnabled } = await chrome.storage.local.get('adBlockerEnabled');
  if (adBlockerEnabled ?? true) {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: generateRules(),
      removeRuleIds: generateRules().map(rule => rule.id)
    });
  } else {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: generateRules().map(rule => rule.id)
    });
  }
}

// मैसेज लिसनर
chrome.runtime.onMessage.addListener((req) => {
  if (req.action === "updateRules") updateRules();
});

// इनिशियल सेटअप
updateRules();