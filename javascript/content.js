var tab_window = window;
var popup_toggle = null;
var oldURL = sessionStorage.getItem("oldURL");
var newURL = sessionStorage.getItem("newURL");

chrome.storage.local.get("toggle_status",(data)=> {
    popup_toggle = data["toggle_status"];

    if (popup_toggle === null) {
        popup_toggle = 'false'
    }
    
    if (popup_toggle == 'true') {
        if (oldURL === null || newURL === null) { 
            oldURL = "";
            newURL = "";
            tab_state = '';
        }
        else {
            oldURL = oldURL;
            newURL = newURL;
            tab_state = newURL;
        }
        if (window.location.href.length>32)
            tab_window = window.open(tab_state, "_overleave");
    }
});

window.onload = function() {
    var oldURL = sessionStorage.getItem("oldURL");
    var newURL = sessionStorage.getItem("newURL");
    chrome.storage.local.get("toggle_status",(data)=> {
        popup_toggle = data["toggle_status"];
        chrome.storage.local.set({"toggle_status": popup_toggle});
        if (oldURL === null && newURL === null) { 
            oldURL = "";
            newURL = "";
        }
        else {
            oldURL = oldURL;
            newURL = newURL;
        }
    });
}

window.onbeforeunload = function() {
    chrome.storage.local.get("toggle_status", (data) => {
        popup_toggle = data["toggle_status"];
        chrome.storage.local.set({"toggle_status": popup_toggle});
    });
    sessionStorage.setItem("oldURL", oldURL);
    sessionStorage.setItem("newURL", newURL);
}

function updateWindow(elem) {
    newURL = elem.href.slice(0, -19);
    if (newURL !== oldURL) {
        oldURL = newURL;
        if ((popup_toggle == 'true') && (tab_window)) {
            tab_window.location.replace(newURL);
        }   
    }
}

function waitForBuild() {
    return new Promise(function (resolve, reject) {
        var counter = 0;

        var checkExist = setInterval(function () {
            counter += 1;
            if (counter > 250) {
                clearInterval(checkExist);
            }

            const matches = document.body.getElementsByTagName("a");
            
            for (const match of matches) {
                let url = JSON.stringify(match.href);
                if (url.includes("build") && url.includes("pdf") && url.includes("download")) {
                    clearInterval(checkExist);
                    updateWindow(match); 
                    resolve(match);
                    break;
                }
            }

        }, 500);
    });
}

waitForBuild().then((elem) => {

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type == "attributes") {
                updateWindow(elem);
            }
        });
    });

    observer.observe(elem, {
        attributes: true
    });

}).catch(err => {
    //TODO(shreyashankar): do something better here
    console.log(err);
});