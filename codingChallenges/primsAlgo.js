let nodes = []
let unvisited = []
let visited = []

function setup() {
    let canvas = createCanvas(400,400)
    fill(255)
    stroke(255)
    strokeWeight(2)
    frameRate(5)

    createButton("Prim's Algo").mousePressed(() => {
        canvas.style("border","0")
    })

    canvas.mousePressed(() => {
        nodes.push({
            x: mouseX,
            y: mouseY
        })
        loop()
    })
}


function draw() {
    background(0)
    unvisited = []
    visited = []

    unvisited = [...nodes]
    visited.push(unvisited.shift())

    nodes.forEach((node) => {
        fill(255,0,0)
        circle(node.x, node.y, 10)
    })

    while(visited.length != nodes.length && nodes.length != 0) {
        let minDist = dist(visited[0].x, visited[0].y, unvisited[0].x, unvisited[0].y)
        let minVisitedIndex = 0
        let minUnvisitedIndex = 0
        for(let i in visited) {
            for(let j in unvisited) {
                let d = dist(visited[i].x, visited[i].y, unvisited[j].x, unvisited[j].y)
                if(d < minDist) {
                    minDist = d
                    minVisitedIndex = i
                    minUnvisitedIndex = j
                }
            }
        }

        line(visited[minVisitedIndex].x, visited[minVisitedIndex].y, 
            unvisited[minUnvisitedIndex].x, unvisited[minUnvisitedIndex].y)

        visited.push(unvisited[minUnvisitedIndex])
        unvisited.splice(minUnvisitedIndex, 1)
    }
    
    console.log("done" + nodes.length)
    noLoop()
}