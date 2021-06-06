import {CrossRoad, lane} from './CarList.js';





export class Pilot{
    constructor(light1,light2,light3){
        this.isTrue=false;
        this.interval=null;
        this.light1=light1;
        this.light2=light2;
        this.light3=light3;
        this.checkDelay=false;
    }
    
    

    simulate(){
        this.interval=setInterval(()=>{
            if(this.isTrue===false)clearInterval(this.interval);
            this.checkLanes();
        },1)
    }

   

    checkLanes(){
        let longestLane=this.getLaneLength();
        
        console.log(longestLane);
        if(typeof longestLane!='undefined'){
            
            switch(longestLane){
                case 0:
                    this.CheckDownLeftStraight();
                    this.CheckDownLeftLeft();
                    break;
                case 1:
                    
                    this.CheckUpRight();
                    this.CheckUpLeft();
                    break;
                case 2:
                    
                    this.CheckDownRightStraight();
                    this.CheckDownRightRight();
                    break;
                default:break;
            }
        }
        if(typeof longestLane=='undefined'){
            
            this.CheckDownLeftStraight();
            this.CheckDownLeftLeft();
            this.CheckDownRightStraight();
            this.CheckDownRightRight();
            this.CheckUpRight();
            this.CheckUpLeft();
        }
    }

    getLaneLength(){
        let map=lane.map(lane=>lane.length);
        let maxLaneNumber=map.indexOf(Math.max(...map));
        if(Math.max(...map)>=4){
            console.log(Math.max(...map));
            return maxLaneNumber;
        }
    }

    CheckDownLeftStraight(){
        if(lane[0][0]){
            
            if(lane[0][0].destination=='straight'&&
            lane[0][0].startX=='left'&&
            lane[0][0].startY=='down'&&
                lane[0][0].isWaiting==true&&
                this.checkDelay==false){

                this.setDelay();
                var canGo=true;
                if(CrossRoad.up_left.length!=0){
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
    }

    CheckDownLeftLeft(){
        if(lane[0][0]){
            if(lane[0][0].destination=='left'&&
            lane[0][0].startX=='left'&&
            lane[0][0].startY=='down'&&
                lane[0][0].isWaiting==true&&
                this.checkDelay==false){
                this.setDelay();
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
    }

    CheckDownRightStraight(){
        if(lane[2][0]){
            if(lane[2][0].destination=='straight'&&
            lane[2][0].startX=='right'&&
            lane[2][0].startY=='down'&&
                lane[2][0].isWaiting==true&&
                this.checkDelay==false){
                this.setDelay();
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
    }
    
    CheckDownRightRight(){
        if(lane[2][0]){
            if(lane[2][0].destination=='right'&&
            lane[2][0].startX=='right'&&
            lane[2][0].startY=='down'&&
                lane[2][0].isWaiting==true&&
                this.checkDelay==false){
                this.setDelay();
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
    }

    CheckUpRight(){
        if(lane[1][0]){
            if(lane[1][0].destination=='right'&&
                lane[1][0].startX==0&&
                lane[1][0].isWaiting==true&&
                this.checkDelay==false){
                this.setDelay();
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
    }

    CheckUpLeft(){
        if(lane[1][0]){
            if(lane[1][0].destination=='left'&&
                lane[1][0].startX==0&&
                lane[1][0].isWaiting==true&&
                this.checkDelay==false){
                this.setDelay();
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

    setDelay(){
        this.checkDelay=true;

        setTimeout(()=>{
            this.checkDelay=false;
        },5)
    }

    setToRed(...lights){
        lights.forEach(light=>light.changeClass());
    }
}
