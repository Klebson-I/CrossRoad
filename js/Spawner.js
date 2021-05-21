import { Car } from "./Car.js";
import { Ui } from "./UiSelectors.js";
import {carListDownLeft,carListDownRight,carListUp} from './CarList.js';

export class Spawner{
    startY=null;
    startX=null;
    direction=null;
    lightsInfluence=null;
  
 

    constructor(light1,light2,light3){
        this.light1=light1;
        this.light2=light2;
        this.light3=light3;
    }

    createCar(){
        const random=this.getRandomNumber();

        const carDiv=document.createElement('div');
        carDiv.classList.add('car');

        switch(random){
            case 1:
                this.startY='down';
                this.startX='left';
                this.direction='straight';
                this.lightsInfluence=this.light1;
                
            break;
            case 2:
                this.startY='down';
                this.startX='right';
                this.direction='straight';
                this.lightsInfluence=this.light3;
                
            break;
            case 3:
                this.startY='down';
                this.startX='left';
                this.direction='left';
                this.lightsInfluence=this.light1;
                carDiv.classList.add('signPostLeft');
            break;
            case 4:
                this.startY='down';
                this.startX='right';
                this.direction='right';
                this.lightsInfluence=this.light3;
                carDiv.classList.add('signPostRight');
            break;
            case 5:
                this.startY='up';
                this.startX=0;
                this.direction='left';
                this.lightsInfluence=this.light2;
                carDiv.classList.add('signPostLeft');
            break;
            case 6:
                this.startY='up';
                this.startX=0;
                this.direction='right';
                this.lightsInfluence=this.light2;
                carDiv.classList.add('signPostRight');
            break;
        }

        

        if(this.startX==='left'){
            carListDownLeft.push(carDiv);
        }
        if(this.startX==='right'){
            carListDownRight.push(carDiv);
        }
        if(this.startX===0){
            carListUp.push(carDiv);
        }

        return new Car(this.startY,this.startX,this.direction,carDiv,this.lightsInfluence);
    }

    getRandomNumber(){
        return Math.floor(Math.random()*6+1);
    }
}