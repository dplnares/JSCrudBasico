export default class Alert{
    constructor(alertId){
        this.alert = document.getElementById(alertId);
    }

    show(message){
        //  d-none -> lo mantiene oculto
        this.alert.classList.remove('d-none');
        this.alert.innerText = message;
    }

    hide(){
        this.alert.classList.add('d-none');
    }
}