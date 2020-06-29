var canvas = document.getElementById("ground");

if(canvas.getContext){
    var ctx = canvas.getContext("2d");
    canvas.width = document.documentElement.clientWidth-10;
    canvas.height = document.documentElement.clientHeight-10;
    var grass_density = 10;
    var grass_rate = 0.5;

    var zebras = new Array(100).fill(0);
    zebras = zebras.map(item => new Zebra(null));

    var lions = new Array(10).fill(0);
    lions = lions.map(item => new Lion(null));

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
            // 発芽処理
            if(item.status === 0 && Math.random() < 0.1/(grass.length * grass[0].length)) { // 発芽する
                item.status = 1;
                item.age = 0;
            }

            if(item.status > 0){
                if(item.age < item.lifespan){
                    item.age++;
                    if (item.age < item.lifespan * 0.6) {
                        item.status = 1;
                    }else {
                        item.status = 2;
                    }
                }
                item.draw();
            }
        });
    });


    animals.forEach((item, i) => {
        if (item.status === 1) {
            item.body_count++;
        }
        item.update();
        item.draw();
        if(!item.eat() && item.status === 0){
            item.move();
        }
        if(item.body_count > 100){  // 死亡して一定時間経過すると死体を削除
            // 死体が朽ちる時に草を成長させる
            item.give_nutrient();
            animals.splice(i, 1);  //配列から削除
        }
    });
}
