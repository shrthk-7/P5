let circles = []
let rad = 1

function Circle(x,y) {
    this.x = x
    this.y = y
    this.r = rad

    this.growth = true
}

Circle.prototype.display    = function() {
    circle(this.x, this.y, 2 * this.r)
}
Circle.prototype.grow       = function() {
    this.r += 1/2
}
Circle.prototype.checkEdge  = function() {
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

function setup() {
    createCanvas(400,400)
    noFill()
    // strokeWeight(2)
    stroke(255)

    for(let i=0; i<10; i++) {
        let c = new Circle(Math.random() * width, Math.random() * height)
        
        if(checkValid(c))
            circles.push(c)
        else
            i--
    }
}

function draw() {
    background(0)

    circles.forEach((c) => {
        c.display()
        if(c.growth) {
            c.grow()
            c.checkEdge()
            c.checkNeighbors()
        }
    })

    let c = new Circle(Math.random() * width, Math.random() * height)
    if(checkValid(c))
        circles.push(c)
}