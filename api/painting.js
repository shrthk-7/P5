let video
let ratio = 8

let x = 640/2
let y = 480/2

let speed = 50
let brushes = []

function setup() {
    let canvas = createCanvas(640,480)
    pixelDensity(1)
    fill(255,20)
    noStroke()

    video = createCapture(VIDEO)
    video.size(width/ratio,height/ratio)
    video.hide()

    canvas.mousePressed(() => {
        brushes.push(new Brush())
    })

}

function Brush() {
    this.x = mouseX
    this.y = mouseY
    this.speedX = Math.random() * speed - speed/2
    this.speedY = Math.random() * speed - speed/2
    this.update = function() {
        this.x += this.speedX
        this.y += this.speedY
        if(this.x < 0 || this.x > width) {
            this.speedX *= -1
        }
        if(this.y < 0 || this.y > height)
            this.speedY *= -1
    }
    this.display = function() {
        let col = video.get(Math.floor(this.x/ratio),Math.floor(this.y/ratio))
        col[3] = 150
        fill(...col)
        circle(this.x,this.y,20)
    }
}

function draw() {
    video.loadPixels()
    for(let i in brushes) {
        brushes[i].update()
        brushes[i].display()
    }
    video.updatePixels()
}
