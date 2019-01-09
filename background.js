chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.get({active: true}, function(data) {
		chrome.storage.sync.set({active: data.active});
	});
});

chrome.browserAction.onClicked.addListener(function() {
	chrome.storage.sync.get({active: true}, function(data) {
		chrome.storage.sync.set({active: !data.active});
		chrome.tabs.query({}, function(tabs) {
			for (let i = 0; i < tabs.length; i++) {
				chrome.tabs.sendMessage(tabs[i].id, {active: !data.active});
			}
		});
	});
});
