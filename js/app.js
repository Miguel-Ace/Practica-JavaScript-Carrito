// Variables
const lista_curso = document.querySelector('#lista-cursos');
const tbody = document.querySelector('tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const carrito = document.querySelector('#carrito');
let arreglo = [];

// Eventos
eventos();
function eventos(){
    lista_curso.addEventListener('click', seleccionaCurso)
    carrito.addEventListener('click', borrarCurso);
    vaciarCarrito.addEventListener('click', () => {
        limpiarHTML();
    });
}

// Funciones

// Borrando el curso seleccionado
function borrarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')) {
        const id = e.target.getAttribute('data-id');
        arreglo = arreglo.filter(curso => curso.id !== id);
        agregarCurso()
    }
}

// Seleccionando el curso
function seleccionaCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        infoCurso(curso);
    }
}

// Extrayendo la info del curso
function infoCurso(curso) {
    const info = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    };

// Sumando curso ya exístente al carrito
    const existe = arreglo.some(curso => curso.id === info.id);

    if (existe) {
        arreglo.map(curso => {
            if (curso.id === info.id) {
                curso.cantidad++
            }
        });
    }else{
        arreglo = [...arreglo, info];
    }

    agregarCurso();
}

// Agregando Curso al Carrito
function agregarCurso() {
    limpiarHTML()

    arreglo.forEach(curso =>{
        const {imagen,titulo,precio,id,cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100" alt="imagen">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
        </td>
        `;

        tbody.appendChild(row);
    });

}

function limpiarHTML() {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}