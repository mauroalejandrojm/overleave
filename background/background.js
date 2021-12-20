var toggle_status = null;

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

chrome.tabs.onUpdated.addListener(function _(tabId, changeInfo, tab) {
    if (/^https:\/\/www\.overleaf.com\/project/.test(tab.url)) {
      chrome.tabs.onUpdated.removeListener(_);
      sandboxWindow = window.open("../pdf/pdf.html","overleave_sandbox");
    }
});

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "overleave_url");
  port.onMessage.addListener(function(msg) {
    // console.log(msg);
    if (msg.url) {
      var iframe = document.getElementById('extension-iframe');
      iframe.contentWindow.postMessage(msg.url, '*');
      window.addEventListener('message', function (event) {
        console.log("data catch in background listener: " + event["data"]);
      }, { once: true })
    }
  });
});