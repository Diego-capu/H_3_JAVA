const inputNota = document.getElementById("inputNota");
const listaNotas = document.getElementById("listaNotas");
const btnAgregar = document.getElementById("btnAgregar");

function agregarNota() {
    const textclean = inputNota.value.trim();
    if (textclean === "") {
        alert("Ingrese una nota")
        return;
    }
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = textclean;
    const boton = document.createElement("button");
    boton.textContent = "Eliminar"
    boton.addEventListener("click", function () {
        boton.parentElement.remove();
    });
    li.appendChild(span)
    li.appendChild(boton)
    listaNotas.appendChild(li)
    inputNota.value = ""
    inputNota.focus()

}

btnAgregar.addEventListener("click", agregarNota);   