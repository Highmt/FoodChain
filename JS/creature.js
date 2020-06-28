"use script";

//生き物
class Creature{
    constructor(vel, collor){
        this.x = Math.round(Math.random() * canvas.width);
        this.y = Math.round(Math.random() * canvas.height);
        this.vel = vel;
        this.size = 10;
        this.direction = 0;
        this.status = 0;
        this.collor = collor;
        this.hungry_rate = Math.round(Math.random() * 500);
        this.body_count = 0;
    }
    move(){
        if(Math.random() < 0.05){
            this.direction = Math.random() * Math.PI * 2;
        }
        this.x = (this.x + Math.round(this.vel * Math.cos(this.direction)) + canvas.width) % canvas.width;
        this.y = (this.y + Math.round(this.vel * Math.sin(this.direction)) + canvas.height) % canvas.height;
        this.hungry_rate--;
        if(this.hungry_rate < 0){
            this.status = 1;
        }
    }

    draw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
            if(this.status === 0){
                ctx.fillStyle = this.collor;
            }else {
                ctx.fillStyle = "#000";
            }
            ctx.fill();
            ctx.closePath();
    }
    give_nutrient(){
        for(let i = -1; i < 2; i+=1){
            for(let j = -1; j < 2; j+=1){
                grass[(Math.floor(this.x / grass_density) + i + grass.length) % grass.length][(Math.floor(this.y / grass_density) + j + grass[0].length) % grass[0].length].status += 1;
            }
        }
    }
}

// ライオン
class Lion extends Creature{
    constructor(){
        super(3, "#990000");
        this.target = null;
    }
    eat(){
        if(this.hungry_rate < 800)
        zebras.forEach((item) => {
            if(item.status === 0 && (item.x - this.x)*(item.x - this.x) + (item.y - this.y)*(item.y - this.y) < 400){
                item.status = 1;
                this.hungry_rate += 300;
                return true;
            }
        });
        return false;
    }
}

// シマウマ
class Zebra extends Creature{
    constructor(){
        super(2, "#FFFFFF");
    }

    eat(){
        if(this.hungry_rate < 800 && grass[Math.floor(this.x / grass_density)][Math.floor(this.y / grass_density)].status > 0){
            grass[Math.floor(this.x / grass_density)][Math.floor(this.y / grass_density)].status -=1;
            this.hungry_rate += 300;
        }
    }
}

// 草
class Grass extends Creature{
    constructor(x, y){
        super(0, "rgb(0,225,0)");
        this.x = x;
        this.y = y;
        if(Math.random() < grass_rate){
            this.status = Math.floor(Math.random() * 2) + 1;
        }
    }
    draw(){
        if(this.status > 2){
            this.status = 2;
        }
        ctx.beginPath();
        switch(this.status){
            case 2:
            ctx.moveTo(this.x, this.y - 5); //最初の点の場所
            ctx.lineTo(this.x - 5, this.y + 5); //2番目の点の場所
            ctx.lineTo(this.x + 5, this.y + 5); //3番目の点の場所
            ctx.fill();
            break;

            case 1:
            ctx.moveTo(this.x - 2.5, this.y); //最初の点の場所
            ctx.lineTo(this.x - 5, this.y + 5); //2番目の点の場所
            ctx.lineTo(this.x + 5, this.y + 5); //3番目の点の場所
            ctx.lineTo(this.x + 2.5, this.y)
            ctx.fill();
            break;
        }
        ctx.closePath();	//三角形の最後の線 closeさせる
    }
}

// 池
class Lake{
    constructor(){
        var cos = Math.cos(this.radian) * this.radius;
        var sin = Math.sin(this.radian) * this.radius;

        this.x = cos + this.centerX;
        this.y = sin + this.centerY;
    }
}
