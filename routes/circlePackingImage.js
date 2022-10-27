let img

let threshold = 200
let rad = 1

let spots = []
let circles = []

function Circle(x,y) {
    this.x = x
    this.y = y
    this.r = rad

    this.growth = true
}
Circle.prototype.display        = function() {
    circle(this.x, this.y, 2 * this.r)
}
Circle.prototype.grow           = function() {
    this.r += 1/2
}
Circle.prototype.checkEdge      = function() {
    let a1 = this.x + this.r
    let a2 = this.x - this.r

    let b1 = this.y + this.r
    let b2 = this.y - this.r

    if(a1 > width || a2 < 0 || b1 > height || b2 < 0) {
        this.growth = false
        return
    }
}
Circle.prototype.checkNeighbors = function() {
    circles.forEach(c => {
        let d = dist(c.x, c.y, this.x, this.y)
        if(d != 0 && d < c.r + this.r) {
            this.growth = false
            c.growth = false
        }
    })
}

function checkValid(c) {
    for (c1 of circles) {
        let d = dist(c1.x, c1.y, c.x, c.y)
        if(d < c.r + c1.r) {
            return false
        }
    }
    return true
}

function checkBrightness(r,g,b) {
    if ((r + g + b) / 3 > threshold)
        return true
    return false
}
function preload() {
    img = loadImage("../S_letter.jpg")
}
function setup() {
    createCanvas(img.width, img.height)
    pixelDensity(1)
    noFill()
    stroke(255)
    strokeWeight(2)

    img.loadPixels()
    for(let x = 0; x<img.width; x++) {
        for(let y = 0; y<img.height; y++) {
            let pix = (x + img.width * y) * 4
            if(checkBrightness(img.pixels[pix], img.pixels[pix + 1], img.pixels[pix + 2])) {
                spots.push({x:x,y:y})
            }
        }
    }
}

function draw() {
    background(0)

    circles.forEach(c => {
        c.display()
        if(c.growth) {
            c.grow()
            c.checkNeighbors()
        }
    })


    let i = Math.floor(Math.random() * spots.length)
    let spot = spots[i]
    let c =  new Circle(spot.x, spot.y)

    if(checkValid(c))
        circles.push(c)

    spots.splice(i,1)
}
