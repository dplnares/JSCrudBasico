import AddTodo from './components/add-todo.js';

export default class View{
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');
        //  Llamamos a la función de la clase add-todo.js
        this.addTodoForm = new AddTodo();
        
        this.addTodoForm.onClick((title, description) => this.addTodo(title, description));
    }

    setModel(model){
        this.model = model;
    }

    render(){
        const listTable = this.model.getTodos();
        listTable.forEach((itemList) => this.createRow(itemList));
    }

    addTodo(title, description){
        const todo = this.model.addToDo(title, description);
        this.createRow(todo);
    }

    toggleCompleted(id){
        this.model.toggleCompleted(id);
    }

    removeTodo(id){
        //  En un caso real, primero lo borras del servidor y luego lo borras de la vista. En caso de no poder borrarse en el servidor, debe mostrar un error. Sin eliminarlo.
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }
    
    createRow(todo){
        const row = table.insertRow();
        row.setAttribute('id', todo.id)
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center">

            </td>
            <td class="text-right">
                <button class="btn btn-primary mb-1">
                  <i class="fa fa-pencil"></i>
                </button>
            </td>
        `;

        // AÑADIR EL CHECKBOX
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        //  AÑADIR EL BOTON DE ELIMINAR PARA CADA ELEMENTO CREADO
        const btnRemove = document.createElement('button');
        btnRemove.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        btnRemove.innerHTML = '<i class="fa fa-trash"></i>';
        btnRemove.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(btnRemove);
    }
}