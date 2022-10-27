let speedY = 2
let drops = []


function Drop() {
    this.x = Math.random() * width
    this.y = Math.random() * (-height)
    this.speedY = Math.random() * 2 + 3

    this.fall = function() {
        this.y += this.speedY
        this.speedY += 0.4
        if(this.y >= height) {            
            this.x = Math.random() * width
            this.y = Math.random() * (-height)
            this.speedY = Math.random() * 2 + 3
        }
    }
    this.display = function() {
        stroke(255)
        let strokeW = map(this.y, 0, height, 1, 0.2)
        strokeWeight(strokeW)
        line(this.x,this.y,this.x,this.y + this.speedY)
    }
}
function setup() {
    createCanvas(400,800)
    for(let i=0; i<1000; i++) {
        drops.push(new Drop())
    }
}
function draw() {
    background(0,90)
    for(let drop of drops) {
        drop.fall()
        drop.display()
    }
}