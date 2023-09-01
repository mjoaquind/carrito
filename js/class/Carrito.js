class Carrito {
    constructor() {
        this.items = JSON.parse(localStorage.getItem("carrito")) || [];
    }

    guardarLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(this.items));
    }

    agregarItem(producto, cantidad = 1, total = producto.precio) {
        const existe = this.items.find(item => item.producto.id === producto.id);
        if (existe) {
            existe.cantidad += cantidad;
            existe.total += total;
        } else {
            this.items.push({ producto, cantidad, total });
        }
        this.guardarLocalStorage();
    }

    async quitarItem(id) {
        const item = this.items.find(item => item.producto.id === id);
        if (item) {

            const { isConfirmed } = await Swal.fire({
                title: 'Quitar Producto',
                text: `¿Está seguro que desea quitar ${item.producto.tipo} ${item.producto.marca} ${item.producto.nombre} del carrito?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'Cancelar',
            });

            if (isConfirmed) {
                if (item.cantidad > 1) {
                    item.cantidad -= 1;
                    item.total = item.total - item.producto.precio;
                } else {
                    //deja los elementos que tienen id distinto al ingresado
                    this.items = this.items.filter(item => item.producto.id !== id);
                }
                this.guardarLocalStorage();
                location.reload();
            }
            
        }
    }
}

export default Carrito;