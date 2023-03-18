/**
 *  Lo que hace este document.addEventListener, le indica al buscador que no se ejecute el js hasta que todo el codigo HTML se haya cargado correctamente
 *  */
document.addEventListener('DOMContentLoaded', function () {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const btnAdd = document.getElementById('add');
    const table = document.getElementById('table');
    const alert = document.getElementById('alert');

    let id = 1;

    btnAdd.onclick = function () {
        console.log('Title:', title.value);
        console.log('Description:', description.value);
        addTodo();
    }

    function addTodo() {
        if (title.value === '' || description.value === '') {
            //  d-none -> lo mantiene oculto
            alert.classList.remove('d-none');
            //  AGREGAR UN VALOR A UN DIV QUE YA TIENE UN VALOR PREVIO
            alert.innerText = 'Title and description are required!';
            return;
        }

        /*tbody.append(
            '<td>"'+title.value+'"</td>'+
            '<td>"'+description.value+'"</td>'+
            '<td class="text-center">'+
                '<input type="checkbox">'+
            '</td>'+
            '<td class="text-right">'+
                '<button class="btn btn-primary mb-1">'+
                  '<i class="fa fa-pencil"></i>'+
                '</button>'+
                '<button class="btn btn-danger mb-1 ml-1">'+
                  '<i class="fa fa-trash"></i>'+
                '</button>'+
            '</td>'
        );*/
        alert.classList.add('d-none');
        const row = table.insertRow();
        row.setAttribute('id', id++)
        row.innerHTML = `
            <td>${title.value}</td>
            <td>${description.value}</td>
            <td class="text-center">
                <input type="checkbox">
            </td>
            <td class="text-right">
                <button class="btn btn-primary mb-1">
                  <i class="fa fa-pencil"></i>
                </button>
            </td>
        `;

        //  AÑADIR EL BOTON DE ELIMINAR PARA CADA ELEMENTO CREADO
        const btnRemove = document.createElement('button');
        btnRemove.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        btnRemove.innerHTML = '<i class="fa fa-trash"></i>';
        btnRemove.onclick = function(e)
        {
            removeTodo(row.getAttribute('id'));
        }
        row.children[3].appendChild(btnRemove);
    }
    
    function removeTodo(id)
    {
        console.log(id);
        document.getElementById(id).remove();
    }
})
