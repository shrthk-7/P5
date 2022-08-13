let video
let g = 0
let ratio = 16
let threshold = 127
let checks = [] 
let capturing = false
function setup() {
    // createCanvas(640,480)
    // noStroke()
    // pixelDensity(1)
    // frameRate(20)

    noCanvas()

    video = createCapture(VIDEO, () => {
        capturing = true
    })
    video.size(640/ratio,480/ratio)
    video.hide()

    for(let i=0; i<video.height; i++){
        let p = createP("")
        p.id(i)
        let checkArr = []
        for(let j=0; j<video.width; j++){
            checkArr[j] = createCheckbox()
            checkArr[j].id = "checkbox"
            checkArr[j].parent("#" + i)
        }
        checks.push(checkArr)
    }

    let slider = createSlider(0,255,127)
    slider.input(() => {
        threshold = slider.value()
    })
}

function draw() {
    if(capturing){
    video.loadPixels()

        for(let i=0; i<video.width; i++){
            for(let j=0; j<video.height; j++){
                let index = (i + j*video.width)*4
                let r = video.pixels[index]
                let g = video.pixels[index + 1]
                let b = video.pixels[index + 2]
                let bright = (r + g + b)/3
                if(bright > threshold) {
                    checks[j][i].checked(false)
                }
                else
                    checks[j][i].checked(true)
            }
        }
    }
}

// BRIGHTNESS MIRROR
// function draw() {
//     background(0)
//     video.loadPixels()
//     loadPixels()
//     for(let i=0; i<video.width; i++) {
//         for(let j=0; j<video.height; j++) {
//             let index = (i + j*video.width)*4
//             let r = video.pixels[index]
//             let g = video.pixels[index + 1]
//             let b = video.pixels[index + 2]

//             let bright = map((r + g + b)/3, 0, 255, 0, 16)
//             // let bright = (r + g + b) / 3
//             fill(255)
//             // rectMode(CENTER)
//             circle(i*ratio+ratio/2, j*ratio+ratio/2, bright)
//         }
//     }
// }





