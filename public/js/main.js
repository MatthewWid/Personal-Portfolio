/*
	Get the pixel height of the default and minimised header.
*/
const header = document.getElementsByTagName("header")[0];
let headerBig, headerMini;
function getHeaderSizes() {
	header.classList.remove(...["mini", "transition"]);
	headerBig = header.offsetHeight;
	header.classList.add("mini");
	headerMini = header.offsetHeight;
	header.classList.remove("mini");
	header.classList.add("transition");

	checkScroll();
}
// When the window resizes recalculate the new header sizes.
window.addEventListener("resize", getHeaderSizes);
// Calculate the header sizes on initial load.
getHeaderSizes();

/*
	Check if the user has scrolled past the 'about me' section and if so minimise the header size.
*/
function checkScroll() {
	const minAt = (hero.offsetTop + hero.offsetHeight) - headerBig;
	header.classList[window.scrollY > minAt ? "add" : "remove"]("mini");
}
window.addEventListener("scroll", checkScroll);

/*
	Animate scrolling to the target element.
*/
const duration = 350;
const quadraticEaseInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
function animateScroll() {
	const timeThrough = Math.min(1, (performance.now() - startTime) / duration);
	window.scroll(0, Math.ceil((quadraticEaseInOut(timeThrough) * (targetScroll - startScroll)) + startScroll));

	if (timeThrough != 1) {
		requestAnimationFrame(animateScroll);
	} else {
		history.pushState({}, "", targetEl["id"] === "hero" ? "#" : `#${targetEl["id"]}`);
	}
}

/*
	Event handler for triggering automatic scrolling when clicking navigation links.
*/
let targetScroll, startScroll, startTime;
function triggerScroll(evt) {
	evt.preventDefault();
	targetEl = document.getElementById(evt.currentTarget.dataset["scroll"]);
	startScroll = window.scrollY;
	startTime = performance.now();
	targetScroll = targetEl.offsetTop - (targetEl["id"] === "about-me" ? 0 : headerMini);

	animateScroll();
}

/*
	Attach event listeners to for automatic scroll links.
*/
[
	...Array.from(document.querySelectorAll("header nav ul li a")),
	document.querySelector("header h1 a"),
	document.getElementsByClassName("hero-scroll-indicator")[0]
].forEach((e) => {
	e.addEventListener("click", triggerScroll);
});
