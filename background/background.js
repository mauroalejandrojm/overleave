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
