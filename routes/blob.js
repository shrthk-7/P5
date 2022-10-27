let theta = 10
let radius = 50
let polygonSides = 6
let noiseStrength = 10
let index = 2
let graphics 

function setup() {
    createCanvas(400,400).style("border", "0")
    graphics = createGraphics(width, height)
    graphics.clear()
    // graphics.noStroke()
    graphics.noFill()
    graphics.stroke(255)
    noFill()
    stroke(color(255,0,0))
    strokeWeight(3)
    frameRate(60)
}
function draw() {
    background(0)
    graphics.background(0)
    beginShape()
    graphics.clear()
    while(theta <= 2 * Math.PI ) {
        let n = 100 * Math.sin(theta * 8 + frameCount * 0.12)
        
        let x = (n + radius) * Math.cos(theta) + width/2
        let y = (n + radius) * Math.sin(theta) + height/2
        vertex(x, y)

        n = 100 * Math.sin(theta * 8 + frameCount * 0.1 + 0.25)
        
        x = (n + radius) * Math.cos(theta) + width/2
        y = (n + radius) * Math.sin(theta) + height/2
        
        graphics.vertex(x, y)
        theta += 2 * Math.PI / polygonSides
    }
    endShape()
    graphics.endShape()
    image(graphics, 0, 0)

    theta = 0
}