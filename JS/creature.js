"use script";

//生き物
class Creature{
    constructor(status, vel, collor){
        this.x = Math.round(Math.random() * canvas.width);
        this.y = Math.round(Math.random() * canvas.height);
        this.vel = vel;
        this.size = 10;
        this.direction = 0;
        this.status = status;
        this.collor = collor;
        this.hungry_rate = Math.round(Math.random() * 10000);
    }
    move(){
        if(Math.random() < 0.05){
            this.direction = Math.random() * Math.PI * 2;
        }
        this.x = (this.x + Math.round(this.vel * Math.cos(this.direction)) + canvas.width) % canvas.width;
        this.y = (this.y + Math.round(this.vel * Math.sin(this.direction)) + canvas.height) % canvas.height;
        this.hungry_rate--;
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
}

// ライオン
class Lion extends Creature{
    constructor(){
        super(0, 3, "#990000");
        this.target = null;
    }
    eat(){
        zebras.forEach((item) => {
            if((item.x - this.x)*(item.x - this.x) + (item.y - this.y)*(item.y - this.y) < 400){
                item.status = 1;
            }
        });
        return null;
    }
}

// シマウマ
class Zebra extends Creature{
    constructor(){
        super(0, 2, "#FFFFFF");
    }

    eat(){
        if(this.hungry_rate < 8000 && grass[Math.floor(this.x / grass_density)][Math.floor(this.y / grass_density)].status > 0){
            grass[Math.floor(this.x / grass_density)][Math.floor(this.y / grass_density)].status -=1;
            this.hungry_rate += 500;
        }
    }
}

// 草
class Grass extends Creature{
    constructor(x, y, s){
        super(s, 0, "rgb(0,225,0)");
        this.x = x;
        this.y = y;
    }
    draw(){
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
