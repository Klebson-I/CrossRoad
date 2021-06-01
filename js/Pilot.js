import {CrossRoad, lane} from './CarList.js';
import { Ui } from './UiSelectors.js';




export class Pilot{
    constructor(light1,light2,light3){
        this.isTrue=false;
        this.interval=null;
        this.light1=light1;
        this.light2=light2;
        this.light3=light3;
        
    }
    
    

    simulate(){
        this.interval=setInterval(()=>{
            if(this.isTrue===false)clearInterval(this.interval);
            this.checkLanes();
        },1)
    }

   

    checkLanes(){
        
        if(lane[0][0]){
            console.log('down-left-straight istnieje');
            if(lane[0][0].destination=='straight'&&
            lane[0][0].startX=='left'&&
            lane[0][0].startY=='down'&&
                lane[0][0].isWaiting==true){
                    console.log('down-left-straight czeka');
                var canGo=true;
                if(CrossRoad.up_left.length!=0){
                    canGo=false;
                    console.log('down-left-straight nie może jechać');
                    console.log(CrossRoad.up_left);
                }
                if(canGo==true){
                    console.log('down-left-straight  może jechać');
                    this.light1.changeClass();
                    setTimeout(()=>{
                        this.light1.changeClass();
                    },1000);
                }
            }
        }
        if(lane[0][0]){
            if(lane[0][0].destination=='left'&&
            lane[0][0].startX=='left'&&
            lane[0][0].startY=='down'&&
                lane[0][0].isWaiting==true){
                var canGo=true;

                if(CrossRoad.down_right_right.length!=0||CrossRoad.down_right_straight.length!=0||CrossRoad.up_left.length!=0){
                    canGo=false;
                }

                if(canGo==true){
                    this.light1.changeClass();
                    setTimeout(()=>{
                        this.light1.changeClass();
                    },1000);
                }
            }
        }
        if(lane[2][0]){
            if(lane[2][0].destination=='straight'&&
            lane[2][0].startX=='right'&&
            lane[2][0].startY=='down'&&
                lane[2][0].isWaiting==true){

                var canGo=true;

                if(CrossRoad.up_left.length!=0||CrossRoad.up_right.length!=0||CrossRoad.down_left_left.length!=0){
                    canGo=false;
                }
                
                if(canGo==true){
                    this.light3.changeClass();
                    setTimeout(()=>{
                        this.light3.changeClass();
                    },1000);
                }
            }
        }
        if(lane[2][0]){
            if(lane[2][0].destination=='right'&&
            lane[2][0].startX=='right'&&
            lane[2][0].startY=='down'&&
                lane[2][0].isWaiting==true){

                var canGo=true;

                if(CrossRoad.down_left_left.length!=0){
                    canGo=false;
                }
                
                if(canGo==true){
                    this.light3.changeClass();
                    setTimeout(()=>{
                        this.light3.changeClass();
                    },1000);
                }
            }
        }
        if(lane[1][0]){
            if(lane[1][0].destination=='right'&&
                lane[1][0].startX==0&&
                lane[1][0].isWaiting==true){
                var canGo=true;
                if(CrossRoad.down_right_straight.length!=0){
                    canGo=false;
                }
                if(canGo==true){
                    this.light2.changeClass();
                    setTimeout(()=>{
                        this.light2.changeClass();
                    },1000);
                }
            }
        }
        if(lane[1][0]){
            if(lane[1][0].destination=='left'&&
                lane[1][0].startX==0&&
                lane[1][0].isWaiting==true){
                var canGo=true;
                if(CrossRoad.down_left_left.length!=0||CrossRoad.down_left_straight.length!=0||CrossRoad.down_right_straight.length!=0){
                    canGo=false;
                }
                if(canGo==true){
                    this.light2.changeClass();
                    setTimeout(()=>{
                        this.light2.changeClass();
                    },1000);
                }
            }
        }
        
    }

    setToRed(...lights){
        lights.forEach(light=>light.changeClass());
    }
}