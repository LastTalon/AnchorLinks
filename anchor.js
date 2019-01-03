chrome.storage.sync.get("active", function(data) {
	if (data.active) {
		let anchors = document.getElementsByTagName("*");
		for (let i = 0; i < anchors.length; i++) {
			let display = window.getComputedStyle(anchors[i]).display;
			if (anchors[i].id != "" && (display == "inline" || display == "inline-block")) {
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
});
