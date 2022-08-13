let arr = [0,1,2,3,4,6]
arr.sort()
let fact = 1

function setup() {
    createCanvas(400,400)
}

function draw() {
    background(0)
    console.log(arr)

    let x
    for(x=arr.length-2; x>=0; x--) {
        if(arr[x] < arr[x+1])
            break
    }

    if(x == -1) {
        noLoop()
        console.log(fact)
        return
    }

    let y
    for(y=arr.length-1; y>=0; y--) {
        if(arr[y] > arr[x]) {
            swap(x,y)
            break
        }
    }

    let tempArr = arr.splice(x + 1)
    tempArr.reverse()
    arr.push(...tempArr)
    fact++
}

function swap(i,j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}