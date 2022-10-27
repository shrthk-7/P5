let blobs = []

function setup() {
    Blob = function(x, y) {
        this.pos = new p5.Vector(x,y)
        this.r = 20
        this.vel = p5.Vector.random2D()
        this.vel.mult(5)
    
        this.show = function() {
            noFill()
            stroke(255)
            strokeWeight(2)
            circle(this.pos.x, this.pos.y, this.r * 2)
        }

        this.update = function() {
            this.pos.add(this.vel)

            if(this.pos.x < 0 || this.pos.x > width)
                this.vel.x *= -1

            if(this.pos.y < 0 || this.pos.y > height)
                this.vel.y *= -1
        }
    }

    createCanvas(400,400).style("border", "0")
    pixelDensity(1)
    // frameRate(30)
    colorMode(HSB)
    blobs.push(new Blob(100,100))
    blobs.push(new Blob(200,200))
}


function draw() {
    background(0)
    loadPixels()
    for(let i=0; i<width; i++) {
        for(let j=0; j<height; j++) {
            let pix = (i + j*width) * 4
            let col = 0
            blobs.forEach((blob) => {
                let d = dist(blob.pos.x, blob.pos.y, i, j)
                col += 500 * blob.r / d
            })
            col = constrain(col, 0, 300)
            pixels[pix + 0] = 255
            pixels[pix + 1] = col
            pixels[pix + 2] = 0
            pixels[pix + 3] = 255
        }
    }
    updatePixels()

    blobs.forEach((blob) => {
        blob.update()
    })
}