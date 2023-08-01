const productos = [
    {
        id: 1,
        nombre: 'Ryzen 7 5700g',
        marca: 'AMD',
        tipo: 'Procesador',
        precio: 170000
    },
    {
        id: 2,
        nombre: 'Ryzen 3 3200g',
        marca: 'AMD',
        tipo: 'Procesador',
        precio: 92000
    },
    {
        id: 3,
        nombre: 'Core I7 11700',
        marca: 'Intel',
        tipo: 'Procesador',
        precio: 291000
    },
    {
        id: 4,
        nombre: 'B550M DS3H',
        marca: 'Gigabyte',
        tipo: 'Motherboard',
        precio: 92000
    },
    {
        id: 5,
        nombre: 'A520M K V2',
        marca: 'Gigabyte',
        tipo: 'Motherboard',
        precio: 60590
    },
    {
        id: 6,
        nombre: '8GB 3200Mhz DDR4',
        marca: 'Kingston',
        tipo: 'Memoria',
        precio: 15590
    },
    {
        id: 7,
        nombre: '8GB 2666Mhz DDR4',
        marca: 'Crucial',
        tipo: 'Memoria',
        precio: 15590
    }
]

const carrito = [];
const historial = [];

const formatoFecha = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '/' + mm + '/' + yyyy;
    
    return formattedToday
}


const filtrarPorTipo = (tipo)  => {
    let textoMenu = `Listado filtrado por ${tipo}\n`;
    productos.forEach(elemento => {
        if (elemento.tipo == tipo) {
            textoMenu += `${elemento.id} - ${elemento.tipo} ${elemento.marca} ${elemento.nombre} $${elemento.precio}\n`;
        }
    })
    const opcion = parseInt(prompt(textoMenu));
    const productoSeleccionado = productos.find(elemento => elemento.id === opcion)
    carrito.push(productoSeleccionado)
    alert(`${productoSeleccionado.tipo} ${productoSeleccionado.marca} ${productoSeleccionado.nombre} agregado al carrito.`);
}

const listarProductos = () => {
    let opcion = parseInt(prompt('Elige una opción: \n 1 - Procesadores \n 2 - Motherborads \n 3 - Memorias \n 4 - Volver'));
    while (opcion != 4) {
        switch (opcion) {
            case 1:
                filtrarPorTipo('Procesador');
                break;
            case 2:
                filtrarPorTipo('Motherboard');
                break;
            case 3:
                filtrarPorTipo('Memoria');
                break;
            default:
                alert('Opción no válida.');
                break;
        }
        opcion = parseInt(prompt('Elige una opción: \n 1 - Procesadores \n 2 - Motherborads \n 3 - Memorias \n 4 - Volver'));
    }
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
    if(respuesta == 1) {
        historial.push({
            numero: numeroCompra,
            fecha: formatoFecha(),
            total: total,
        })
        alert(`Compra N°:${numeroCompra} fue realizada con éxito.`);
        carrito.splice(0,carrito.length);
    }
    console.log(historial);
}

const verHistorial = () => {
    let textoHistorial = `Historial de compras:\n`;
    historial.forEach(elemento => {
        textoHistorial += `Compra N° ${elemento.numero} - Fecha: ${elemento.fecha} - Total $${elemento.total}\n`;
    })
    alert(textoHistorial);
}

let opcion = parseInt(prompt('Elige una opción: \n 1 - Ver Productos \n 2 - Ver Carrito \n 3 - Historial \n 4 - Salir '));
while(opcion != 4){
    switch(opcion) {
        case 1: 
            listarProductos();
            break;
        case 2: 
            verCarrito();
            break;
        case 3: 
            verHistorial();
            break;
        default:
            alert('Opción no válida.');
            break;
    }
    opcion = parseInt(prompt('Elige una opción: \n 1 - Ver Productos \n 2 - Ver Carrito \n 3 - Historial \n 4 - Salir'));
}