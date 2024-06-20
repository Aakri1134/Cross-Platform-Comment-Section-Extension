const LINKS = ['https://www.youtube.com', 'https://www.netflix.com','https://www.primevideo.com','https://www.jiocinema.com'];

chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

chrome.tabs.onActivated.addListener((a) => {
    chrome.tabs.query({ active: true, currentWindow: true },async (tabs) => {

        let tabId = tabs[0].id
        console.log("activated")

        if (!tabs[0].url) {
            await chrome.sidePanel.setOptions({
                tabId,
                enabled: false
            });
        }

        const url = new URL(tabs[0].url);
        console.log(url)
        

        if (!LINKS.includes(url.origin)){
            await chrome.sidePanel.setOptions({
                tabId,
                enabled: false
            });
        }else{
            if(url.origin === "https://www.youtube.com" || url.origin === "https://www.netflix.com"){
                if(url.pathname.includes("/watch")){
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
            }else{
                await chrome.sidePanel.setOptions({
                    tabId,
                    path: 'index.html',
                    enabled: true
                });
            }
            
        }
    })
})
chrome.tabs.onUpdated.addListener((a,b,c) => {
    chrome.tabs.query({ active: true, currentWindow: true },async (tabs) => {
        console.log("updated")
        let tabId = tabs[0].id
        if (!tabs[0].url) {
            await chrome.sidePanel.setOptions({
                tabId,
                enabled: false
            });
        }

        const url = new URL(tabs[0].url);
        console.log(url)
        

        if (!LINKS.includes(url.origin)){
            await chrome.sidePanel.setOptions({
                tabId,
                enabled: false
            });
        }else{
            if(url.origin === "https://www.youtube.com" || url.origin === "https://www.netflix.com"){
                if(url.pathname.includes("/watch")){
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
            }else{
                await chrome.sidePanel.setOptions({
                    tabId,
                    path: 'index.html',
                    enabled: true
                });
            }
            
        }
    })
})