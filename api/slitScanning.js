let video
let x = 0

function setup() {
    createCanvas(320,240)
    pixelDensity(1)
    frameRate(20)

    video = createCapture(VIDEO, () => {
        x = 0
    })
    video.size(320,240)
    let btn = createButton("reset")
    btn.mousePressed(() => {
        x = 0
    })
}
function draw() {
    video.loadPixels()
    copy(video,0,x, video.width, 1, 0, x, video.width, 1)
    x++
    if(x > height)
        x = 0
}