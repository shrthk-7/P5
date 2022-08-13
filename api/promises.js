let img
let pixabayURL = "https://pixabay.com/api/?key=28273235-a4ce97addb25e86033daf6afe&q="
let randomWordURL = "https://random-words-api.vercel.app/word"

function setup() {
    // noCanvas(0)
    createCanvas(400,400)
    background(50)

    // let queryEl = createInput()
    // queryEl.changed(() => {
    //     loadJSON(url + queryEl.value(), (callback) => {
    //         console.log(callback)
    //         let max = callback.hits.length
    //         if(max == 0) {
    //             background(color(255,0,0))
    //             return
    //         }
    //         let index = Math.floor(Math.random() * max)
    //         loadImage(callback.hits[index].previewURL, (img) => {
    //             background(0)
    //             image(img,0,0,400,400)
    //         }, () => {
    //             console.log("failure")
    //             background(color(0,0,255))
    //         })
    //     })
    // })
    // let promise = fetch(randomWordURL)
    // promise.then((e) => {
    //     console.log(e)
    // })

    // fetch(randomWordURL)
    //     .then(data => data.json())
    //     .then(dataJson => createElement("h1",dataJson[0]))
    //     .catch(error => console.log(error))

    fetch(randomWordURL)
        .then(wordResponse => wordResponse.json())
        .then(wordJson => {
            createElement("h1", wordJson[0].word)
            return fetch(pixabayURL + toString(wordJson[0].word))
        })
        .then(imageResponse => imageResponse.json())
        .then(imageJson => {
            console.log(imageJson)
            if(imageJson.hits.length === 0){
                background(255)
                return
            }
            loadImage(imageJson.hits[0].previewURL, (img) => {
                background(50)
                image(img,0,0,400,400)
            })
        })
        .catch(e => {
            console.log(e)
            background(color(255,0,0))
        })
}