chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye"});
    });

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg);
    var display = "";
    if (msg.valid) {
        display = "word: " + msg.word + " score: " + msg.score;
    }
    else {
        display = "invalid word: " + msg.word;
    }
    $("#scrable-id").remove();

    var current_index_highest = $.topZIndex("div");


    $('body').prepend(
        '<div id="scrable-id" style="position: absolute; right: 0; width: 250px; z-index:' + current_index_highest + 1 + ' " class="w3-card-4">' +
        '<header class="w3-container w3-blue">Scrabble info</header>' +
        '<div class="w3-container w3-blue">' + display + '</div>' +
        '</div>');
});