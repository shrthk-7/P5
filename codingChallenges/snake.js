//SNAKE WITHOUT THE STRESS
let speed = 1
let ratio = 20
let food

function Vect(x,y) {
    this.x = x
    this.y = y
}
function Snake() {
    this.x = 0
    this.y = 0
    this.speedX = 0
    this.speedY = 0
    this.snakeLength = 1

    this.snakeHistory = []

    this.createFood = function() {
        this.snakeLength++

        let foodX = Math.floor(Math.random() * width/ratio) * ratio
        let foodY = Math.floor(Math.random() * height/ratio) * ratio
        food = new Vect(foodX,foodY)
        console.log("food created")
    }
    this.update = function() {
        this.x += this.speedX*ratio
        this.y += this.speedY*ratio

        this.x = constrain(this.x, 0, width-ratio)
        this.y = constrain(this.y, 0, height-ratio)

        this.snakeHistory.push(new Vect(this.x, this.y))
        if(this.snakeHistory.length >= this.snakeLength)
            this.snakeHistory.shift()

        if(dist(food.x,food.y,this.x,this.y) < ratio) {
            this.createFood()
        }
    }
    this.display = function() {
        fill(255)
        for(i in this.snakeHistory) {
            rect(this.snakeHistory[i].x, this.snakeHistory[i].y, ratio, ratio)
        }
        fill(0,0,255)
        rect(this.x, this.y, ratio, ratio)
    }
}

let snake = new Snake()

function setup() {
    createCanvas(400,400)
    frameRate(20)
    snake.createFood()
}
function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            snake.speedX = 0
            snake.speedY = -speed
            break;
        case DOWN_ARROW:
            snake.speedX = 0
            snake.speedY = speed
            break;
        case LEFT_ARROW:
            snake.speedX = -speed
            snake.speedY = 0
            break;
        case RIGHT_ARROW:
            snake.speedX = speed
            snake.speedY = 0
            break;
        default:
            break;
    }
}
function draw() {
    background(0)
    snake.update()
    snake.display()

    fill(255,0,0)
    rect(food.x,food.y,ratio)
}