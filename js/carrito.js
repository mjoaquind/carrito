import Carrito from "./class/Carrito.js";
import Compra from "./class/Compra.js";;

const carrito = new Carrito();

const compra = new Compra();

const row = document.querySelector("#carrito-row");

let total = 0;

carrito.items.forEach(elemento => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${elemento.producto.id}</td>
        <td>${elemento.producto.tipo}</td>
        <td>${elemento.producto.nombre}</td>
        <td>${elemento.producto.marca}</td>
        <td>${elemento.producto.precio}</td>
        <td>${elemento.cantidad}</td>
        <td>${elemento.total}</td>
        <td id="tr-item-${elemento.producto.id}"></td>
    `
    row.appendChild(tr);

    const btnQuitar = document.createElement("i");
    btnQuitar.classList.add("bi","bi-trash3");

    btnQuitar.addEventListener("click", () => {
        carrito.quitarItem(elemento.producto.id);
    });

    const agregarBoton = document.querySelector("#tr-item-"+elemento.producto.id);
    agregarBoton.appendChild(btnQuitar);

    total = total + elemento.total;
});

const tr2 = document.createElement("tr");
tr2.innerHTML = `
    <td colspan="6">Total</td>
    <td colspan="2">${total}</td>
`
row.appendChild(tr2);

const comprarCarrito = document.querySelector('.comprar-carrito');
comprarCarrito.classList.add("text-center");

// Crea el botón "Comprar"
const botonComprar = document.createElement('button');
botonComprar.classList.add("btn","btn-success","m-2");
botonComprar.innerText = 'Comprar';
botonComprar.addEventListener('click', function() {
    compra.agregarCompra(carrito, total);
});



// Crea el botón "Cancelar"
const botonCancelar = document.createElement('button');
botonCancelar.classList.add("btn","btn-danger","M-2");
botonCancelar.innerText = 'Cancelar';
botonCancelar.addEventListener('click', function() {
    carrito.vaciarCarrito();
});

// Si el carrito está vacío no muestro los botones
if(total > 0) {
    comprarCarrito.appendChild(botonComprar);
    comprarCarrito.appendChild(botonCancelar);
}