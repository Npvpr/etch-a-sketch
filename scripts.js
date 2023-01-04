let mainCon = document.querySelector('.mainCon')
let drawCon = document.querySelector('.drawCon')

let pixels = [];

for(let i = 0; i < 6; i++){
    pixels.push(document.createElement("div"));
    pixels[i].innerText = i;
    pixels[i].style.border = "solid 1px"
    pixels[i].style.backgroundColor = "black";
    drawCon.appendChild(pixels[i])
}
