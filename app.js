const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

context.fillStyle = "white";
context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
context.strokeStyle = "black";
context.fillStyle = "black";
context.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        context.beginPath();
        context.moveTo(x, y);
    } else {
        context.lineTo(x, y);
        context.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    context.strokeStyle = color;

    if(filling === true) {
        context.fillStyle = color;
        context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleRangeChange(event) {
    const strokeSize = event.target.value;
    context.lineWidth = strokeSize;
}

function handleModeClick(event) {
    if(filling === true) {
        filling = false;
        mode.innerText = "fill";
    } else {
        filling = true;
        mode.innerText = "paint";
    }
}

function handleRightClick(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const imageUrl = canvas.toDataURL();
    const link = document.createElement("a");

    link.href = imageUrl;
    link.download = "PaintJS[EXPORT]";
    link.click();

}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", handleRightClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}