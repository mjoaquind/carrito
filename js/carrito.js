const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const row = document.querySelector("#carrito-row");

let total = 0;

const eliminarElemento = (elemento) => {
    if(elemento.cantidad > 1) {
        elemento.cantidad = elemento.cantidad - 1;
        elemento.total = elemento.cantidad * elemento.precio;
    } else {
        let index = carrito.map(e => e.id).indexOf(elemento.id);
        if (index != -1) {
            carrito.splice(index, 1);
        }
    }
    location.reload();
}

carrito.forEach(elemento => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${elemento.id}</td>
        <td>${elemento.tipo}</td>
        <td>${elemento.nombre}</td>
        <td>${elemento.marca}</td>
        <td>${elemento.precio}</td>
        <td>${elemento.cantidad}</td>
        <td>${elemento.total}</td>
        <td id="tr-item-${elemento.id}"></td>
    `
    row.appendChild(tr);

    const btnQuitar = document.createElement("button");
    btnQuitar.classList.add("btn","btn-danger");
    btnQuitar.innerText = "-";

    btnQuitar.addEventListener("click", () => {
        eliminarElemento(elemento)
        localStorage.setItem("carrito", JSON.stringify(carrito));
    });

    const agregarBoton = document.querySelector("#tr-item-"+elemento.id);
    agregarBoton.appendChild(btnQuitar);

    total = total + elemento.total;
});

const tr2 = document.createElement("tr");
    tr2.innerHTML = `
        <td colspan="6">Total</td>
        <td colspan="2">${total}</td>
    `
    row.appendChild(tr2);