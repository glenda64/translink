const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width, height;

let mouseOrigin = {x: 0, y: 0};
let mouseDown = false;
let offset = {x: 123.1, y: -49.2};
let offsetOrigin = offset;
let scale = 5000;

canvas.onmousedown = event => {
	mouseOrigin = {x: event.offsetX, y: event.offsetY};
	offsetOrigin = {x: offset.x, y: offset.y};
	mouseDown = true;
}

canvas.onscroll = event => {
	console.log(event);
}

canvas.onmouseup = event => {
	mouseDown = false;
}

canvas.onmousemove = event => {
	if (!mouseDown) return;

	let dx = event.offsetX - mouseOrigin.x;
	let dy = event.offsetY - mouseOrigin.y;
	offset.x = offsetOrigin.x + dx / scale;
	offset.y = offsetOrigin.y + dy / -scale;
	render();
}

function render() {
	ctx.fillStyle = "beige";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (stopName of Object.keys(stops)) {
		let stop = stops[stopName];
		drawStop(latlongToCanvasX(stop.x), latlongToCanvasY(stop.y));
	}
}

function drawStop(x, y) {
	ctx.strokeStyle = "black";
	ctx.fillStyle = "white";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(x, y, 6, 0, 2*Math.PI);
	ctx.fill();
	ctx.stroke();
}

function latlongToCanvasX(x) {
	return (x + offset.x) * scale + width/2;
}

function latlongToCanvasY(y) {
	return (y + offset.y) * -scale + height/2;
}

let dpr = window.devicePixelRatio || 1;
let bsr = ctx.backingStorePixelRatio || 1;
let ratio = dpr/bsr;
width = window.innerWidth;
height = window.innerHeight;

canvas.width = width * ratio;
canvas.height = height * ratio;
canvas.style.width = width + "px";
canvas.style.height = height + "px";
ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

render();
