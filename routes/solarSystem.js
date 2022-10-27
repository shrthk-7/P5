function Planet(r, d) {
    this.radius = r
    this.angle = Math.random() * Math.PI * 2
    this.distance = d
    this.speed = Math.random() * 0.08 + 0.02

    this.children = []

    this.display = function() {
        push()
        rotate(this.angle)
        translate(this.distance, 0)
        circle(0,0,this.radius * 2)
        fill(255,0,0)
        
        for(let child of this.children) {
            child.update()
            child.display()
        }
        pop()
    }

    this.update = function() {
        this.angle += this.speed
    }

    this.spawnMoon = function(number) {
        for(let i = 0; i < number; i++) {
            this.children.push(new Planet(this.radius * 0.4, this.radius + 40))
        }
    } 
}

let sun = new Planet(50, 0)
sun.spawnMoon(1)
sun.children[0].spawnMoon(1)

function setup() {
    noStroke()
    createCanvas(400,400)
}

function draw() {
    background(0, 10)
    translate(width/2, height/2)
    sun.display()
}