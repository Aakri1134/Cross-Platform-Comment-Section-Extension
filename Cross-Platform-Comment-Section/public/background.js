const LINKS = ['https://www.youtube.com', 'https://www.netflix.com'];

chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

chrome.tabs.onActivated.addListener((a) => {
    chrome.tabs.query({ active: true, currentWindow: true },async (tabs) => {

        if (!tabs[0].url) {
            await chrome.sidePanel.setOptions({
                tabId,
                enabled: false
            });
          }

        const url = new URL(tabs[0].url);
        console.log(url)
        let tabId = tabs[0].id

        if (!LINKS.includes(url.origin)){
            await chrome.sidePanel.setOptions({
                tabId,
                enabled: false
            });
        }else{
            if(url.pathname.includes("watch")){
                await chrome.sidePanel.setOptions({
                    tabId,
                    path: 'index.html',
                    enabled: true
                });
            }else{
                await chrome.sidePanel.setOptions({
                    tabId,
                    enabled: false
                });
            }
        }
    })
})
chrome.tabs.onUpdated.addListener((a,b,c) => {
    chrome.tabs.query({ active: true, currentWindow: true },async (tabs) => {
        const LINKS = ['https://www.youtube.com', 'https://www.netflix.com'];

        if (!tabs[0].url) {
            await chrome.sidePanel.setOptions({
                tabId,
                enabled: false
            });
          }

        const url = new URL(tabs[0].url);
        console.log(url)
        let tabId = tabs[0].id

        if (!LINKS.includes(url.origin)){
            await chrome.sidePanel.setOptions({
                tabId,
                enabled: false
            });
        }else{
            if(url.pathname.includes("watch")){
                await chrome.sidePanel.setOptions({
                    tabId,
                    path: 'index.html',
                    enabled: true
                });
            }else{
                await chrome.sidePanel.setOptions({
                    tabId,
                    enabled: false
                });
            }
        }
    })
})
