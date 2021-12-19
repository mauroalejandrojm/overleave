
// var port = chrome.runtime.connect({name: "knockknock"});
// port.postMessage({joke: "Knock knock"});
// port.onMessage.addListener(function(msg) {
//     console.log(msg);
//     if (msg.question == "Who's there?")
//         port.postMessage({answer: "Madame"});
//     else if (msg.question == "Madame who?")
//         port.postMessage({answer: "Madame... Bovary"});
// });

var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';
// document settings
var currPage = 1; //Pages are 1-based not 0-based
var numPages = 0;
var thePDF = null;
// pdf.js object structure
pdfjsLib.getDocument(url).promise.then(function(pdf) {
        //Set PDFJS global object (so we can easily access in our page functions
        thePDF = pdf;
        //How many pages it has
        numPages = pdf.numPages;
        //Start with first page
        pdf.getPage( 1 ).then( handlePages );
});

function handlePages(page) {
    //This gives us the page's dimensions at full scale
    var viewport = page.getViewport( {scale: 2} );
    //We'll create a canvas for each page to draw it on
    var canvas = document.createElement( "canvas" );
    canvas.style.display = "block";
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    //Draw it on the canvas
    page.render({canvasContext: context, viewport: viewport});
    //Add it to the web page
    document.body.appendChild( canvas );
    var line = document.createElement("hr");
    document.body.appendChild( line );
    //Move to next page
    currPage++;
    if ( thePDF !== null && currPage <= numPages ) {
        thePDF.getPage( currPage ).then( handlePages );
    }
}