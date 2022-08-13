let theta = 10
let radius = Math.PI/2
let polygonSides = 100
let noiseStrength = 0
let index = 1
let graphics 

function setup() {
    let canvas = createCanvas(400,400).style("border", "0")
    graphics = createGraphics(width, height)
    graphics.clear()
    graphics.noStroke()

}
function draw() {
    background(0)
    graphics.background(0)
    beginShape()
    graphics.clear()
    while(theta <= 2 * Math.PI ) {
        let n = 100 * Math.sin(theta * 8 + frameCount * 0.1)
        
        let x = (n + radius) * Math.cos(theta) + width/2
        let y = (n + radius) * Math.sin(theta) + height/2
        vertex(x, y)

        n = 100 * Math.sin(theta * 8 + frameCount * 0.1 + 0.2)
        
        x = (n + radius) * Math.cos(theta) + width/2
        y = (n + radius) * Math.sin(theta) + height/2
        
        graphics.vertex(x, y)
        theta += 2 * Math.PI / polygonSides
    }
    endShape()
    graphics.endShape()
    image(graphics, 0, 0)

    theta = 0
    // noLoop()
}