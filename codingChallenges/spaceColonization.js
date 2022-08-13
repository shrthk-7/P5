let height = 400
let width = 400

let maxLeafDist = 100
let minLeafDist = 10

rootStartingPosX = width
rootStartingPosY = height

let leafNumber = 1000
let trees = []

function Leaf() {
    this.pos = createVector(Math.random()*width, Math.random()*(height - 0))
    this.reached = false
}
function Branch(parent, pos, dir) {
    this.pos = pos
    this.parent = parent
    this.dir = dir
    this.origDir = dir.copy()
    this.count = 0
}
function Tree(rootStartingPosX = width, rootStartingPosY = height) {
    this.leaves = []
    this.branches = []

    for(let i=0; i<leafNumber; i++) {
        this.leaves.push(new Leaf())
    }

    let pos = createVector(rootStartingPosX, rootStartingPosY)
    let dir = createVector(0, -1)

    this.root = new Branch(null, pos, dir)
    this.branches.push(this.root)

    let current = this.root
    let found = false

    while(!found) {
        this.leaves.forEach(leaf => {
            let d = p5.Vector.dist(current.pos, leaf.pos)
            if( d < maxLeafDist) {
                found = true
            }
        })
        if(!found) {
            let branch = current.next()
            current = branch
            this.branches.push(current)
        }
    }
}




//FUNCTION PROTOTYPING
Branch.prototype.reset = function() {
    this.dir = this.origDir.copy()
    this.count = 0
}
Branch.prototype.next = function() {
    let nextPos = p5.Vector.add(this.pos, this.dir)
    let nextBranch = new Branch(this, nextPos, this.dir.copy())
    return nextBranch
}
Branch.prototype.show = function() {
    if(this.parent != null) {
        stroke(255)
        line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y)
    }
}
Leaf.prototype.show = function() {
    circle(this.pos.x, this.pos.y, 1)
}
Tree.prototype.grow = function() {
    for(let i in this.leaves) {
        let leaf = this.leaves[i]
        let closestBranch = null
        let record = maxLeafDist

        for(let j in this.branches) {
            let branch = this.branches[j]
            let d = p5.Vector.dist(leaf.pos, branch.pos)

            if(d < minLeafDist) {
                leaf.reached = true
                closestBranch = null
                break
            } 
            else if(d < record) {
                closestBranch = branch
                record = d
            }
        }

        if(closestBranch != null) {
            let newDir = p5.Vector.sub(leaf.pos, closestBranch.pos)
            newDir.normalize()
            closestBranch.dir.add(newDir)
            closestBranch.count++
        }
    }

    for(let i=this.leaves.length-1; i >= 0; i--) {
        if(this.leaves[i].reached) {
            this.leaves.splice(i,1)
        }
    }
    
    for(let i=this.branches.length-1; i >= 0; i--) {
        let branch = this.branches[i]
        if(branch.count > 0) {
            branch.dir.div(branch.count)
            this.branches.push(branch.next())
        }
        branch.reset()
        // branch.reset()
    }
}
Tree.prototype.show = function() {
    this.leaves.forEach(leaf => {
        leaf.show()
    })
    this.branches.forEach(branch => {
        branch.show()
    })
}




function setup() {
    createCanvas(width, height)
    strokeWeight(2)
    stroke(255)

    trees.push(new Tree())
    trees.push(new Tree(0,0))
    trees.push(new Tree(width,0))
    trees.push(new Tree(0,height))
    trees.push(new Tree(width/2,height/2))

    trees.forEach(tree => {
        tree.leaves = trees[0].leaves
    })
}
function draw() {
    background(0)

    trees.forEach(tree => {
        tree.show()
        tree.grow()
    })

    if(trees[0].leaves.length <= 1) {
        console.log("finished")
        noLoop()
    }
}