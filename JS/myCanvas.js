var canvas = document.getElementById("ground");

if(canvas.getContext){
    var ctx = canvas.getContext("2d");
    canvas.width = document.documentElement.clientWidth-10;
    canvas.height = document.documentElement.clientHeight-10;

    // var lion = new Lion();
    // var zebra = new Zebra();
    var grass = new Grass();
    // var thomsonii = new Thomsonii();
    setInterval(draw, 10);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    grass.draw();
    grass.move(Math.round(Math.random() * 4), Math.round(Math.random() * 4) - 2);
}
