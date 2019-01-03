chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.get({active: true}, function(data) {
		chrome.storage.sync.set({active: data.active});
	});
});

chrome.browserAction.onClicked.addListener(function() {
	chrome.storage.sync.get({active: true}, function(data) {
		chrome.storage.sync.set({active: !data.active});
	});
});
