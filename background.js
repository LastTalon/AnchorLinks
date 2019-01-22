const active_icons = {
	16: "images/icon16.png",
	32: "images/icon32.png",
	48: "images/icon48.png",
	64: "images/icon64.png",
	128: "images/icon128.png",
	256: "images/icon256.png"
}

const inactive_icons = {
	16: "images/inactive_icon16.png",
	32: "images/inactive_icon32.png",
	48: "images/inactive_icon48.png",
	64: "images/inactive_icon64.png",
	128: "images/inactive_icon128.png",
	256: "images/inactive_icon256.png"
}

function propagateSetting(key, value) {
	if (key === "active") {
		if (value) {
			chrome.browserAction.setIcon({path: active_icons});
		} else {
			chrome.browserAction.setIcon({path: inactive_icons});
		}
	}
	
	chrome.tabs.query({}, function(tabs) {
		for (const tab of tabs) {
			chrome.tabs.sendMessage(tab.id, {[key]: value});
		}
	});
}

chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.get(options, function(data) {
		chrome.storage.sync.set(data);
		for (const key of Object.keys(data)) {
			propagateSetting(key, data[key]);
		}
	});
});

chrome.browserAction.onClicked.addListener(function() {
	chrome.storage.sync.get({active: options.active}, function(data) {
		chrome.storage.sync.set({active: !data.active});
		propagateSetting("active", !data.active);
	});
});

chrome.runtime.onMessage.addListener(function(message) {
	for (const key of Object.keys(options)) {
		if (key in message) {
			propagateSetting(key, message[key]);
		}
	}
});
