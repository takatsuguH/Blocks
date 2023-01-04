let canvas, ctx;
const width = 360, height = 640;

let keyRight = false, keyLeft = false;

let paddle;

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
    }
}

function drawRect(x, y, w, h, col, stroke=false){
    ctx.fillStyle = col;
    ctx.fillRect(x ,y ,w ,h);
    if(stroke){
        ctx.strokeRect(x, y, w, h);
    }
}

function init(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    addEventListener("keydown", (e) => {
        if(e,key == "ArrowRight") keyRight = false;
        if(e.key == "ArrowLeft") keyLeft = false;
    });

    start();

    loop();
}

function start(){
    paddle = new Paddle(width/2, 560)
}

function loop(){
    drawRect(0, 0, width, height, "ivory");

    paddle.move();

    paddle.draw();
    
    requestAnimationFrame(loop);
}

onload = init;