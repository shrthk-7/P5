let sketch = function(p) {
    p.setup = function() {
        p.createCanvas(400,400)
        p.background(p.color(255,25,90))
        p.fill(255)
    }
    p.draw = function() {
        p.circle(200,200,40)
    }
}
let p5_instance = new p5(sketch)
let p5_instance2 = new p5(sketch)
