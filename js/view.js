import AddTodo from './components/add-todo.js';
import Modal from './components/modal.js';
import Filters from './components/filters.js';

export default class View{
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');
        //  Llamamos a la función de la clase add-todo.js
        this.addTodoForm = new AddTodo();
        this.modal = new Modal();
        this.filters = new Filters();


        this.addTodoForm.onClick((title, description) => this.addTodo(title, description));
        this.modal.onClick((id, values) => this.editTodo(id, values));
        this.filters.onClick((filters) => this.filter(filters));
    }

    setModel(model){
        this.model = model;
    }

    render(){
        const listTable = this.model.getTodos();
        listTable.forEach((itemList) => this.createRow(itemList));
    }

    filter(filters){
        const {type, words} = filters;
        //  Eliminar el primer elemento usando [,...rows] -> Solo se muestre lo que quiero filtrar
        const [, ...rows] = this.table.getElementsByTagName('tr');
        for(const row of rows){
            const [title, description, completed] = row.children;
            let shouldHide = false;

            if(words){
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
            }

            const shouldBeCompleted = type === 'completed';
            const isCompleted = completed.children[0].checked;

            if(type !== 'all' && shouldBeCompleted !== isCompleted){
                shouldHide = true;
            }

            if (shouldHide) {
                row.classList.add('d-none');
            } else {
                row.classList.remove('d-none');
            }
        }
    }

    addTodo(title, description){
        const todo = this.model.addToDo(title, description);
        this.createRow(todo);
    }

    toggleCompleted(id){
        this.model.toggleCompleted(id);
    }

    editTodo(id, values){
        this.model.editTodo(id, values);
        const row = document.getElementById(id);
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].children[0].checked = values.completed;
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
            </td>
        `;

        // AÑADIR EL CHECKBOX
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        //  AÑADIR EL BOTON DE EDITAR
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.onclick = () => this.modal.setValues({
            id: todo.id,
            title: row.children[0].innerText,
            description: row.children[1].innerText,
            completed: row.children[2].children[0].innerText,
        });
        row.children[3].appendChild(editBtn);

        //  AÑADIR EL BOTON DE ELIMINAR PARA CADA ELEMENTO CREADO
        const btnRemove = document.createElement('button');
        btnRemove.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        btnRemove.innerHTML = '<i class="fa fa-trash"></i>';
        btnRemove.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(btnRemove);
    }
}