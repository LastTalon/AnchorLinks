function createLinks() {
	if (!createLinks.done) {
		createLinks.done = true;
		let anchors = document.getElementsByTagName("*");
		for (let i = 0; i < anchors.length; i++) {
			let display = window.getComputedStyle(anchors[i]).display;
			if (anchors[i].id !== "" && (display === "inline" || display === "inline-block")) {
				let link = document.createElement("A");
				let space = document.createElement("DIV");
				space.className = "anchor-space";
				link.href = "#" + anchors[i].id;
				link.className = "anchor-link";
				link.innerHTML = "#";
				space.appendChild(link);
				anchors[i].after(space);
			}
		}
	}
}

function toggleLinks(active) {
	let property = "hidden";
	if (active) {
		if (!createLinks.done) {
			createLinks();
			return;
		}
		property = "";
	}
	let anchorLinks = document.getElementsByClassName("anchor-link");
	for (let i = 0; i < anchorLinks.length; i++) {
		anchorLinks[i].style.visibility = property;
	}
}

chrome.storage.sync.get("active", function(data) {
	if (data.active) {
		createLinks();
	}
});

chrome.runtime.onMessage.addListener(function(message) {
	if ("active" in message) {
		toggleLinks(message.active);
	}
});
