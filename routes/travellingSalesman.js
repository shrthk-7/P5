let nodes = []
let count = 1
let leastDist = 1000000

function setup(){
    let canvas = createCanvas(400,400)
    background(0)
    // noStroke()
    noFill()
    strokeWeight(2)
    stroke(255)

    canvas.mousePressed(() => {
        circle(mouseX, mouseY, 10)
        nodes.push({
            x: mouseX,
            y: mouseY,
            z: Math.trunc(Math.sqrt(mouseX*mouseX + mouseY*mouseY))
        })
        leastDist = 1000000
        loop()
    })
}

//USING RANDOM SWAPS
// function draw() {
//     if(nodes.length < count)
//         return

//     swap(Math.floor(Math.random() * nodes.length), Math.floor(Math.random() * nodes.length))
    
//     let newDistance = distance()
//     if(newDistance < leastDist) {
//         leastDist = newDistance
//         background(0)
//         beginShape()
//         nodes.forEach((node) => {
//             circle(node.x, node.y, 10)
//             vertex(node.x, node.y)
//         })
//         endShape()
//         console.log(leastDist)
//     }
// }

//USING PERMUTATIONS
function draw() {
    if(nodes.length < count)
        return

    nodes.forEach(node => {
        circle(node.x, node.y, 10)
    })

    let newDistance = distance()
    if(newDistance < leastDist) {
        console.log(newDistance)
        leastDist = newDistance
        background(0)
        beginShape()
        nodes.forEach((node) => {
            circle(node.x, node.y, 10)
            vertex(node.x, node.y)
        })
        endShape()
    }
    nodes = nextPermutation(nodes)
}


function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}
function distance() {
    totalDistance = 0
    for(let i=0; i<nodes.length - 1; i++) {
        totalDistance += dist(nodes[i].x, nodes[i].y, nodes[i+1].x, nodes[i+1].y)
    }
    return totalDistance
}
function nextPermutation(arr) {
    let x
    for(x=arr.length-2; x>=0; x--) {
        if(arr[x].z < arr[x+1].z)
            break
    }

    if(x == -1) {
        console.log("finished")
        noLoop()
        return arr
    }

    let y
    for(y=arr.length-1; y>=0; y--) {
        if(arr[y].z > arr[x].z) {
            swap(arr,x,y)
            break
        }
    }

    let tempArr = arr.splice(x + 1)
    tempArr.reverse()
    arr.push(...tempArr)

    return arr
}