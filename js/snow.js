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

function Vec3(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;

    this.Add = function(v){
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }

    this.Sub = function(v){
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    }

    this.Mult = function(v){
        this.x *= v;
        this.y *= v;
        this.z *= v;
    }

    this.mult = function(v){
        return new Vec3(this.x * v, this.y * v, this.z * v);
    }

    this.distanceTo = function(v){
        return this.distanceToSquare(v) ** 0.5;
    }

    this.distanceToSquare = function(v){
        var dx = this.x - v.x;
        var dy = this.y - v.y;
        var dz = this.z - v.z;

        return  dx ** 2 +
                dy ** 2 +
                dz ** 2;
    }

    this.forceAway = function(v){
        var dx = this.x - v.x;
        var dy = this.y - v.y;
        var dz = this.z - v.z;

        return new Vec3(dx, dy, dz);
    }

    this.signedForceAway = function(v){
        var dx = this.x - v.x;
        var dy = this.y - v.y;
        var dz = this.z - v.z;

        return new Vec3(Math.sign(dx), Math.sign(dy), Math.sign(dz));
    }
}

function Snow(x, y, z){
    this.pos = new Vec3(x, y, z);

    this.Update = function(){
        this.pos.y += this.pos.z ** 0.6;

        //Wind force
        for (var i = 0; i < wind.length; i++){
            var force = wind[i].radius - wind[i].pos.distanceTo(this.pos);
            if (force > 0){ //We are close enough to get effected!
                this.pos.Sub(wind[i].pos.forceAway(this.pos).mult(force * 0.01));
            }
        }

        this.pos.z = Math.min(Math.max(2, this.pos.z), 16);

        if (this.pos.y >= canvas.height + this.pos.z){
            var index = snow.indexOf(this);
            snow.splice(index, 1);
        }
    }

    this.Draw = function(){
        var scale = this.pos.z ** 0.8;
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.beginPath();
        ctx.ellipse(0, 0, scale*0.6, scale, 0, 0, 360, 0);
        ctx.fill();
        ctx.restore();
    }
}

function Wind(x, y, z, r){
    this.pos = new Vec3(x, y, z);
    this.radius = r;

    this.Update = function(){

    }

    this.Draw = function(){
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.beginPath();
        ctx.ellipse(0, 0, this.radius, this.radius, 0, 0, 360, 0);
        ctx.fill();
        ctx.restore();
    }
}

var snowLimit = 500;
var snow = [];

var windLimit = 6;
var wind = [];
var run = true;
function mainLoop(){
    if(run)
        requestAnimationFrame(mainLoop);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if (snow.length < snowLimit){
        var x = Math.random() * canvas.width;
        var z = Math.random() * 6 + 2;
        snow.push(new Snow(x, -8, z));
    }

    if (wind.length < windLimit){
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var z = Math.random() * 6 + 2;
        var radius = Math.random() * 9 + 60;
        wind.push(new Wind(x, y, z, radius));
    }

    for (var i = 0; i < wind.length; i++){
        wind[i].Update();
    }

    ctx.fillStyle = "#808";
    for (var i = 0; i < wind.length; i++){
        wind[i].Draw();
    }

    for (var i = 0; i < snow.length; i++){
        snow[i].Update();
    }

    ctx.fillStyle = "#fff";
    for (var i = 0; i < snow.length; i++){
        snow[i].Draw();
    }
}