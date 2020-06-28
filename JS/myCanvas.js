var canvas = document.getElementById("ground");

if(canvas.getContext){
    var ctx = canvas.getContext("2d");
    canvas.width = document.documentElement.clientWidth-10;
    canvas.height = document.documentElement.clientHeight-10;
    var grass_density = 10;
    var grass_rate = 0.2;

    var zebras = new Array(500).fill(0);
    zebras = zebras.map(item => new Zebra());

    var lions = new Array(100).fill(0);
    lions = lions.map(item => new Lion());

    var animals = zebras.concat(lions);

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
    ctx.clearRect(0, 0, canvas.width, canvas.height); // canvasをリセット

    //　草を描画
    ctx.fillStyle="rgb(0,225,0)";//塗りつぶしの色
    grass.forEach(items => {
        items.forEach(item => {
            if(item.status > 0){
                item.draw();
            }
        });
    });


    animals.forEach((item, i) => {
        if (item.status === 1) {
            item.body_count++;
        }
        item.draw();
        if(!item.eat() && item.status === 0){
            item.move();
        }
        if(item.body_count > 100){  // 死亡して一定時間経過すると死体を削除
            // 死体が朽ちる時に草を成長させる
            item.give_nutrient();
            animals.splice(i, 1);  //配列からの取り除き方用検討
        }
    });
}
