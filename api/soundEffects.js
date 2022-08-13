let song
function setup() {
    let canvas = createCanvas(400,40)
    fill(255)
    noStroke()

    let btn = createButton("Loading Song") 
    let slider
    let playing = false
    
    song = loadSound("../rainbow.mp3", () => {
        btn.html("Play")
        btn.mousePressed(() => {
            if(playing == true) {
                playing = false
                btn.html("Play")
                song.stop()
                slider.remove()
            }
            else if(playing == false) {
                playing = true
                btn.html("Stop")
                song.play()
                
                slider = createSlider(0,1,0.5,0.01)
                slider.input(() => {
                    song.setVolume(slider.value())
                }) 
            }
        })
    })
 
}

function draw() {
    background(0)
    rect(0,0,song.currentTime()*400/song.duration(),40)
}