import productos from './data.js'

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const card = document.querySelector("#card-container");

productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("col-lg-4","col-md-6","mb-3");
    div.innerHTML = `
        <div class="card">
            <img src="${producto.img}" class="card-img-top" alt="imagen propiedad">
            <div class="card-body" id="card-body-${producto.id}">
                <h4 class="card-title">${producto.tipo} ${producto.nombre} ${producto.marca}</h4>
                <p class="card-text">Precio: $${producto.precio}</p>
            </div>
        </div>
    `

    card.appendChild(div);

    const btnAgregar = document.createElement("button");
    btnAgregar.classList.add("btn-blue");
    btnAgregar.innerText = "Agregar";

    const actualizarCantidadPrecio = (id) => {
        let resultado = {}
        resultado = carrito.find(item => item.id === id);
        resultado.cantidad = resultado.cantidad +1;
        resultado.total = resultado.precio * resultado.cantidad;
        return resultado;
    }

    btnAgregar.addEventListener("click", () => {
        let result = carrito.find(item => item.id === producto.id);
        if(result !== undefined) {
            producto = actualizarCantidadPrecio(producto.id);
        } else {
            producto.cantidad = 1;
            producto.total = producto.precio;
            carrito.push(producto);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
    });

    const agregarBoton = document.querySelector("#card-body-"+producto.id);
    agregarBoton.appendChild(btnAgregar);
});