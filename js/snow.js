var canvas, ctx;

window.onload = function(){
    canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 600;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    start();
}

function start(){
    mainLoop();
}


function Snow(x, y, s){
    this.x = x;
    this.y = y;
    this.size = s;

    this.Update = function(){

    }

    this.Draw = function(){

    }
}

var snowLimit = 10;
var snow = [];

function mainLoop(){
    requestAnimationFrame(mainLoop);

    if (snow.length < snowLimit){
        var x = Math.random() * canvas.width;
        var size = Math.random() * 6 + 2;
        snow.push(new Snow(x, -8, size));
    }

    for (var i = 0; i < snow.length; i++){
        snow[i].Update();
    }

    for (var i = 0; i < snow.length; i++){
        snow[i].Draw();
    }
}