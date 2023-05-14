// get and set elements
const canvasDiv = document.querySelector('.canvasDiv');
const colorPickerInput = document.querySelector('.colorPickerInput');
const modeBtns = document.querySelectorAll('.modeBtn');
const clearAllBtn = document.querySelector('.clearAllBtn');
const sizeInput = document.querySelector('.sizeInput');
const sizeP = document.querySelector('.sizeP');

// set default values
const defaultColor = "#000000";
const defaultMode = "color";
const defaultSize = 16;
let currentColor = defaultColor;
let currentMode = defaultMode;
let canvasSize = defaultSize;

// Global functions
let document_mousedown = false;
document.documentElement.onmousedown = () => {document_mousedown = true};
document.documentElement.onmouseup = () => {document_mousedown = false};

colorPickerInput.oninput = (event) => setCurrentColor(event.target.value);
sizeInput.onchange = (event) => changeSize(event.target.value);
clearAllBtn.addEventListener('click', reloadCanvas);
modeBtns.forEach(mode => {
    mode.addEventListener('click', () => {
        setCurrentMode(mode);
    })
})

function setCurrentColor(newColor){
    currentColor = newColor;
}


function setCurrentMode(newMode){
    currentMode = newMode.id;
    activateModeBtn();
}

// There is only 3 modes right now, so this might be overkill
// But this method might be more efficient for many modes
function activateModeBtn(){
    const activeBtns = document.querySelectorAll(".btnDiv .active");
    activeBtns.forEach(btn => btn.classList.remove("active"));
    document.getElementById(currentMode).classList.add('active');
}

function setCanvasSize(newSize) {
    canvasSize = newSize;
}

// setup canvas
function setupCanvas(canvasSize){
    canvasDiv.style.gridTemplateColumns = `repeat(${canvasSize}, 1fr)`;
    for(let i = 0; i< canvasSize * canvasSize; i++){
        let pixelDiv = document.createElement('div');
        pixelDiv.classList.add('pixelDiv');
        pixelDiv.addEventListener('mouseover', paint);
        pixelDiv.addEventListener('mousedown', paint);
        canvasDiv.appendChild(pixelDiv);
    }
}

function paint(event){
    // When this function is fired by any pixelDiv, this function is run before "document_mousedown" changing function.
    // Therefore, when this this function is fired by "mousedown" event, "document_mousedown" is still "false".
    // Hence, we want do the painting when event is "mousedown" (neglecting "document_mousedown"),
    // and when event is "mouseover", check "document_mousedown".
    if (event.type === "mousedown" || document_mousedown){
        if(currentMode === "color"){
            event.currentTarget.style.backgroundColor = `${currentColor}`;
        }else if(currentMode === "eraser"){
            event.currentTarget.style.backgroundColor = "#fff";
        }else if(currentMode === "rainbow"){
            const randomR = Math.floor(Math.random() * 256);
            const randomG = Math.floor(Math.random() * 256);
            const randomB = Math.floor(Math.random() * 256);
            event.currentTarget.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        }
    }   
}

function changeSize(value) {
    setCanvasSize(value);
    updateSizeValue(value);
    reloadCanvas();
}
  
function updateSizeValue(value) {
    sizeP.innerHTML = `${value} x ${value}`;
}
  
function reloadCanvas() {
    clearCanvas();
    setupCanvas(canvasSize);
}
  
function clearCanvas() {
    canvasDiv.innerHTML = '';
}

// call functions with default values at start
window.addEventListener("load", () => {
    setupCanvas(canvasSize);
    activateModeBtn();
})