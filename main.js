let canvas, ctx;
const width = 360, height = 640;

let keyRight = false, keyLeft = false, keySpace = false;

let paddle, ball;
let blocks = [];

const colors = ["red", "orange", "fuchsia", "lightgreen", "chocolate"];
let score = 0;

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

function drawText(text, x, y, col, size, pos="center"){
    ctx.font = `boid ${size}px monospace`;
    ctx.textBaseline = "to";
    if(pos == "center") ctx.tetAlign = "center";
    if(pos == "right") ctx.textAlign = "right";
    ctx.fillStyle = col;
    ctx.fillText(text, x, y);
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
    score = 0;
    paddle = new Paddle(width/2, 560);
    ball = new Ball();
    blocks = [];
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            blocks.push(new Block(35+j*60, 50+i*30, 50, 15, colors[i], true));
        }
    }
}

function loop(){
    drawRect(0, 0, width, height, "ivory");

    paddle.move();
    
    ball.move();

    collision();

    blocks.forEach(block => {
        block.draw();
    });
    paddle.draw();
    ball.draw(); 
    drawText("SCORE*"+("000"+score).slice(-3), width-5, 5, "green", 22, "right");

    requestAnimationFrame(loop);
}

function collision(){
    if(ball.x+ball.r > width || ball.x-ball.r < 0){
        ball.vx *= -1;
    }
    if(ball.y-ball.r < 0){
        ball.vy *= -1;
    }
    if(ball.y+ball.r > paddle.y && ball.y+ball.r < paddle.y+5
    && ball.x+ball.r > paddle.x && ball.x-ball.r < paddle.x+paddle.w){
        let x = ball.x-(paddle.x+paddle.w/2);
        let y = (paddle.y+paddle.h)-ball.y;
        ball.a = Math.atan2(y, x)*180/Math.PI;
        ball.vx = Math.cos(ball.a*Math.PI/180)*ball.speed;
        ball.vy = -Math.sin(ball.a*Math.PI/180)*ball.speed;
    }

    blocks.forEach((block, i) => {
        if(ball.y-ball.r < block.y+block.h && ball.y-ball.r > block.y+block.h-5
        && ball.x+ball.r > block.x && ball.x-ball.r < block.x+block.w){
            ball.y = block.y+block.h+ball.r;
            ball.vy *= -1;
            blocks.splice(i, 1);
            score += 10;
        }
        if(ball.y+ball.r > block.y && ball.y+ball.r < block.y+5
        && ball.x+ball.r > block.x && ball.x-ball.r < block.x+block.w){
            ball.y = block.y-ball.r;
            ball.vy *= -1;
            blocks.splice(i, 1);
            score += 10;
        }
        if(ball.x+ball.r > block.x && ball.x+ball.r < block.x+5
        && ball.y+ball.r > block.y && ball.y-ball.r < block.y+block.h){
            ball.x = block.x-ball.r;
            ball.vx *= -1;
            blocks.splice(i, 1);
            score += 10;
        }
        if(ball.x-ball.r < block.x+block.w && ball.x-ball.r > block.x+block.w-5
        && ball.y+ball.r > block.y && ball.y-ball.r < block.y+block.h){
            ball.x = block.x+block.w+ball.r;
            ball.vx *= -1;
            blocks.splice(i, 1);
            score += 10;
        }
    });

}

onload = init;