var canvas = document.getElementById("ground");

if(canvas.getContext){
    var ctx = canvas.getContext("2d");
    canvas.width = document.documentElement.clientWidth-10;
    canvas.height = document.documentElement.clientHeight-10;
    var grass_density = 10;

    var zebras = new Array(100).fill(0);
    zebras = zebras.map(item => new Zebra());

    var lions = new Array(10).fill(0);
    lions = lions.map(item => new Lion());

    var grass = new Array(Math.floor(canvas.width / grass_density)).fill(0);
    for(let i = 0; i < canvas.width / grass_density; i++) {
        grass[i] = new Array(Math.floor(canvas.height / grass_density)).fill(0);
        for(let j = 0; j < canvas.height / grass_density; j++){
            grass[i][j] = new Grass(i * grass_density, j * grass_density, Math.floor(Math.random() * 3));
        }
    }

    setInterval(draw, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle="rgb(0,225,0)";//塗りつぶしの色
    grass.forEach(items => {
        items.forEach(item => {
            if(item.status > 0){
                item.draw();
            }
        });
    });

    zebras.forEach(item => {
        item.draw();
        if(!item.eat() && item.status === 0){
            item.move();
        }
    });

    lions.forEach(item => {
        item.draw();
        if(!item.eat() && item.status === 0){
            item.move();
        }
    });
}
