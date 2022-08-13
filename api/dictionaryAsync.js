let randomWordURL = "https://random-words-api.vercel.app/word"
let dictURL = "https://api.dictionaryapi.dev/api/v2/entries/en/"
let randomDogURL = "https://dog.ceo/api/breeds/image/random"

function setup() {
    noCanvas()

//SAVAGE WAY OF FETCHING A RANDOM WORD THEN FINDING ITS MEANING
    // fetch(randomWordURL)
    //     .then((data) => {
    //         return data.json()
    //     })
    //     .then((dataJson) => {
    //         createP(dataJson[0].word)
    //         return fetch(dictURL + dataJson[0].word)
    //         // return fetch(dictURL + "graupel")
    //     })
    //     .then((data) => {
    //         return data.json()
    //     })
    //     .then((dataJson) => {
    //         console.log(dataJson)
    //         if(dataJson.title) {
    //             createP("Sorry! Word not found")
    //             return
    //         }
    //         for(i of dataJson[0].meanings[0].definitions)
    //             createP(i.definition)
    //     })
    //     .catch((err) => console.log(err))

//MODERN WAY OF FETCHING A RANDOM WORD THEN FINDING ITS MEANING
    // wordMeaning()
    //     .then((response) => {
    //         console.log(response)
    //         createElement("h2", response.word)
    //         if(response.definitions.length == 0) {
    //             createP("Sorry no definition found")
    //             return
    //         }
    //         for(let definition of response.definitions) {
    //             createP(definition.definition)
    //         }
    //     })
    //     .catch((err) => console.log(err))

    let promises = [randomDogImage(1), randomDogImage(2), randomDogImage(3)]
    Promise.all(promises)
        .then((responses) => {
            for(let i in responses) {
                let image = createImg(responses[i].link)
                image.style("width", "300px")
                image.style("margin-top", "10px")
                createElement("h1", responses[i].index)
            }
        })
        .catch((err) => console.log(err))
}

async function wordMeaning() {
    let wordRaw = await fetch(randomWordURL)
    let wordJson = await wordRaw.json()

    let meaningRaw = await fetch(dictURL + wordJson[0].word)
    let meaningJson = await meaningRaw.json()

    if(meaningJson.title) {
        return {
            word : wordJson[0].word,
            definitions : []
        }
    } 
    else {
        return {
            word : wordJson[0].word,
            definitions : meaningJson[0].meanings[0].definitions
        }
    }
}

async function randomDogImage(number) {
    let dataRaw = await fetch(randomDogURL) 
    let dataJson = await dataRaw.json()
    return {
        link : dataJson.message,
        index : number
    }
}