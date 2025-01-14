let toggle_status = null;
const toggle_element = document.querySelector("#toggle #input");

chrome.storage.local.get('toggle_status', (data) =>{
  toggle_status = data["toggle_status"];
  if ( (toggle_status===null) || (toggle_status=='false') ) {
    toggle_status = 'false';
    toggle_element.checked = "";
  }
  else {
    toggle_element.checked = toggle_status;
  }
});

document.addEventListener('DOMContentLoaded', function () {
    
    document.getElementById("checkbox").addEventListener('click', onclick_checkbox, false);
    document.getElementById("button_1").addEventListener('click', onclick_left, false);
    document.getElementById("button_2").addEventListener('click', onclick_right, false);

    function onclick_checkbox () {
      chrome.tabs.query({currentWindow: true, active: true}, 
        function (tabs) {
            url = tabs[0].url;
            url = url.match("https://www.overleaf.com/project/*");
            if (url !== null) {
              chrome.storage.local.get('toggle_status', (data) =>{
                toggle_status = data["toggle_status"];
                if (toggle_status == 'false') {
                  chrome.storage.local.set({"toggle_status": 'true'});
                  chrome.tabs.sendMessage(tabs[0].id, 'true');
                  chrome.browserAction.setIcon({path: '../icons/overleave-active.png'});
                }
                else {
                  chrome.storage.local.set({"toggle_status": 'false'});
                  chrome.tabs.sendMessage(tabs[0].id, 'false');
                  chrome.browserAction.setIcon({path: '../icons/icon-16x16.png'});
                }
              });
            }
      })
    }

    function onclick_left () {
      chrome.tabs.query({currentWindow: true, active: true}, 
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 'new_project');
      })
    }

    function onclick_right () {
      chrome.tabs.query({currentWindow: true, active: true}, 
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 'projects');
      })
    }
  }, false)