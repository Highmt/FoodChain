"use script";

//生き物
class Creature{
    constructor(x, y, status, collor){
        this.x = x;
        this.y = y;
        this.vel = 5;
        this.direction = 0;
        this.status = status;
        this.collor = collor
    }
    move(){
        if(Math.random() < 0.10){
            this.direction = Math.random() * Math.PI * 2
        }
        this.x = (this.x + Math.round(this.vel * Math.cos(this.direction)) + canvas.width) % canvas.width;
        this.y = (this.y + Math.round(this.vel * Math.sin(this.direction)) + canvas.height) % canvas.height;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI*2);
        ctx.fillStyle = this.collor;
        ctx.fill();
        ctx.closePath();
    }
}

// ライオン
class Lion extends Creature{
    constructor(){
        super(Math.round(Math.random() * canvas.width), Math.round(Math.random() * canvas.height), 5, "#990000");
    }
}

// シマウマ
class Zebra extends Creature{
    constructor(){
        super(Math.round(Math.random() * canvas.width), Math.round(Math.random() * canvas.height), 5, "#FFFFFF");
    }
}

// 草
class Grass extends Creature{
    constructor(x, y, s){
        super(x, y, s, "rgb(0,225,0)");
    }
    draw(){
        ctx.beginPath();
        switch(this.status){
            case 0:
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
