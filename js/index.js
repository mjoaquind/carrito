import productos from './data.js'

const carrito = [];
const historial = [];

const card = document.querySelector("#card-container");

productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("col-lg-4","col-md-6","mb-3");
    div.innerHTML = `
        <div class="card">
            <img src="${producto.img}" class="card-img-top" alt="imagen propiedad">
            <div class="card-body" id="card-body-${producto.id}">
                <h4 class="card-title">${producto.tipo} ${producto.nombre} ${producto.marca}</h4>
                <p class="card-text">Precio: $${producto.precio}.</p>
            </div>
        </div>
    `

    card.appendChild(div);

    const btnAgregar = document.createElement("button");
    btnAgregar.classList.add("btn-blue");
    btnAgregar.innerText = "Agregar";

    btnAgregar.addEventListener("click", () => {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    });

    

    const agregarBoton = document.querySelector("#card-body-"+producto.id);
    agregarBoton.appendChild(btnAgregar);
});














const formatoFecha = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    dd < 10 ?? (dd = '0' + dd);
    mm < 10 ?? (mm = '0' + mm);
    const formattedToday = dd + '/' + mm + '/' + yyyy;
    
    return formattedToday
}

const filtrarPorTipo = (tipo)  => {
    let textoMenu = `Listado filtrado por ${tipo}\n`;
    productos.forEach(elemento => {
        elemento.tipo === tipo && (textoMenu += `${elemento.id} - ${elemento.tipo} ${elemento.marca} ${elemento.nombre} $${elemento.precio}\n`);
    })
    const opcion = parseInt(prompt(textoMenu));
    const productoSeleccionado = productos.find(elemento => elemento.id === opcion)
    carrito.push(productoSeleccionado)
    alert(`${productoSeleccionado.tipo} ${productoSeleccionado.marca} ${productoSeleccionado.nombre} agregado al carrito.`);
}

const verCarrito = () => {
    let textoCarrito = 'Carrito: \n';
    const numeroCompra = Math.round(Math.random() * 10000000 + 100000);
    carrito.forEach(elemento =>{
        textoCarrito += `${elemento.id} - ${elemento.tipo} ${elemento.marca} ${elemento.nombre} $${elemento.precio}\n`;
    })
    const total = carrito.reduce((acumulador,producto) => acumulador + producto.precio,0)
    textoCarrito += `TOTAL                    $${total}\n`;
    textoCarrito += '1 - Realizar compra\n';
    const respuesta = parseInt(prompt(textoCarrito));
    if(respuesta === 1) {
        historial.push({
            numero: numeroCompra,
            fecha: formatoFecha(),
            total: total,
        });
        alert(`Compra N°:${numeroCompra} fue realizada con éxito.`);
        carrito.splice(0,carrito.length);
    }
}

const verHistorial = () => {
    let textoHistorial = `Historial de compras:\n`;
    historial.forEach(elemento => {
        textoHistorial += `Compra N° ${elemento.numero} - Fecha: ${elemento.fecha} - Total $${elemento.total}\n`;
    })
    alert(textoHistorial);
}