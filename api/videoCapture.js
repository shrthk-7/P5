let cols = 5
let rows = 5
let colors = []
let r = 0
let g = 0
let b = 0
let balls = []
let video
let snapshots = []

function setup() {
    let canvas = createCanvas(400,400)
    fill(255)
    stroke(0)
    background(50)
    frameRate(30)

    video = createCapture(VIDEO,() => {
        let captureBtn = createButton("Capture")
        captureBtn.mousePressed(() => {
            let interval = setInterval(() => {
                if(snapshots.length >= 25)
                    snapshots.shift()
                snapshots.push(video.get())
            }, 1000)
        })
    }).hide()
    video.size(400,400)
}

let h = 0
let w = 0
function draw() {
    for(let i in snapshots){
        image(video, w, h, 80, 80)
        w += 80
        if(w >= width) {
            w = 0
            h += 80
        }
        if(h >= height) {
            w = 0
            h = 0
        }
    }
}

function Sum(a) {
    let sum = 0
    if (a instanceof Array) {
        arguments = []
        arguments.push(...a)
    }
    for(let i of arguments) {
        sum += i
    } return sum
}

function Ball(a,b) {
    if(a instanceof p5.Vector) {
        this.x = a.x
        this.y = a.y
    } else if (typeof(a) === 'string') {
        let coords = a.split(',')
        this.x = Number(coords[0])
        this.y = Number(coords[1])
    } else {
        this.x = a || width/2
        this.y = b || height/2
    }

    this.display = function() {
        fill(255)
        circle(this.x, this.y, 20)
    }
}

