export default class Alert{
    constructor(alertId){
        this.alert = document.getElementById('alert');
    }

    show(message){
        //  d-none -> lo mantiene oculto
        this.alert.classList.remove('d-none');
        //  AGREGAR UN VALOR A UN DIV QUE YA TIENE UN VALOR PREVIO
        this.alert.innerText = message;
    }

    hide(){
        this.alert.classList.add('d-none');
    }
}