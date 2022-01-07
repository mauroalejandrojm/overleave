// setting toggle default value when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    'toggle_status':'false'
  }, () => {
  chrome.browserAction.setIcon({path: '../icons/icon-16x16.png'});
  });
});

// setting toggle initial value
let toggle_status = null;

//replace the initial value with the actual value
chrome.storage.local.get('toggle_status', (data) => {
  if ( (data.toggle_status === null) || (data.toggle_status == 'false') ) {
    toggle_status = 'false';
    chrome.browserAction.setIcon({path: '../icons/icon-16x16.png'});
  }
  else {
    toggle_status = 'true';
    chrome.browserAction.setIcon({path:'../icons/overleave-active.png'});
  }
});

// updating the global value of the toggle
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace == 'local') {
    if (changes.toggle_status) {
      toggle_status = changes.toggle_status.newValue;
    }
  }
})
