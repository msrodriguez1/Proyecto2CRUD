
let tareas = [];
let editMode=false;
let editionId=null;
const addButton = document.querySelector('.InputSubir')
addButton.addEventListener('click', function(event){
    if(editMode=== false){
        create(event)
    }else{
        editaTarea(event)
    }
})

function create(event) {
    event.preventDefault();
    const tarea = readForm();
    createRow(tarea);
    clearForm();
    saveDataLS();
}

function readForm() {
    const tareaInput = document.querySelector('.InputNombre');
    const descInput = document.querySelector('.InputDescripción');
    const fechaInput = document.querySelector('.InputFecha');
    const respInput = document.querySelector('.InputResponsable');
    const estadoInput = document.querySelector('.InputEstado');

    const tarea = {
        id: Date.now(),
        nombre: tareaInput.value,
        descripcion: descInput.value,
        fecha: fechaInput.value,
        responsable: respInput.value,
        estado: estadoInput.value
    }


    tareas.push(tarea)
    return tarea

}

function createRow(tarea) {
    const div = document.querySelector('.output');
    div.innerHTML += `<div class='tarea' id="${tarea.id}">
                     <div class='inptNombre'>${tarea.nombre}</div>
                     <div class='inptDesc'>${tarea.descripcion}</div>
                     <div class='inptFecha'>${tarea.fecha}</div>
                     <div class='inptResp'>${tarea.responsable}</div>
                     <div class='inptEstado'>${tarea.estado}</div>
                     <button class="btn-editar" onclick="updateTask(${tarea.id})">editar</button> 
                     <button class="btn-eliminar" onclick="deleteTask(${tarea.id})">eliminar</button>
                     </div>`;


}

function clearForm() {
    const form = document.querySelector('.form');
    form.reset();
}
function deleteTask(id) {
    const row = document.getElementById(id);
    row.remove();
    tareas = tareas.filter((tarea) => tarea.id !== id);
    saveDataLS();

}



function updateTask(id) {
    editMode=true;
    addButton.innerText='Actualizar';
    
    const tareaU = tareas.find((tarea) => tarea.id === id);

    const tareaInput = document.querySelector('.InputNombre');
    const descInput = document.querySelector('.InputDescripción');
    const fechaInput = document.querySelector('.InputFecha');
    const respInput = document.querySelector('.InputResponsable');
    const estadoInput = document.querySelector('.InputEstado');

    tareaInput.value = tareaU.nombre;
    descInput.value = tareaU.descripcion;
    fechaInput.value = tareaU.fecha;
    respInput.value = tareaU.responsable;
    estadoInput.value = tareaU.estado;

    editionId = id;
    const deleteButton = document.querySelector('.btn-eliminar');
    deleteButton.style.display = 'none';
}

function editaTarea(event) {
    event.preventDefault();
    const valores=readForm();
    valores.id=editionId;


    const index= tareas.find((tarea)=>tarea.id===editionId);
    tareas.splice(index,1,valores);
    saveDataLS();


    const row= document.getElementById(editionId)
    row.innerHTML= `<div class='inptNombre'>${valores.nombre}</div>
    <div class='inptDesc'>${valores.descripcion}</div>
    <div class='inptFecha'>${valores.fecha}</div>
    <div class='inptResp'>${valores.responsable}</div>
    <div class='inptEstado'>${valores.estado}</div>
    <button class="btn-editar" onclick="updateTask(${valores.id})">editar</button> 
    <button class="btn-eliminar" onclick="deleteTask(${valores.id})">eliminar</button>`;


    
    clearForm()
    editionId=null
    editMode=false
    addButton.innerText='Agregar'
    const deleteButton = document.querySelector('.btn-eliminar');
    deleteButton.style.display = 'block';

    
}



function saveDataLS() {
    localStorage.setItem('tareas', JSON.stringify(tareas))
}

function readDataLS() {
    tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas.forEach((el) => createRow(el));
}
readDataLS();











