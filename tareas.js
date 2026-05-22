const inputTarea = document.getElementById("inputTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");
const btnTodas = document.getElementById("filtroTodas");
const btnPendientes = document.getElementById("filtroPendientes");
const btnCompletadas = document.getElementById("filtroCompletadas");

let tareas = [];
let nextID = 1;
let filtroActual = "todas";

function agregarTarea(){
    const textclean = inputTarea.value.trim();
    if (textclean === ""){
        alert("Ingrese una nota")
        return;
    }
    const nuevaTarea = {
        id: nextID,
        texto: textclean,
        completada: false
    };
    nextID++;
    tareas.push(nuevaTarea)
    localStorage.setItem("tareas",JSON.stringify(tareas))
    inputTarea.value = ""
    inputTarea.focus()
}

btnAgregar.addEventListener("click", agregarTarea);

function renderizarTareas(){
    listaTareas.innerHTML = ""
    const tareasFiltradas = tareas.filter(tarea =>{
        if (filtroActual === "pendientes") return !tarea.completada;
        if (filtroActual === "completadas") return tarea.completada;
        return true;
    });
    tareasFiltradas.forEach((tarea, index) =>{
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = tarea.texto;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;

    }) 
    
}

