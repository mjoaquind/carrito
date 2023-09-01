import Carrito from "./class/Carrito.js";

const carrito = new Carrito();

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