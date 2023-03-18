import Model from './model.js';
import View from './view.js';

/**
 *  Lo que hace este document.addEventListener, le indica al buscador que no se ejecute el js hasta que todo el codigo HTML se haya cargado correctamente
 *  */
document.addEventListener('DOMContentLoaded', () => {
    const model = new Model();
    const view = new View();

    model.setView(view);
    view.setModel(model);

    view.render();
});