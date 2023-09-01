import Carrito from "./class/Carrito.js";
import Producto from "./class/Producto.js";

const url = "../data/producto.json";

const carrito = new Carrito();

const card = document.querySelector("#card-container");

async function cargarProductos() {
    const response = await fetch(url);
    const data = await response.json();
    
    const productos = data.map(item => {
        return new Producto(item.id, item.img, item.nombre, item.marca, item.tipo, item.precio);
    });

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


        btnAgregar.addEventListener("click", () => {
            carrito.agregarItem(producto)
            Toastify({
                avatar: `${producto.img}`,
                text: `${producto.tipo} ${producto.nombre} ${producto.marca} añadido al carrito.`,
                duration: 2000,
                gravity: "top",
                position: "center"
            }).showToast();
        });
    
        const agregarBoton = document.querySelector("#card-body-"+producto.id);
        agregarBoton.appendChild(btnAgregar);
    });
}

await (cargarProductos())();