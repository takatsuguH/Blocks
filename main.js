const width = 360, height = 640;


let paddle;

class Block{
    constructor(x, y, w, h, col, stroke){
        this.x = x;
        this.y = y;
        this.w = w;
        this.hw = h;
        this.col = col;
        this.stroke = stroke
    }
}

drawRect(){
    drawRect(this.x, this.y, this.w, this.h, this,col, this.stroke);
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

    start();

    loop();
}

function start(){
    paddle = new paddle(width/2, 500)
}

function loop(){
    drawRect(0, 0, width, height, "ivory");
    
    requestAnimationFrame(loop);
}

onload = init;