let speed = 0.05

function Star() {
    this.x = Math.random() * 400 - 200
    this.y = Math.random() * 400 - 200
    // this.z = Math.random() * 400
    // this.z = Math.random() * this.x
    this.z = 400

    this.update = function() {
        this.x = map(this.x/this.z, 0, 1, 0, 400)
        this.y = map(this.y/this.z, 0, 1, 0, 400)
        this.z -= speed
        if(this.x < -200 || this.x > 200 || this.y < -200 || this.y > 200) {
            this.x = Math.random() * 400 - 200
            this.y = Math.random() * 400 - 200
            this.z = 400
        }

    }
    this.display = function() {
        circle(this.x,this.y,2)
    }
}

let stars = []

function setup() {
    createCanvas(400,400)
    fill(255)
    noStroke()
    frameRate(120)
    for(let i=0; i<100; i++) {
        stars.push(new Star())
    }

}

function draw() {
    speed = map(Math.abs(mouseY - 200),0,200,2,0)
    if(speed < 0)
        speed = 0
    background(0, 10)
    translate(200,200)
    for(let i in stars) {
        stars[i].update()
        stars[i].display()
    }
}