function createLinks() {
	if (!createLinks.done) {
		createLinks.done = true;
		const anchors = document.getElementsByTagName("*");
		for (const anchor of anchors) {
			const display = window.getComputedStyle(anchor).display;
			if (anchor.id !== "") {
				const link = document.createElement("A");
				const space = document.createElement("DIV");
				space.className = "anchor-space";
				link.href = "#" + anchor.id;
				link.className = "anchor-link";
				link.innerHTML = "#";
				space.appendChild(link);
				if (display.substring(0, 7) === "inline") {
					anchor.after(space);
				} else {
					anchor.appendChild(space);
				}
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
	const anchorLinks = document.getElementsByClassName("anchor-link");
	for (const link of anchorLinks) {
		link.style.visibility = property;
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
