import { Ui } from "./UiSelectors.js";
import {carListDownLeft,carListDownRight,carListUp} from './CarList.js';

export class Car{
    constructor(startY,startX,destination,element,light){
        this.startX=startX;
        this.startY=startY;
        this.destination=destination;
        this.element=element;
        this.light=light;
        this.carIndex=null;
        this.street=Ui.street;
        this.signpostInterval=null;
        
        

        

        this.position={
            left:null,
            right:null,
            top:null,
            bottom:null
        }

        this.elementWidth=56;
        this.elementHeight=100;
        

        this.init();
    }

    init(){
        this.addClasses();
        this.setSignPostInterval();
        this.appendCar();
        this.getStartPosition();
    }

    getStartPosition(){
        if(!this.startX){
            this.getPositionVertical();
        }
        else{
            this.getPositionHorizontal();
        }
    }

    appendCar(){
        this.street.appendChild(this.element);
    }

    setSignPostInterval(){
        if(this.element.classList.contains('direction-left')){
            this.signpostInterval=setInterval(() => {
                this.element.classList.toggle('signPostLeft');
            }, 200);
        }
        if(this.element.classList.contains('direction-right')){
            this.signpostInterval=setInterval(() => {
                this.element.classList.toggle('signPostRight');
            }, 200);
        }
    }

    addClasses(){
        if(this.startX){
            this.element.classList.add(`${this.startY}-${this.startX}`);
            this.element.classList.add(`direction-${this.destination}`);
        }
        else{
            this.element.classList.add(`${this.startY}`);
            this.element.classList.add(`direction-${this.destination}`);
        }
    }

    getPositionVertical(){
        this.position.top=this.element.offsetTop;
        this.position.bottom=this.element.offsetTop+this.elementHeight;
        this.position.left=this.element.offsetLeft;
        this.position.right=this.element.offsetLeft+this.elementWidth;
    }

    getPositionHorizontal(){
        this.position.top=this.element.offsetTop;
        this.position.bottom=this.element.offsetTop+this.elementWidth;
        this.position.left=this.element.offsetLeft;
        this.position.right=this.element.offsetLeft+this.elementHeight;
    }

    removeElement(){
        this.element.remove();
    }
}