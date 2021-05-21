import {Ui} from './UiSelectors.js';
import{Light} from './Light.js';
import{Spawner} from './Spawner.js';




class Game{

    constructor(){
        this.street=null;
        this.spawner=null;
        this.light1=null;
        this.light2=null;
        this.light3=null;
        this.lane1=[];
        this.lane2=[];
        this.lane3=[];
    }

    init(){
        this.street=Ui.street;
        this.light1=new Light(Ui.light1,Ui.line1Toggle);
        this.light2=new Light(Ui.light2,Ui.line2Toggle);
        this.light3=new Light(Ui.light3,Ui.line3Toggle);
        this.spawner=new Spawner(this.light1,this.light2,this.light3);

        const interval=setInterval(()=>{
            this.getCar();
        },2000)
    }

    getCar(){
        const car=this.spawner.createCar();
        this.segregateCar(car);
    }

    segregateCar(car){
        if(car.startX=='left'&&car.startY=='down'){
            this.lane1.push(car);
            car.carIndex=this.lane1.length-1;
        }
        if(car.startX=='right'&&car.startY=='down'){
            this.lane3.push(car);
            car.carIndex=this.lane3.length-1;
        }
        if(car.startY=='up'){
            this.lane2.push(car);
            car.carIndex=this.lane2.length-1;
        }

        this.setAnimation(car);
    }

    setAnimation(car){
        if(car.startX=='left'&&car.startY=='down'&&car.destination=='straight'){
            this.Animation1c1(car);
        }
        if(car.startX=='right'&&car.startY=='down'&&car.destination=='straight'){
            this.Animation3c1(car);
        }
        if(car.startX=='left'&&car.startY=='down'&&car.destination=='left'){
            this.Animation1c1(car);
        }
        if(car.startX=='right'&&car.startY=='down'&&car.destination=='right'){
            this.Animation3c1(car);
        }
        if(car.startY='up'){
            this.Animation2c1(car);
        }
    }

    //1c1
    Animation1c1(car){
        const interval=setInterval(()=>{
            if(car.position.left<Ui.line1.offsetLeft-110*car.carIndex){
                car.element.style.left=car.position.left+1+'px';
                car.getPositionHorizontal();
            }
            else if(car.carIndex==0){
                clearInterval(interval);

                if(car.destination=='straight'){
                    this.Animation1c2(car);
                }
                if(car.destination=='left'){
                    this.Animation1c3(car);
                }
                
            }
        },10)
    }
    //1c2
    Animation1c2(car){
        var toggle=false;
        const interval=setInterval(()=>{
            if((car.position.left>Ui.line1.offsetLeft||car.light.isRed==false)&&car.position.left<=Ui.street.offsetWidth){

                if(toggle==false){
                    toggle=true;
                    this.lane1.shift();
                    this.lane1.forEach((car)=>{
                        car.carIndex--;
                    })
                }
                car.element.style.left=car.position.left+1+'px';
                car.getPositionHorizontal();
            }
            else if(car.position.left>=Ui.street.offsetWidth){
                clearInterval(interval);
                car.removeElement();
            }
        },10)
    }
    //1c3
    Animation1c3(car){

        var toggle=false;
        var angle=-90;
        var moveLittleCounter=0;

        const interval=setInterval(()=>{
            if((car.position.left>Ui.line1.offsetLeft||car.light.isRed==false)&&car.position.top>=Ui.line3.offsetTop){
                if(toggle==false){
                    toggle=true;
                    this.lane1.shift();
                    this.lane1.forEach((car)=>{
                        car.carIndex--;
                    })
                }
                const moveLittle=setInterval(()=>{
                    if(moveLittleCounter<20){
                        car.element.style.left=car.position.left+1+'px';
                        car.getPositionHorizontal();
                        moveLittleCounter++;
                    }
                    else{
                        clearInterval(moveLittle);
                    }
                },5)

                if(moveLittleCounter>=20){
                    car.element.style.left=car.position.left+1+'px';
                    car.element.style.top=car.position.top-1+'px';
                    car.element.style.transform=`rotateZ(${angle}deg)`;
                    car.getPositionHorizontal();
                    angle-=0.58;
                }
                
            }
            else if(car.position.top<=Ui.line2.offsetTop){
                clearInterval(interval);
                this.Animation1c4(car);
            }
           
        },10)
    }
    //1c4
    Animation1c4(car){
        const interval=setInterval(()=>{
            if(car.position.top>0){
                car.element.style.top=car.position.top-1+'px';
                car.getPositionHorizontal();
            }
            else{
                clearInterval(interval);
                car.removeElement();
            }
        },10)
    }
    //3c1
    Animation3c1(car){
        const interval=setInterval(()=>{
            if(car.position.left>Ui.line2.offsetLeft+110*car.carIndex-car.elementWidth/2){
                car.element.style.left=car.position.left-1+'px';
                car.getPositionHorizontal();
            }
            else if(car.carIndex==0){
                clearInterval(interval);
                if(car.destination=='straight'){
                    this.Animation3c3(car);
                }
                if(car.destination=='right'){
                    this.Animation3c2(car);
                }
            }
        },10)
    }
    //3c2
    Animation3c2(car){
        var toggle=false;
        var angle=90;
        const interval=setInterval(()=>{
            if((car.position.left<Ui.line2.offsetLeft-car.elementWidth/2||car.light.isRed==false)&&car.position.top>=Ui.line3.offsetTop-car.elementHeight/2){

                if(toggle==false){
                    toggle=true;
                    this.lane3.shift();
                    this.lane3.forEach((car)=>{
                        car.carIndex--;
                    })
                }
                car.element.style.left=car.position.left-1+'px';
                car.element.style.top=car.position.top-1+'px';
                car.element.style.transform=`rotateZ(${angle}deg)`
                angle+=1.07;
                car.getPositionHorizontal();
            }
            else if(car.position.top<=Ui.line3.offsetTop){
                clearInterval(interval);
                this.Animation1c4(car);//
            }
        },10)
    }
    //3c3
    Animation3c3(car){
        var toggle=false;
        const interval=setInterval(()=>{
            if((car.position.left<Ui.line2.offsetLeft-car.elementWidth/2||car.light.isRed==false)&&car.position.left>=0){

                if(toggle==false){
                    toggle=true;
                    this.lane3.shift();
                    this.lane3.forEach((car)=>{
                        car.carIndex--;
                    })
                }
                car.element.style.left=car.position.left-1+'px';
                car.getPositionHorizontal();
            }
            else if(car.position.left<=car.elementWidth/2){
                clearInterval(interval);
                car.removeElement();
            }
        },10)
    }
    //2c1
    

}

const game=new Game();
game.init();