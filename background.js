const LINKS = ['https://www.google.com', 'https://www.youtube.com'];

chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    console.log("Tab updated")
    console.log(tab)
    console.log(tabId)
    if (!tab.url) {
        await chrome.sidePanel.setOptions({
            tabId,
            enabled: false
        });
    }
    const url = new URL(tab.url);
    // Enables the side panel on google.com
    if (LINKS.includes(url.origin)) {
        await chrome.sidePanel.setOptions({
            tabId,
            path: 'sidepanel.html',
            enabled: true
        });
    } else {
        // Disables the side panel on all other sites
        await chrome.sidePanel.setOptions({
            tabId,
            enabled: false
        });
    }
});
