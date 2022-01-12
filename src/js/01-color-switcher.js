const startBtn = document.querySelector('button[data-start]')
const body = document.querySelector('body')

let intervalId = null

startBtn.addEventListener('click', changeColor)
document.querySelector('button[data-stop]').addEventListener('click', stopChangeColor)

function changeColor() {
        intervalId = setInterval(() => {
            startBtn.disabled = true
            body.style.backgroundColor = getRandomHexColor()
            
        }, 1000)
}

function stopChangeColor() {
    startBtn.disabled = false
    clearInterval(intervalId)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}