const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input__color");
const tools= document.querySelectorAll(".button__tool");
const sizeButtons = document.querySelectorAll(".button__size");
const buttonClear = document.querySelector(".button__clear");

let brushSize = 20;

let isPainting = false;

let activeTool = "brush";

let lastX = 0;

let lastY = 0;

inputColor.addEventListener("change", ({ target }) => {
    ctx.strokeStyle = target.value;
    ctx.fillStyle = target.value;
});

canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
    isPainting = true;

    lastX = clientX - canvas.offsetLeft;
    lastY = clientY - canvas.offsetTop;
    /*
    if (activeTool === "brush") {
        draw(clientX, clientY);
    }

    if (activeTool === "rubber") {
        erase(clientX, clientY);
    }
    */
});

canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
    if (isPainting) {
        if (activeTool === "brush") {
            draw(clientX, clientY);
        }

        if (activeTool === "rubber") {
            erase(clientX, clientY);
        }
    }
});

canvas.addEventListener("mouseup", ({ clientX, clientY }) => {
    isPainting = false;
});

const draw = (x, y) => {
    const currentX = x - canvas.offsetLeft;
    const currentY = y - canvas.offsetTop;

    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();

    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);

    ctx.lineWidth = brushSize;

    ctx.lineCap = "round";

    ctx.stroke();

    lastX = currentX;
    lastY = currentY;

    /*
    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop, 
        brushSize / 2, 
        0, 
        2 * Math.PI
    );
    ctx.fill();
    */
}

const erase = (x, y) => {
    const currentX = x - canvas.offsetLeft;
    const currentY = y - canvas.offsetTop;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();

    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.stroke();

    lastX = currentX;
    lastY = currentY;
    /*
    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop, 
        brushSize / 2, 
        0, 
        2 * Math.PI
    );
    ctx.fill();
    */
}

const selectTool = ({ target }) => {
    const selectedTool = target.closest("button");
    const action = selectedTool.getAttribute("data-action");

    if (action) {
        tools.forEach((tool) => tool.classList.remove("active"));
        selectedTool.classList.add("active");
        activeTool = action;
    }
}

const selectSize = ({ target }) => {
    const selectedTool = target.closest("button");
    const size = selectedTool.getAttribute("data-size");

    sizeButtons.forEach((tool) => tool.classList.remove("active"));
    selectedTool.classList.add("active");
    brushSize = size;
}

tools.forEach((tool) => {
    tool.addEventListener("click", selectTool);
});

sizeButtons.forEach((button) => {
    button.addEventListener("click", selectSize);
});

buttonClear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
