"use script";

//生き物
class Creature{
    constructor(vel, collor, parent){

        this.init_vel = vel;
        if(parent !== null){
            this.x = (parent.x - Math.round((parent.size + 5) * Math.cos(parent.direction)) + canvas.width) % canvas.width;
            this.y = (parent.y - Math.round((parent.size + 5) * Math.sin(parent.direction)) + canvas.height) % canvas.height;
            this.vel = parent.vel;
            this.direction = parent.direction;
            this.hungry_rate = 500;
            this.age = 1;
            this.parent = parent;
        }else{
            this.x = Math.round(Math.random() * canvas.width);
            this.y = Math.round(Math.random() * canvas.height);
            this.vel = vel;
            this.direction = Math.random() * Math.PI * 2;
            this.hungry_rate = Math.round(Math.random() * 500) + 200;
            this.age = Math.random() * 500;
            this.parent = null;
        }

        this.size = 10;
        this.status = 0;
        this.collor = collor; //TODO 審議
        this.body_count = 0;
        this.lifespan = 1000;
        this.children = [];
    }

    update(){
        if(this.hungry_rate < 0 || this.age > this.lifespan){
            this.status = 1; // 餓死or寿命
        }else {
            this.age++; // 年をとる
            this.size = -Math.round(((this.age - this.lifespan/4*3) * (this.age - this.lifespan/4*3)) / (this.lifespan / 2 * this.lifespan / 2) * 4) + 12
            this.hungry_rate--; // 腹が減る
        }
        //　出産の処理呼び出し部
        if(this.age % Math.round(this.lifespan / 3) < 1 && this.hungry_rate > 300 && this.parent === null){
            this.birth();
        }

        // 成長したら親元を離れる
        if(this.parent != null && this.age > this.lifespan / 3 - 2){
            console.log("child");
            this.parent.children.splice(this.parent.children.indexOf(this), 1);
            this.parent = null;
        }

        //　子供が親元を離れたら親の速度を元に戻す
        if(this.children.length === 0){
            this.vel = this.init_vel;
        }

    }

    move(){
        if(this.parent === null){
            if(Math.random() < 0.05){
                this.direction = Math.random() * Math.PI * 2;
            }
            this.x = (this.x + Math.round(this.vel * Math.cos(this.direction)) + canvas.width) % canvas.width;
            this.y = (this.y + Math.round(this.vel * Math.sin(this.direction)) + canvas.height) % canvas.height;
        }else {
            this.x = (this.parent.x - Math.round((this.parent.size + this.size + 2) * Math.cos(this.parent.direction)) + canvas.width) % canvas.width;
            this.y = (this.parent.y - Math.round((this.parent.size + this.size + 2) * Math.sin(this.parent.direction)) + canvas.height) % canvas.height;
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
                let grass_x = (Math.floor(this.x / grass_density) + i + grass.length) % grass.length;
                let grass_y = (Math.floor(this.y / grass_density) + j + grass[0].length) % grass[0].length;
                grass[grass_x][grass_y].status++;
                grass[grass_x][grass_y].age += grass[grass_x][grass_y].lifespan / 2;
            }
        }
    }

}

// ライオン
class Lion extends Creature{
    constructor(parent){
        super(3, "#990000", parent);
        this.target = null;
    }
    eat(){
        if(this.hungry_rate < 800){
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

    birth(){
        let baby = new Lion(this);
        this.children.push(baby);
        lions.push(baby);
        animals.push(baby);
    }
}

// シマウマ
class Zebra extends Creature{
    constructor(parent){
        super(2, "#FFFFFF", parent);
    }

    eat(){
        let grass_x = (Math.floor(this.x / grass_density) + grass.length) % grass.length;
        let grass_y = (Math.floor(this.y / grass_density) + grass[0].length) % grass[0].length;
        if(this.hungry_rate < 800 && grass[grass_x][grass_y].status > 0){
            grass[grass_x][grass_y].status--;
            this.hungry_rate += 100;
        }
    }
    birth(){
        this.vel = 1;
        let baby = new Zebra(this);
        this.children.push(baby);
        zebras.push(baby);
        animals.push(baby);
    }
}

// 草
class Grass extends Creature{
    constructor(x, y){
        super(0, "rgb(0,225,0)", null);
        this.x = x;
        this.y = y;
        this.lifespan = 2000
        this.status = 0;
        if (Math.random() < 0.2){
            this.status = Math.floor(Math.random() * 2) + 1;
            this.age = Math.floor(this.status * (this.lifespan / 2) - Math.random() * (this.lifespan / 2));
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
