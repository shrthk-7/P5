let sizeConstant = 20
let j = 0

function setup() {
    createCanvas(800,400).style("border", "0")
    textAlign()
    frameRate(30)
}

function draw() {
    // background(0)
    let k = Math.floor(Math.random() * height/sizeConstant)
    let j = Math.floor(Math.random() * width/sizeConstant)
    fill(0)
    noStroke()
    rect(j, 0, sizeConstant, height)

    for(let i = 1; i <= k; i++) {
        let letter = Math.floor(Math.random() * 70 + 160)
        stroke(40, 255, 0)
        fill(40, 255, 0)
        textSize(sizeConstant)
        text(char(letter), j, i * sizeConstant)
    }

    j += sizeConstant
    if(j > width)
        j = 0
}