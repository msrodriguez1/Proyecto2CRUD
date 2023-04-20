

//CREA LISTA DE TAREAS
let listaTareas= [];

//DEFINE OBJETO EMPLEADO
const objTarea = {
    id: '',
    tarea: '',
    desc: '',
    fecha:'',
    resp:'',
    estado:''

}

let editar = false;
// SELECCIONA OBJETOS DE LA PAGINA
const inputs = document.querySelector('.form');
const tareaInput = document.querySelector('.InputNombre');
const descInput = document.querySelector('.InputDescripción');
const fechaInput = document.querySelector('.InputFecha');
const respInput = document.querySelector('.InputResponsable');
const estadoInput = document.querySelector('.InputEstado');
const btnAgregarInput = document.querySelector('.InputSubir');
//FUNCION ESCUCHA
inputs.addEventListener('submit', validarFormulario);
//PROCESO
function validarFormulario(e) {
    e.preventDefault();

    if( tareaInput.value === '' ) {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editar) {
        editarTarea();
        editar = false;
    } else {
        objTarea.id = Date.now();
        objTarea.tarea = tareaInput.value;
        objTarea.desc = descInput.value;
        objTarea.fecha = fechaInput.value;
        objTarea.resp = respInput.value;
        objTarea.estado = estadoInput.value;



        agregarTarea();
    }
}
//FUNCION AREGAR EMPLEADO
function agregarTarea() {
  //AGREGA EMPLEADO A LA LISTA DE EMPLEADOS
    listaTareas.push({...objTarea});
    console.log(objTarea)
  //FUNCION MOSTRAR EMPLEADOS DE LA LISTA
    mostrarTareas();
  //RESET FORMULARIO 
    inputs.reset();
  //LIMPIAR OBJETO
    limpiarObjeto();
}

function limpiarObjeto() {
        objTarea.id = '';
        objTarea.tarea = '';
        objTarea.desc = '';
        objTarea.fecha = '';
        objTarea.resp = '';
        objTarea.estado = '';
}

function mostrarTareas() {
    //LIMPIA HTML DESPLEGADO
    limpiarHTML();
   //SELECCIONA DIV DONDE SE DESPLIEGAN
    const divTareas = document.querySelector('.output');
    // POR CADA EMPLEADO GENERADO EN LA LISTA
    listaTareas.forEach(task => {

        const {id, tarea, desc, fecha, resp, estado} = task;
        //GENERA UN PARRAFO CON LOS VALORES DE CADA OBJETO/EMPLEADO DE LA LISTA
        //const parrafo = document.createElement('p');
        //parrafo.textContent = `${id} - ${tarea} - ${desc} - ${fecha} -${resp} -${estado} `;
        //parrafo.dataset.id = id;
        const div = document.createElement('div');
        div.innerHTML = `<div class='inptNombre'>${tarea}</div><div class='inptDesc'>${desc}</div><div class='inptFecha'>${fecha}</div><div class='inptResp'>${resp}</div><div class='inptEstado'>${estado}</div>`;//`<div>${id}</div><div>${tarea}</div><div>${desc}</div><div>${fecha}</div><div>${resp}</div><div>${estado}</div>`;
        div.dataset.id = id;
        div.classList.add('RegistroTarea');

        // AL DIV LE AGREGA UN BOTON EDITAR
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarTarea(task);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        div.append(editarBoton);
        // AL DIV LE AGREGA UN BOTON ELIMINAR
        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarTarea(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        div.append(eliminarBoton);
        // GENERA ESPACIOS
        const hr = document.createElement('hr');
        //SUMA AL DIV 
        divTareas.appendChild(div);
        //SUMA AL DIV EL ESPACIO
    });
}
// CARGA EMPLEADO CREADO EN EL FORMULARIO PARA SU POSTERIOR EDICION
function cargarTarea(task) {
    const {id, tarea, desc, fecha, resp, estado} = task;

    tareaInput.value = tarea;
    descInput.value = desc;
    fechaInput.value = fecha;
    respInput.value = resp;
    estadoInput.value = estado;

    objTarea.id = id;

    inputs.querySelector('input[type="submit"]').textContent = 'Actualizar';
    // LE DA VALOR A EDITANDO=TRUE PARA QUE SE GATILLE LA FUNCIÓN EDITAREMPLEADO
    editar = true;
}

function editarTarea() {

    objTarea.tarea = tareaInput.value;
    objTarea.desc = descInput.value;
    objTarea.fecha = fechaInput.value;
    objTarea.resp = respInput.value;
    objTarea.estado = estadoInput.value;
    // VA A BUSCAR EL EMPLEADO CREADO EN LA LISTA CON EL MISMO ID CARGADO EN EL FORMULARIO Y CAMBIA LOS VALORES DE NOMBRE Y PUESTO
    listaTareas.map(task => {

        if(task.id === objTarea.id) {
            task.id = objTarea.id;
            task.tarea = objTarea.tarea;
            task.desc = objTarea.desc;
            task.fecha = objTarea.fecha;
            task.resp = objTarea.resp;
            task.estado = objTarea.estado;

        }

    });
    //limpia html
    limpiarHTML();
    //muestra valores nueva lista
    mostrarTareas();
    //limpia formulario
    inputs.reset();
    //cambia valor botón formulario a agregar
    inputs.querySelector('input[type="submit"]').textContent = 'Agregar';
    // apaga el valor editando
    editar = false;
}

function eliminarTarea(id) {
    //deja en la lista de empleados a todos aquellos que su id es distinto del que se debe eliminar
    listaTareas = listaTareas.filter(task => task.id !== id);
  //limpia HTML
    limpiarHTML();
  //Vuelve a mostrar lista
    mostrarTareas();
}

function limpiarHTML() {
  //limpia uno a uno a todos los elementos cargados al div
    const divTareas = document.querySelector('.output');
    while(divTareas.firstChild) {
        divTareas.removeChild(divTareas.firstChild);
    }
}