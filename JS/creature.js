"use script";

//生き物
class Creature{
    constructor(x, y, status, collor){
        this.x = x;
        this.y = y;
        this.status = status;
        this.collor = collor
    }
    move(dx, dy){
        this.x = (this.x + dx + canvas.width) % canvas.width;
        this.y = (this.y + dy + canvas.height) % canvas.height;

    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI*2);
        ctx.fillStyle = this.collor;
        ctx.fill();
        ctx.closePath();
    }
}

// ライオン
class Lion extends Creature{
    constructor(){
        super(Math.round(Math.random() * 10), Math.round(Math.random() * 10), 5, "#990000");
    }
}

// 草
class Grass extends Creature{
    constructor(){
        super(Math.round(Math.random() * canvas.width), Math.round(Math.random() * canvas.height), 5, "#990000");
    }
}

// シマウマ
class Zebra extends Creature{
    constructor(){
        super(x, y, status);
    }
}
// トムソンガゼル
class Thomsonii extends Creature{
    constructor(){
        super(x, y, status);
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
