function getword(info, tab) {
    console.log("Word " + info.selectionText + " was clicked.");

    $.getJSON("http://127.0.0.1:5000/score_word/" + info.selectionText).done(function (data) {

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, data, function (response) {
            });
        });

    });

    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    //     chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt"}, function(response) {});
    // });


}

chrome.contextMenus.create({
    title: "Get scrabble info: %s",
    contexts: ["selection"],
    onclick: getword,
});
