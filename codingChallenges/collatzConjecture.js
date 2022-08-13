let angleEven = Math.PI/10
let angleOdd = -Math.PI/10
// let angleEven = Math.PI/4
// let angleOdd = -Math.PI/4
let len = 20
let pos = []
let i = 1

function collatz(n) {
    if(n == 1)
        return 1
    if(n % 2 == 0)
        return n/2
    if(n % 2 == 1)
        return (3*n + 1)/2
}

function setup() {
    createCanvas(1000,1000).style("border", "0")
    stroke(255)
    frameRate(30)
}
function draw() {
    // background(0,10)
    i++
    let n = i * 2
    resetMatrix()
    translate(width/2, height/2)
    let opacity = 255
    pos = [n]

    while(n != 1) {
        n = collatz(n)
        pos.push(n)
    }
    // console.log(pos.length)
    pos.reverse()
    for(let j of pos) {
        if(j % 2 == 0) {
            rotate(angleEven)
        }
        else {
            rotate(angleOdd)
        }
        stroke(255,opacity)
        let sw = map(opacity, 0, 255, 0.1, 4)
        strokeWeight(sw)
        line(0,0,0,-len)
        translate(0,-len)
        opacity -= 4
    }
    noStroke()
    fill(255,0, 0, opacity)
    circle(0,0,10)
    stroke(255)

    if(i >= 1000)
        noLoop()
}