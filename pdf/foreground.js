// var port = chrome.runtime.connect({name: "overleave_url"});
// port.onMessage.addListener(function(msg) {
//     // console.log(msg);
//     if (msg.new_url)
//         console.log(msg.new_url);
// });

// The ID of the extension we want to talk to.
var editorExtensionId = "ecjjfbmbjnhnjahdefacecabpfoibgma";

// Make a simple request:
chrome.runtime.sendMessage(editorExtensionId, {openUrlInEditor: url},
    function(response) {
        if (!response.success)
        handleError(url);
    });