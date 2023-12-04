const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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
	console.log("draw stop at " + x + ", " + y);
	ctx.fillStyle = "black";
	ctx.fillRect(x, y, 10, 10);
}

function latlongToCanvasX(x) {
	return (x + offset.x) * scale + canvas.width/2;
}

function latlongToCanvasY(y) {
	return (y + offset.y) * -scale + canvas.height/2;
}

// function canvasToLatlongX(x) {
// 	return (x - canvas.width/2) / scale + offset.x;
// }

// function canvasToLatlongY(y) {
// 	return (y - canvas.width/2) / -scale + offset.y;
// }

render();
