let size = 20
let cols 
let rows
let grid = []
let current
let visitedStack = []
let startMaze = false
let graph
let canvas
let x=0,y=0

function setup() {
    canvas = createCanvas(400,400)
    fill(20)
    stroke(255)
    strokeWeight(2)
    // frameRate(5)
    frameRate(60)

    cols = Math.floor(width/size)
    rows = Math.floor(height/size)
    
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            grid.push(new Cell(i,j))
        }
    }

    current = grid[0]
    visitedStack.push(current)

    graph = createGraphics(400, 400)
    graph.clear()
}
function index(i,j) {
    if(i < 0 || j < 0 || i > cols-1 || j > rows-1)
        return -1
    return i*rows + j
}
function Cell(i,j) {
    this.i = i
    this.j = j
    this.walls = [true, true, true, true]
    this.visited = false

    this.display = function() {
        let x = this.i * size
        let y = this.j * size
        
        if(this.visited == true) {
            fill(255,0,255)
            noStroke()
            rect(x,y,size)
            fill(20)
            stroke(255)
        }
        if(this.walls[0])
            line(x,y,x + size,y)
        if(this.walls[1])
            line(x + size,y,x + size,y + size)
        if(this.walls[2])
            line(x + size,y + size,x,y + size)
        if(this.walls[3])
            line(x,y + size,x,y)
    }
    this.checkNeighbours = function() {
        let unvisitedNeighbours = []

        let top     =   grid[index(i,j-1)]
        let right   =   grid[index(i+1,j)]
        let bottom  =   grid[index(i,j+1)]
        let left    =   grid[index(i-1,j)]

        if(top && !top.visited) {
            unvisitedNeighbours.push(top)
        } 
        if(right && !right.visited) {
            unvisitedNeighbours.push(right)
        } 
        if(bottom && !bottom.visited) {
            unvisitedNeighbours.push(bottom)
        } 
        if(left && !left.visited) {
            unvisitedNeighbours.push(left)
        } 
            
        if(unvisitedNeighbours.length > 0) {
            let r = Math.floor(Math.random() * unvisitedNeighbours.length)
            switch (unvisitedNeighbours[r]) {
                case top:
                    this.walls[0] = false
                    top.walls[2] = false
                    return top
                    break;
                case right:
                    this.walls[1] = false
                    right.walls[3] = false
                    return right
                    break;
                case bottom:
                    this.walls[2] = false
                    bottom.walls[0] = false
                    return bottom
                    break;
                case left:
                    this.walls[3] = false
                    left.walls[1] = false
                    return left
                    break;
            }
            // return unvisitedNeighbours[r]
        }
        return undefined

    }
}
function highlight(cell) {
    let X = cell.i * size
    let Y = cell.j * size
    fill(255,0,0)
    noStroke()
    graph.rect(X, Y, size, size)
    // console.log(X, Y)
}
function draw() {
    if(!startMaze) {
        background(20)
        for(let i in grid) {
            grid[i].display()
        }
    
        current.visited = true
        let next = current.checkNeighbours()
        if(next) {
            next.visited = true
            current = next
            visitedStack.push(current)
        }
        else if(visitedStack.length != 0) {
            current = visitedStack.pop()
        }
        else 
            startMaze = true
    }
    else {
        highlight(grid[index(x,y)])
        image(graph,0,0)
    }
}
function keyPressed() {

    switch (keyCode) {
        case UP_ARROW:
            if(y <= 0) 
                return
            y += -1
            break;
        case DOWN_ARROW:
            if(y >= rows-1) 
                return
            y += 1
            break;
        case RIGHT_ARROW:
            if(x >= cols-1) 
                return
            x += 1
            break;
        case LEFT_ARROW:
            if(x <= 0) 
                return
            x += -1
            break;
        default:
            break;
    }
}
