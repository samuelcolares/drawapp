const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");



const increaseBtn = document.getElementById(`increase`)
const decreaseBtn = document.getElementById(`decrease`)
const sizeSpan = document.getElementById(`size`)
const pencilColor = document.getElementById(`pencilColor`)
const backgroundCanvas = document.getElementById(`bkColor`)
const backgroundCanvasUrl = document.getElementById(`bkUrl`)
const clear = document.getElementById('clear')

const urlButton = document.querySelector(`.urlShow`)
const urlDiv = document.querySelector(`.url`)
const urlBkRemover = document.querySelector(`.backgroundRemover`)

let size = 20
let color = `black`
let x, y
let isPressed = false

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.fillStyle = color
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}

canvas.addEventListener(`mousedown`, (e) => {
    isPressed = true
    x = e.offsetX
    y = e.offsetY
    console.log(x, y)
    drawCircle(x, y)
})

canvas.addEventListener(`mouseup`, (e) => {
    isPressed = false
    x = undefined
    y = undefined
})

canvas.addEventListener(`mousemove`, (e) => {
    if (isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)

        x = x2
        y = y2
    }
})

canvas.addEventListener(`mouseleave`, (e) => {
    isPressed = false
})


increaseBtn.addEventListener(`click`, () => {
    size += 2
    decreaseBtn.disabled = false
    if (size >= 50) {
        size = 50
        increaseBtn.disabled = true
    }

    sizeSpan.innerText = size
})

decreaseBtn.addEventListener(`click`, () => {
    size -= 2
    increaseBtn.disabled = false
    if (size <= 2) {
        size = 2
        decreaseBtn.disabled = true
    }
    sizeSpan.innerText = size
})

pencilColor.addEventListener(`input`, (e) => color = e.target.value)

backgroundCanvas.addEventListener(`input`, (e) => canvas.style.backgroundColor = `${e.target.value}`)
backgroundCanvasUrl.addEventListener(`keypress`, (e) => {
    if (e.key === `Enter`) {
        canvas.style.backgroundImage = `url(${e.target.value})`
        urlBkRemover.disabled = false
    }
})

urlBkRemover.addEventListener(`click`, ()=>{
    canvas.style.backgroundImage = ``
})

clear.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))

sizeSpan.addEventListener('input', (e) => {
    if (isNaN(e.target.innerText) || e.target.innerText > 50 || e.target.innerText < 1) {
        e.target.innerText = size
    }
    size = parseInt(e.target.innerText)
})

flag = true
urlButton.addEventListener(`click`, () => {
    if (flag) {
        flag = false
        urlDiv.classList.add(`display`)

        setTimeout(() => {
            urlDiv.classList.add(`show`)
            backgroundCanvasUrl.focus()
        }, 400)
    } else{
        flag = true
        urlDiv.classList.remove(`show`)

        setTimeout(() => {
            urlDiv.classList.remove(`display`)
        }, 800)
    }
})
