let issData
let x = 0
let y = 0

function setup() {
    createCanvas(400,400)
    strokeWeight(2)
    stroke(255)

    let interval = setInterval(() => {
        loadJSON("http://api.open-notify.org/iss-now.json",(data)=> {
            issData = data
        },"jsonp")
    }, 1000)
}

function draw() {
    if(issData) {
        x = map(issData.iss_position.longitude, -180, 180, 0, 400)
        y = map(issData.iss_position.latitude, -90, 90, 0, 400)
        point(x,y)
    }
}