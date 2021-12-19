let toggle_status = null;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get('toggle_status', (data) =>{
    if ( (data.toggle_status === null) || (data.toggle_status == 'false') ) {
      toggle_status = 'false';
      chrome.storage.local.set({"toggle_status":'false'});
      chrome.browserAction.setIcon({path: '../icons/icon-16x16.png'});
    }
    else {
      toggle_status = 'true';
      chrome.storage.local.set({"toggle_status":'true'});
      chrome.browserAction.setIcon({path:'../icons/overleave-active.png'});
    }
  });
});

chrome.tabs.onCreated.addListener(function (tab) {
    if ((tab.url === "") && (tab.title === "")) {
        // chrome.tabs.onCreated.removeListener(_);
        // chrome.tabs.executeScript(tab.id, {code: './foreground.js', allFrames: true});
        let url = chrome.runtime.getURL("../pdf/pdf.html");
        chrome.tabs.update(tab.id,{ url: url, active: false });
        console.log(tab.url);
    }
});