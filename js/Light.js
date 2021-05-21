export class Light{

    constructor(className,toggle){
        this.toggle=toggle;
        this.element=className;
        this.isRed=true;

        this.init();
    }
    init(){
        this.addListeners();
        this.element.classList.add('lightRed');
    }
    addListeners(){
        this.toggle.addEventListener('click',()=>{
            this.changeClass();
        })
    }
    changeClass(){
        this.element.classList.toggle('lightRed');
        this.element.classList.toggle('lightGreen');

        if(this.element.classList.contains('lightGreen')){
            this.isRed=false;
        }
        if(this.element.classList.contains('lightRed')){
            this.isRed=true;
        }
    }
}