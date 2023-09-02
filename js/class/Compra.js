class Compra {
    constructor() {
        this.compras = JSON.parse(localStorage.getItem("compra")) || [];
    }

    async agregarCompra(carrito, total) {
        const { isConfirmed } = await Swal.fire({
            title: 'Comprar Productos',
            text: '¿Está seguro que desea comprar los productos del carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar',
        });

        if (isConfirmed) {
            carrito.fecha = new Date().toLocaleDateString();
            carrito.total = total;
            this.compras.push(carrito);
            localStorage.setItem('compra', JSON.stringify(this.compras));
            localStorage.removeItem('carrito');
            location.reload();
        }
    }

    listarCompras() {
        return this.compras;
    }
}

export default Compra;