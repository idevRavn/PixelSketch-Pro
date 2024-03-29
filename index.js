const containerDiv = document.querySelector(".container");
const colorPicker = document.querySelector("#color-picker");
const rainbowBtn = document.querySelector("#rainbow");
const eraserBtn = document.querySelector("#eraser");
const gridSize = document.querySelector("#grid-size");
const resetBtn = document.querySelector("#reset");
const showGrid = document.querySelector("#show-grid");
const gridSizeText = document.querySelector(".message");
const itemsDiv = document.querySelectorAll(".items");

let isRainbowSelected = false;
let isEraserSelected = false;
let currentColor = `#000`;
const sizeOfPad = 500;
let isDrawing = false;
let isGrid = false;

showGrid.addEventListener("click", () => {
  isGrid = !isGrid;

  if (isGrid) {
    showGrid.classList.add("selected");
    showGrid.textContent = "Toggled Grid";
  } else {
    showGrid.classList.remove("selected");
    showGrid.textContent = "Toggle Grid";
  }
  containerDiv.classList.toggle("view-grid");
});

gridSize.addEventListener("input", (event) => {
  gridNum = event.target.value;
  getDivItems();
});

colorPicker.addEventListener("input", (event) => {
  currentColor = event.target.value;
  isRainbowSelected = false;
});

rainbowBtn.addEventListener("click", () => {
  isRainbowSelected = !isRainbowSelected;

  if (isRainbowSelected) {
    rainbowBtn.classList.add("selected");
    rainbowBtn.textContent = "Toggled Rainbow";
  } else {
    rainbowBtn.classList.remove("selected");
    rainbowBtn.textContent = "Toggle Rainbow";
  }
});

eraserBtn.addEventListener("click", () => {
  isEraserSelected = !isEraserSelected;

  if (isEraserSelected) {
    eraserBtn.classList.add("selected");
    eraserBtn.textContent = "Toggled Eraser";
  } else {
    eraserBtn.classList.remove("selected");
    eraserBtn.textContent = "Toggle Eraser";
  }
});

resetBtn.addEventListener("click", () => {
  const answer = prompt("Are you sure?", "Yes or No").toLowerCase();

  if (answer === "yes") {
    getDivItems();
  }
});

function colorDiv(e) {
  if (e.type === "mousedown" && !isEraserSelected) {
    isDrawing = true;
    e.target.style.backgroundColor = isRainbowSelected
      ? getRandomColor()
      : currentColor;
  } else if (e.type === "mouseover" && isDrawing && !isEraserSelected) {
    e.target.style.backgroundColor = isRainbowSelected
      ? getRandomColor()
      : currentColor;
  } else if (e.type === "mousedown" && isEraserSelected) {
    isDrawing = true;
    e.target.style.backgroundColor = "#FFF";
  } else if (e.type === "mouseover" && isDrawing && isEraserSelected) {
    e.target.style.backgroundColor = "#FFF";
  } else isDrawing = false;
}

function getRandomColor() {
  const redVal = Math.floor(Math.random() * 256);
  const greenVal = Math.floor(Math.random() * 256);
  const blueVal = Math.floor(Math.random() * 256);

  return `rgb(${redVal}, ${greenVal}, ${blueVal})`;
}

function getDivItems() {
  containerDiv.textContent = "";
  gridNum = gridSize.value;
  gridSizeText.textContent = `${gridNum} x ${gridNum}`;
  for (let i = 0; i < gridNum * gridNum; i++) {
    const box = document.createElement("div");

    box.style.width = `${sizeOfPad / gridNum}px`;
    box.style.height = `${sizeOfPad / gridNum}px`;
    box.classList.add("items");

    containerDiv.appendChild(box);
    box.addEventListener("mousedown", (e) => {
      colorDiv(e);
    });
    box.addEventListener("mouseover", (e) => {
      colorDiv(e);
    });
    box.addEventListener("mouseup", (e) => {
      colorDiv(e);
    });
  }
}

getDivItems();
