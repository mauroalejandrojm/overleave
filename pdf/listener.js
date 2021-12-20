// Listen to messages sent by background.js
window.addEventListener('message', function (event) {
  console.log("data catch in sandbox listener: " + event["data"]);
  event.source.postMessage('confirmation from sandboxjs', event.origin)
})