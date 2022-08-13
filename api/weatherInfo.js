let url = "https://api.openweathermap.org/data/2.5/weather?q="
let apiKey = "&appid=9e7b9a3918c9670c0658e3753f9bb70f"
let units = "&units=metric"

let listEl
let input

function setup() {
    // createCanvas(400,400) 
    noCanvas()
    background(50)
    stroke(255)

    let p = createP("")
    input = createInput("")
    input.id("city")
    input.parent(p)

    let btn = createButton("Submit")
    btn.id("submit")
    btn.parent(p)

    listEl = createElement("ol", "")
    listEl.id("result")
    listEl = document.getElementById("result")
    
    let city = select("#city")
    let submit = select("#submit")
    submit.mousePressed(() => {
        if(city.value() == ""){
            console.log("idiot")
            return
        }
        loadJSON(url + city.value() + apiKey + units,(data) => { 
                display(data)
                console.log(data)
                city.value("") 

        })
    },"jsonp")
}

function display(weatherData) {
    listEl.innerHTML += `
        <h1>${weatherData.name}
            <ul>
                <li>Temperature = ${weatherData.main.temp}</li>
                <li>Weather = ${weatherData.weather[0].description}</li>
                <li>Humidity = ${weatherData.main.humidity}</li>
                <li>Wind Speed = ${weatherData.wind.speed}</li>
            </ul>
        </h1>
    `
}
