let t1 = 0.1
let t2 = 0.62

let ratio = 1

let addX = 0
let addY = 0

let zoomLevel1 = 1.3
let zoomLevel2 = 1.3


let widthByRatiobyTwo
let heightByRatiobyTwo

function setup() {
    // let x = window.innerWidth
    // let y = window.innerHeight

    let x = 4000
    let y = 4000
    
    x = Math.min(x,y)

    createCanvas(x,x).style("border", "none")
    pixelDensity(1)
    noStroke()
    frameRate(10)

    widthByRatiobyTwo = (width / ratio) / 2
    heightByRatiobyTwo = (height / ratio / 2)
}

//USING PIXEL ARRAY 
function draw() {
    translate(width/2, height/2)
    background(0)
    loadPixels()
    for(let i=0; i<width; i++) {
        for(let j=0; j<height; j++) {
            let pix = (i + width * j) * 4

            let x = map(i, 0, width, -zoomLevel1, zoomLevel2)
            let y = map(j, 0, height, -zoomLevel1, zoomLevel2)

            let z = checkBoundedAlt(x,y)
            if(z < 100){
                pixels[pix + 0] = 0
                pixels[pix + 1] = z
                pixels[pix + 2] = z
            }
            else {
                pixels[pix + 0] = z / 2
                pixels[pix + 1] = z
                pixels[pix + 2] = z / 3  
            } 
            pixels[pix + 3] = 255
        }
    }
    updatePixels()
    noLoop()
}

function complexSquare(a, b) {
    let z = [a*a - b*b, 2*a*b]
    return z
}

function checkBounded(a, b) {
    for(let i = 0; i<100; i++) {
        let z = complexSquare(a,b)
        a = z[0] + 0
        b = z[1] + 0.6412
        if(Math.sqrt(a*a + b*b) > 2)
            return false
    }
        return true
}

function checkBoundedAlt(a, b) {
    for(let i = 0; i<1000; i++) {
        let z = complexSquare(a,b)
        a = z[0] + t1
        b = z[1] + t2
        if(Math.sqrt(a*a + b*b) > 2)
            return map(i, 0, 200, 0, 255)
    }
        return 255
}

