const inputNota = document.getElementById("inputNota");
const listaNotas = document.getElementById("listaNotas");
const btnAgregar = document.getElementById("btnAgregar");
let notas = [];
function agregarNota() {
    const textclean = inputNota.value.trim();
    if (textclean === "") {
        alert("Ingrese una nota")
        return;
    }
    notas.push(textclean);
    localStorage.setItem("notas", JSON.stringify(notas))
    renderizarNotas();
    inputNota.value = ""
    inputNota.focus()
}
function renderizarNotas() {
    listaNotas.innerHTML = ""
    notas.forEach((element, index) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = element;
        const boton = document.createElement("button");
        boton.textContent = "Eliminar"
        boton.addEventListener("click", function () {
            notas.splice(index, 1);
            localStorage.setItem("notas", JSON.stringify(notas));
            renderizarNotas();
        });
        li.appendChild(span)
        li.appendChild(boton)
        listaNotas.appendChild(li)
    });
}
btnAgregar.addEventListener("click", agregarNota);
if (localStorage.getItem("notas")){
    notas = JSON.parse(localStorage.getItem("notas"));
    console.log("notas cargadas:",notas.length)
}
renderizarNotas();