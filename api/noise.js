function setup() {
    createCanvas(400,400)
    pixelDensity(1)
    background(0)
    strokeWeight(1)
    noFill()
    stroke(255)
}
let start = 0
function draw() {
    let xoff = start
    background(0)
    beginShape()
    for(let x = 0; x < width; x++) {
        let y = noise(xoff) * height
        vertex(x,y)
        xoff += 0.05
    }
    endShape()
    start += 0.01
    // noLoop()
}