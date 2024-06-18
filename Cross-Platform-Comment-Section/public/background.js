const LINKS = ['https://www.youtube.com/watch', 'https://www.netflix.com/watch','https://www.primevideo.com'];

chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

chrome.tabs.onActivated.addListener((a) => {
    chrome.tabs.query({ active: true, currentWindow: true },async (tabs) => {

        const url = new URL(tabs[0].url);
        console.log(url)
        let tabId = tabs[0].id

        if (!tabs[0].url) {
            await chrome.sidePanel.setOptions({
                tabId,
                enabled: false
            });
        }

        if (!LINKS.includes(url.origin)){
            await chrome.sidePanel.setOptions({
                tabId,
                enabled: false
            });
        }else{
            await chrome.sidePanel.setOptions({
                tabId,
                width: 300,
                path: 'index.html',
                enabled: true
            });
        }
    })
})
chrome.tabs.onUpdated.addListener((a,b,c) => {
    chrome.tabs.query({ active: true, currentWindow: true },async (tabs) => {
        const LINKS = ['https://www.youtube.com', 'https://www.netflix.com','https://www.primevideo.com'];

        const url = new URL(tabs[0].url);
        console.log(url)
        let tabId = tabs[0].id

        if (!tabs[0].url) {
            await chrome.sidePanel.setOptions({
                tabId,
                enabled: false
            });
        }

        if (!LINKS.includes(url.origin)){
            await chrome.sidePanel.setOptions({
                tabId,
                enabled: false
            });
        }else{
            await chrome.sidePanel.setOptions({
                tabId,
                path: 'index.html',
                enabled: true
            });
        }
    })
})
