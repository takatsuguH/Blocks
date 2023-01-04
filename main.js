const width = 360, height = 640;


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

    loop();
}

function loop(){
    drawRect(0, 0, width, height, "ivory");
    
    requestAnimationFrame(loop);
}

onload = init;