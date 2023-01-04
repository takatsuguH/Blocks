let canvas, ctx;
const width = 360, height = 640;

let keyRight = false, keyLeft = false, keySpace = false;

let paddle, ball;

class Block{
    constructor(x, y, w, h, col, stroke){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = col;
        this.stroke = stroke;
    }

    draw(){
        drawRect(this.x, this.y, this.w, this.h, this.col, this.stroke);
    }
}

class Paddle extends Block{
    constructor(x, y){
        super(x, y, 70, 15, "lime", true);
        this.x -= this.w/2
        this.speed = 4;
    }

    move(){
        if(keyRight) this.x += this.speed;
        if(keyLeft) this.x -= this.speed;

        paddle.x = Math.min(Math.max(paddle.x, 0), width-paddle.w);
    }
}

class Ball{
    constructor(){
        this.r = 8;
        this.x = paddle.x+paddle.w/2;
        this.y = paddle.y-this.r;
        this.col = "yellow";
        this.stroke = true;
        this.onMove = false;
        this.speed = 4;
        this.a = 30+Math.floor(Math.random()*50);
        this.vx = Math.cos(this.a*Math.PI/180)*this.speed;
        this.vy = -Math.sin(this.a*Math.PI/180)*this.speed;
    }

    move(){
        if(!this.onMove){
            this.x = paddle.x+paddle.w/2;
            if(keySpace){
                this.onMove = true;
            }
        }else{
            this.x += this.vx;
            this.y += this.vy;
        }
    }

    draw(){
        drawCircle(this.x, this.y, this.r, this.col, this.stroke);
    }
}

function drawRect(x, y, w, h, col, stroke=false){
    ctx.fillStyle = col;
    ctx.fillRect(x ,y ,w ,h);
    if(stroke){
        ctx.strokeRect(x, y, w, h);
    }
}

function drawCircle(x, y, r, col, stroke=false){
    ctx.beginPath();
    ctx.fillStyle = col;
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fill();
    if(stroke){
        ctx.stroke();
    }
}

function init(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    addEventListener("keydown", (e) => {
        if(e.key == "ArrowRight") keyRight = true;
        if(e.key == "ArrowLeft") keyLeft = true;
        if(e.key == " ") keySpace = true;
    });
    addEventListener("keyup", (e) => {
        if(e.key == "ArrowRight") keyRight = false;
        if(e.key == "ArrowLeft") keyLeft = false;
        if(e.key == " ") keySpace = false;
    });

    start();

    loop();
}

function start(){
    paddle = new Paddle(width/2, 560)
    ball = new Ball();
}

function loop(){
    drawRect(0, 0, width, height, "ivory");

    paddle.move();
    ball.move();

    collision();

    paddle.draw();
    ball.draw(); 

    requestAnimationFrame(loop);
}

function collision(){

}

onload = init;