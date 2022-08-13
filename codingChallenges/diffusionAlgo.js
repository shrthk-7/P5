let grid = [], next = []

let Da = 1.1
let Db = 0.5
// let feed = 0.055
let feed = 0.059
let k = 0.062
let t = 1
let adjacent = 0.20005


let laplaceA = (x,y) => {
    let sumA = 0
    sumA += grid[x][y].a * -1 
    sumA += grid[x-1][y].a * adjacent
    sumA += grid[x+1][y].a * adjacent
    sumA += grid[x][y+1].a * adjacent
    sumA += grid[x][y-1].a * adjacent
    sumA += grid[x-1][y-1].a * 0.05
    sumA += grid[x+1][y-1].a * 0.05
    sumA += grid[x+1][y+1].a * 0.05
    sumA += grid[x-1][y+1].a * 0.05
    return sumA
}
let laplaceB = (x,y) => {
    let sumB = 0
    sumB += grid[x][y].b * -1 
    sumB += grid[x-1][y].b * 0.2
    sumB += grid[x+1][y].b * 0.2
    sumB += grid[x][y+1].b * 0.2
    sumB += grid[x][y-1].b * 0.2
    sumB += grid[x+1][y+1].b * 0.05
    sumB += grid[x-1][y+1].b * 0.05
    sumB += grid[x+1][y-1].b * 0.05
    sumB += grid[x-1][y-1].b * 0.05
    return sumB
}

function setup() {
    createCanvas(200,200).style("border","none")
    pixelDensity(1)
    frameRate(120)
    grid = []
    next = []

    for(var x=0; x<width; x++) {
        grid[x] = []
        next[x] = []
        for(var y=0; y<height; y++) {
            grid[x][y] = {a : 1, b : 0}
            next[x][y] = {a : 0, b : 0}
        }
    }

    // for(var x=100; x<110; x++) {
    //     for(var y=100; y<110; y++) {
    //         grid[x][y].b = 1
    //     }
    // }

    for(let x=10; x<200; x++)
        grid[x][x].b = 1
    for(let x=10; x<200; x++)
        grid[200-x][x].b = 1
}

function draw() {
    background(50)
    loadPixels()
    for(var x=1; x<width-1; x++) {
        for(var y=1; y<height-1; y++) {
            var a = grid[x][y].a
            var b = grid[x][y].b

            next[x][y].a = (a + (Da * laplaceA(x,y)) - (a * b * b) + (feed * (1 - a))) * t
            next[x][y].b = (b + (Db * laplaceB(x,y)) + (a * b * b) - ((k + feed) * b)) * t
            next[x][y].a = constrain(next[x][y].a, 0, 1)
            next[x][y].b = constrain(next[x][y].b, 0, 1)

            var pix = (x + y*width) * 4
            pixels[pix + 0] = Math.floor(next[x][y].a * 255)
            pixels[pix + 1] = Math.floor(next[x][y].a * 255)
            pixels[pix + 2] = Math.floor(next[x][y].a * 255)
            pixels[pix + 3] = 255
        }
    }
    updatePixels()
    
    var temp = grid
    next = temp
    grid = next
}