//DOESNT FUCKING WOOOORK

let nodes = []
let reached = []
let unreached = []

function setup() {


    let canvas = createCanvas(400,400)
    strokeWeight(20)
    stroke(color(255))
    fill(255)
    
    canvas.mousePressed(() => {
        let v = createVector(mouseX,mouseY)
        nodes.push(v)
        circle(v.x,v.y,20)
    })
}


// function draw() {
//     stroke(255)
//     // background(0)

//     for(node of nodes) {
//         unreached.push(node)
//     }

//     reached.push(unreached[0])
//     unreached.splice(0,1)
//     // console.log(unreached.length)

//     while(unreached.length < 0){
//         let min = 10000

//         let startIndex = -1
//         let endIndex = -1

//         for(let r in reached){
//             for(let u in unreached){
//                 let d = dist(reached[r].x, reached[r].y, unreached[u].x, unreached[u].y)
//                 if(d < min){
//                     min = d
//                     startIndex = r
//                     endIndex = u
//                 }
//             }
//         }
        
//         line(reached[startIndex].x,reached[startIndex].y, unreached[endIndex].x, unreached[endIndex].y)
//         reached.push[unreached[endIndex]]
//         unreached.splice[endIndex,1]
//         console.log("one")
//     }
// }

function draw() {
    if(nodes.length < 2)
        return
    // background(50)
    fill(255)
    stroke(255)
    strokeWeight(3)

    reached = []
    unreached = nodes.slice()
    // console.log(unreached[0])
    reached.push(unreached[0])
    unreached.splice(0,1)
    // console.log(reached[0])

    while(unreached.length >= 0){
        let record = 10000
        let startIndex
        let endIndex
        for(let i in reached) {
            for(let j in unreached) {
                let v1 = reached[i]
                let v2 = unreached[j]
                let d = dist(v1.x, v1.y, v2.x, v2.y)

                if(d < reached) {
                    record = d
                    startIndex = i
                    console.log(i)
                    endIndex = j
                }
            }
        }
        // line(reached[startIndex].x,reached[startIndex].y,unreached[endIndex].x,unreached[endIndex].y)
        reached.push(unreached[endIndex])
        unreached.splice(endIndex,1)
        // console.log(unreached.length)
        // console.log(reached[0])
    }

    for(let node of nodes){
        circle(node.x, node.y, 20)
    }
}