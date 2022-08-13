function setup() {
    createCanvas(400,400)
    background(50)
    fill(255)
    delayAsync(1000)
        .then(() => {
            circle(200,200,300)
            createElement("h1", "done")
        })
        .catch((err) => console.log(err))
}
function delay(time) {
    return new Promise((resolve, reject) => {

        if(isNaN(time)) {
            reject(new Error('delay requires a valid time'))
            time = 1000 * 10
        } else {
            setTimeout(resolve,time)
        }
    })
}
async function delayAsync(time) {
    await delay(time)
    return
}