// === 1. CAPTURA DE ELEMENTOS DEL DOM ===
// Seleccionamos los elementos del HTML usando sus IDs para poder interactuar con ellos.
const inputNota = document.getElementById("inputNota"); // El campo de texto donde el usuario escribe.
const listaNotas = document.getElementById("listaNotas"); // La lista (generalmente un <ul> o <ol>) donde se mostrarán las notas.
const btnAgregar = document.getElementById("btnAgregar"); // El botón que el usuario presiona para añadir la nota.

// === 2. ESTADO DE LA APLICACIÓN ===
// Creamos un arreglo vacío para almacenar los textos de las notas en la memoria de la aplicación.
let notas = [];

// === 3. FUNCIÓN PARA AGREGAR UNA NOTA ===
function agregarNota() {
    // Tomamos el texto del input y le borramos los espacios en blanco sobrantes al inicio y al final con .trim()
    const textclean = inputNota.value.trim();
    
    // Validación: Si el usuario no escribió nada (o solo puso espacios), le avisamos y detenemos la función.
    if (textclean === "") {
        alert("Ingrese una nota");
        return; // El 'return' interrumpe la función aquí mismo.
    }
    
    // Si pasó la validación, agregamos el texto limpio al arreglo de notas.
    notas.push(textclean);
    
    // Guardamos el arreglo actualizado en el LocalStorage. 
    // Como LocalStorage solo guarda texto plano, usamos JSON.stringify() para convertir el arreglo en un texto.
    localStorage.setItem("notas", JSON.stringify(notas));
    
    // Dibujamos de nuevo la lista en la pantalla para que aparezca la nueva nota.
    renderizarNotas();
    
    // Limpiamos el campo de texto para que quede listo para la siguiente nota.
    inputNota.value = "";
    
    // Ponemos el cursor automáticamente de vuelta en el campo de texto (buena experiencia de usuario).
    inputNota.focus();
}

// === 4. FUNCIÓN PARA DIBUJAR LAS NOTAS EN EL HTML ===
function renderizarNotas() {
    // Limpiamos todo el contenido visual de la lista para evitar que las notas viejas se dupliquen.
    listaNotas.innerHTML = "";
    
    // Recorremos el arreglo de notas. 'element' es el texto de la nota e 'index' es su posición (0, 1, 2, etc.)
    notas.forEach((element, index) => {
        // Creamos los elementos HTML necesarios para esta nota en específico.
        const li = document.createElement("li");      // El contenedor de la fila.
        const span = document.createElement("span");  // El texto de la nota.
        const boton = document.createElement("button"); // El botón para borrarla.
        
        // Le asignamos el texto de la nota al span.
        span.textContent = element;
        
        // Le ponemos el texto "Eliminar" al botón.
        boton.textContent = "Eliminar";
        
        // Le agregamos un evento de clic al botón de eliminar.
        boton.addEventListener("click", function () {
            // Eliminamos 1 elemento del arreglo 'notas' justamente en la posición 'index'.
            notas.splice(index, 1);
            
            // Actualizamos el LocalStorage con el nuevo arreglo (que ya no tiene la nota eliminada).
            localStorage.setItem("notas", JSON.stringify(notas));
            
            // Volvemos a renderizar para actualizar lo que ve el usuario en pantalla.
            renderizarNotas();
        });
        
        // Armamos la estructura: metemos el span y el botón dentro del <li> (línea de la lista).
        li.appendChild(span);
        li.appendChild(boton);
        
        // Finalmente, metemos ese <li> completo dentro de nuestra lista principal en el HTML.
        listaNotas.appendChild(li);
    });
}

// === 5. ESCUCHADORES DE EVENTOS Y LOGICA DE INICIO ===
// Le asignamos la función 'agregarNota' al clic del botón Agregar.
btnAgregar.addEventListener("click", agregarNota);

// Al cargar la página, revisamos si ya existen notas guardadas en el LocalStorage.
if (localStorage.getItem("notas")){
    // Si existen, las convertimos de texto plano a un arreglo de JavaScript real usando JSON.parse()
    notas = JSON.parse(localStorage.getItem("notas"));
    
    // Mostramos en la consola un mensaje de control indicando cuántas notas se cargaron.
    console.log("notas cargadas:", notas.length);
}

// Ejecutamos esta función al final por primera vez. 
// Si había notas en el LocalStorage, se pintarán de inmediato; si no, la pantalla se queda limpia.
renderizarNotas();