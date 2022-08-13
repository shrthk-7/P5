let x = 0
let y = 0

let timer1
let timer2

let circles = []


function setup() {
    createCanvas(400,400)
    fill(255)

    // timer1 = createElement("h1","timer 1")
    // timer2 = createElement("h1","timer 2")
    // makeTimer(500, timer1)
    // console.log("timer1 started")
    // makeTimer(1000, timer2)
    // console.log("timer2 started")

    for(let i=0; i<1000; i++){
        let c = new Circle(Math.random()*400, Math.random()*400)
        c.checkNeighbours()
        if(c.radius > 1)
            circles.push(c)
    }
}

function Ball() {
    this.x = Math.random()*400
    this.y = Math.random()*400
    this.speedX = Math.random()*20
    this.speedY = Math.random()*20

    this.history = []

    this.update = function() {
        this.x += this.speedX
        this.y += this.speedY
        if(this.x >= width || this.x < 0)
            this.speedX *= -(1 + Math.random()*0.2 - 0.1)
        if(this.y >= height || this.y < 0)
            this.speedY *= -1
        
        this.v = createVector(this.x,this.y)
        this.history.push(this.v)
    }
    this.display = function() {
        circle(this.x,this.y,20)
        for(let v in this.history){
            circle(this.history[v].x, this.history[v].y, v/3)
            if(v > 40)
                this.history.splice(0,1)
        }
    }
}

function Circle(x,y) {
    this.x = x
    this.y = y
    // this.radius = Math.random() * 40 + 10
    this.radius = 20
    this.checkNeighbours = function() {
        for(c of circles){
            let d = dist(this.x,this.y,c.x,c.y)
            if(this.radius + c.radius > d){
                if(c.radius > d){
                    this.radius = 0
                    return
                }
                else 
                    this.radius = d - c.radius
            }
        }
    }
    this.display = function() {
        circle(this.x,this.y, 2*this.radius)
    }

}

function mousePressed() {
    let c = new Circle(mouseX,mouseY)
    c.checkNeighbours()
    if(c.radius > 1)
        circles.push(c)

}

function draw() {
    for(let c of circles)
        c.display()
}

function makeTimer(timeInterval, timer) {
    let counter = 0
    let interval = setInterval(() => {
        counter++
        timer.html(counter)
        if(counter == 10)
            clearInterval(interval)
    },timeInterval)
}

