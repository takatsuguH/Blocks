const width = 360, height = 640;

function init(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    loop();
}

function loop(){
    ctx.fillRect(0, 0, width, height);
    
    requestAnimationFrame(loop);
}

onload = init;