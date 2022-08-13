let interval
let timerOn = false
let lapBtn

let time = 0
let timeEL = document.createElement("h1")
document.body.appendChild(timeEL)
timeEL.style.display = "none"

let btnPara = document.createElement("p")
document.body.appendChild(btnPara)

function setup() {
    noCanvas()

    let timerBtn = createButton("Start Timer")
    timerBtn.parent(btnPara)

    timerBtn.mousePressed(() => {
        if(timerOn){
            clearInterval(interval)
            timerBtn.html("Start Timer")
            lapBtn.remove()
            timerOn = false
        }
        else {
            timeEL.style.display = "block"
            time = 0
            timerBtn.html("Stop Timer")
            timerOn = true
            lapBtn = createButton("Lap")
            lapBtn.parent(btnPara)
            interval = setInterval(() => {
                time++
                timeEL.innerText = time + " ms"
            },100)
        }
    })
}