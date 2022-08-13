// f(n) = g(n) + h(n)
// g = time taken to reach that node (cost)
// h = time required to traverse the distance between the node to the end point

let rows = 10
let cols = 10

let start
let end
let w,h

let grid = []
let openSet = []
let closedSet = []

function Cell(i,j) {
    this.x = i
    this.y = j

    this.f = 0
    this.g = 0
    this.h = 0
}
Cell.prototype.display = function(col) {
    fill(col)
    rect(this.x * w,  this.y * h, w, h)
}

function setup() {
    createCanvas(400,400)
    w = width/cols
    h = height/rows

    stroke(255)
    noFill()
    noStroke()

    for(let i = 0; i<cols; i++) {
        grid[i] = []
        for(let j = 0; j<rows; j++) {
            grid[i].push(new Cell(i,j))
        }
    }

    start = grid[0][0]
    end = grid[cols-1][rows-1]

    closedSet.push(start)
}

function draw() {
    if(openSet.length > 0) {
        let winner = 0
        for(let i in openSet) {
            if(openSet[i].f < openSet[winner].f) {
                winner = i
            }
        }

        let current = openSet[winner]

        if(openSet[winner] === end) {
            console.log("finished")
            noLoop()
            return
        }
    }

    noLoop()
}
