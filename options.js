function changed(event) {
	const key = event.target.id;
	const value = event.target.checked;
	if (options[key] !== value) {
		options[key] = value;
		chrome.runtime.sendMessage({[key]: value});
	}
}

function update(key, value) {
	const input = document.getElementById(key);
	options[key] = value;
	input.checked = value;
}

chrome.storage.sync.get(options, function(data) {
	const optionsArea = document.getElementById("options");
	for (const key of Object.keys(data)) {
		options[key] = data[key];
		const option = document.createElement("DIV");
		const checkbox = document.createElement("INPUT");
		const label = document.createElement("LABEL");
		option.className = "option";
		checkbox.type = "checkbox";
		checkbox.id = key;
		checkbox.checked = data[key];
		label.for = key;
		label.innerHTML = descriptions[key];
		option.appendChild(checkbox);
		option.appendChild(label);
		optionsArea.appendChild(option);
		checkbox.addEventListener("change", changed);
	}
});

chrome.runtime.onMessage.addListener(function(message) {
	console.log("Message received");
	for (const key of Object.keys(message)) {
		if (key in options) {
			update(key, message[key]);
			console.log(key + ": " + message[key]);
		}
	}
});
