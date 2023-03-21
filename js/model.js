export default class Model{
    constructor(){
        this.view = null;
        this.listTable = JSON.parse(localStorage.getItem('listTable'));
        if(!this.listTable || this.listTable.length < 1){
            this.listTable = [
                {
                    id: 0,
                    title: 'Learn JS',
                    description: 'Watch JS Tutorials',
                    completed: false,
                }
            ]
            this.currentId = 1;
        }
        else
        {
            this.currentId = this.listTable[this.listTable.length - 1].id + 1;
        }
        
    }

    setView(view){
        this.view = view;
    }
    
    save(){
        localStorage.setItem('listTable', JSON.stringify(this.listTable));
    }

    getTodos(){
        return this.listTable.map((todo) => ({...todo}));
    }

    findItemList(id){
        return this.listTable.findIndex((todo) => todo.id === id);
    }

    toggleCompleted(id) {
        const index = this.findItemList(id);
        const todo = this.listTable[index];
        todo.completed = !todo.completed;
        this.save();
    }
    
    addToDo(title, description){
        const itemList = {
            id: this.currentId++,
            //  CON LA SINTAXIS DE JS HACE QUE SI LE PONES EL MISMO NOMBRE DE VARIABLE EL VALOR QUE SE LE DE LE PUEDES DEJAR TAL CUAL -> title: title = title
            title,
            description,
            completed: false,
        }

        this.listTable.push(itemList);
        console.log(this.listTable);
        this.save();

        //  RETORNAR UN CLON DE MI OBJETO QUE GUARDO DE FORMA LOCAL (LOCAL HASTA QUE REFRESQUE EL DOM)
        //return Object.assign({}, itemList); -> EXPANDIR
        return {...itemList};
    }

    removeTodo(id){
        //  Equivalente a un for
        const index = this.findItemList(id);
        //  splice le pase un índice y la cantidad de elementos a borrar
        this.listTable.splice(index, 1);
        this.save();
    }

    editTodo(id, values){
        const index = this.findItemList(id);
        Object.assign(this.listTable[index], values);
        this.save();
    }
}