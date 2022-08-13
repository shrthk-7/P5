let img
let sorted
let sortedPixelArray = []

function brightness(a) {
    return (a[0] + a[1] + a[2]) / 3
}

function preload() {
    img = loadImage("../peach.jpg")
}
function setup() {
    createCanvas(800, 400)

    image(img, 0, 0)
    img._pixelDensity = 1
    img.resize(400, 400)

    sorted = img.get()
    sorted._pixelDensity = 1
    sorted.resize(400,400)


    img.loadPixels()
    sorted.loadPixels()

    for(let i = 0; i < sorted.width; i++) { 
        sortedPixelArray[i] = []
        for(let j = 0; j < sorted.height; j++) { 
            let pix = 4 * (i + sorted.width * j)
            sortedPixelArray[i].push([
                sorted.pixels[pix + 0], 
                sorted.pixels[pix + 1], 
                sorted.pixels[pix + 2], 
                sorted.pixels[pix + 3], 
            ])
        }
    }

    for(let i = 0; i < 400; i++) {
        sortedPixelArray[i].sort((a,b) => {

            if(a[0] > b[0])
                return 1
            if(a[0] < b[0])
                return -1
            if(a[0] == b[0])
                return 0


            //SORTING ON THE BASIS OF SUM OF G, B VALUES
            // if(a[1] + a[2] > b[1] + b[2])
            //     return -1
            // if(a[1] + a[2] < b[1] + b[2])
            //     return 1
            // if(a[1] + a[2] == b[1] + b[2])
            //     return 0
            

            //SORTING ON THE BASIS OF BRIGHTNESS
            let x = brightness(a)
            let y = brightness(b)
            
            if(x > y)
                return 1
            if(x < y)
                return -1
            if(x == y)
                return 0
        })
    }

    for(let i = 0; i < sorted.width; i++) { 
        for(let j = 0; j < sorted.height; j++) { 
            let pix = 4 * (i + sorted.width * j)
            sorted.pixels[pix + 0] = sortedPixelArray[i][j][0]
            sorted.pixels[pix + 1] = sortedPixelArray[i][j][1]
            sorted.pixels[pix + 2] = sortedPixelArray[i][j][2]
            sorted.pixels[pix + 3] = sortedPixelArray[i][j][3]
        }
    }

    sorted.updatePixels()

}
function draw() {
    image(sorted, img.width, 0)
    // noLoop()
}
