let inputEl
let inputStr

let submitBtn
let sourceText

function diastic(str) {
    let poem = ""
    let index = 0
    let lastWordIndex = 0
    
    for(let i of str) {
        index = 0
        lastWordIndex = 0
        for(let letter of i){
            for(let j=lastWordIndex; j<sourceText.length; j++) {
                let word = sourceText[j]

                if(word[index] == letter && word.length >= 3) {
                    poem += word + " "
                    lastWordIndex = j+1
                    break
                }
            }
            index++
        }
    }
    return poem
}

function setup() {
    fetch("../randomWords.txt")
    .then(rawData => {
        return rawData.text()
    })
    .then(parsedData => {
        sourceText = parsedData
        sourceText = sourceText.split("\r\n")
    })
    .catch(err => {
        console.log(err)
    })

    noCanvas()
    inputEl = createInput()

    submitBtn = createButton("Submit")
    submitBtn.mousePressed(() => {
        inputStr = inputEl.value()
        inputStr = inputStr.split(" ")
        inputEl.value("")
        console.log(inputStr)
        if(inputStr[0] != "") {
            createP(diastic(inputStr))
        }
    })    
}

