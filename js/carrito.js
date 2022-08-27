
// Importando módulos variables y DOM
import {domExport} from './DOM.js'
import {variablesExport} from './variables.js'

// Trayendo la información del carrito desde el storage
if (JSON.parse(sessionStorage.getItem('carrito')) !== null){
    cargarCarritoStorage()
} else{
    domExport.accionesCarrito.style.display = 'none'
    domExport.prodCarrito.innerHTML = `<br><br><strong>CARRITO VACIO, POR FAVOR DIRIJASE A LA PAGINA DE VENTA PARA AGREGAR PRODUCTOS</strong>`
    domExport.prodCarrito.style.textAlign = 'center'
}

// Pidiendo información desde json local
const traerDatos = () =>{
    fetch('../datos.json')
    .then((response) => response.json())
    .then((datos) => {
        // Volcando al array de productos el contenido del json
        datos.data.forEach(element => {
            variablesExport.stockCubiertas.push(element)
        })
        mostrarCarrito()
    })
}

traerDatos()

function mostrarCarrito() {
    // Quitando los repetidos para no mostrar un producto adicional igual en el carrito cada vez que se hace click en agregar
    const productosRepetidos = [...new Set(variablesExport.carrito)]
    for (let idProducto of productosRepetidos){
        // Obtener producto del array que coincida con el id
        const productoPorId = variablesExport.stockCubiertas.filter(idStockCubiertas => idStockCubiertas.id == idProducto)
        // Ver en el array del carrito cuántos repetidos hay
        const unidadesProducto = variablesExport.carrito.reduce((total, id) => {
            // Si coinciden los id, los sumo al total
            return id === idProducto ? total += 1 : total;
        }, 0)
        // Añadiendo vistas de cada producto comprado al html carrito
        domExport.prodCarrito.innerHTML += `<div class="producto">
                                            <p class="descripcionCubierta">${productoPorId[0].descripcion}</p>
                                            <div class="imgProducto"><img src="../img/catalogos/cubiertas/${productoPorId[0].descripcion}.png" alt="imagen-cubierta-${productoPorId[0].descripcion}"></div>
                                            <p class="medidaCubierta">${productoPorId[0].medida}</p>
                                            <p class="precioCubierta"><strong>$ ${productoPorId[0].precio}</strong></p>
                                            <p class="cantidad">Cantidad: ${unidadesProducto}</p>
                                        </div>`
    }
    // Añandiendo al DOM carrito el precio total de la compra
    const precioAcumulado = variablesExport.totalPreviewCarrito.reduce((acumulado, valorActual) => {
        return acumulado + valorActual
    }, 0)
    domExport.totalCompra.innerHTML = `<strong>Total de su compra: </strong>$${precioAcumulado}`
}

// Evento botón finalizar compra
domExport.btnFinalizarCompra.addEventListener('click', function() {
    finCompra()
})

// Function finalizar compra
function finCompra(){
    // Obtener datos email para msj final de carrito
    let emailSessionStorage = JSON.parse(sessionStorage.getItem('email'))
    swal({
        title: "¡Muchas gracias!",
        text: `Hemos enviado un mail a su casilla ${emailSessionStorage} con los datos para el pago`,
        icon: "success",
        button: "Cerrar",
    });
    // Vaciar carrito
    variablesExport.carrito = []
    // Vaciar storage
    sessionStorage.clear()
    // Ocultar botones acciones carrito
    domExport.accionesCarrito.style.display = 'none'
    // Mensaje DOM carrito compra finalizada
    domExport.prodCarrito.innerHTML = `<br><br><strong>¡MUCHAS GRACIAS POR SU COMPRA!</strong>`
    domExport.prodCarrito.style.textAlign = 'center'
}

// Function para cargar datos del storage si los hubiera
function cargarCarritoStorage () {
    sessionStorage.getItem('carrito') !== null ? variablesExport.carrito = JSON.parse(sessionStorage.getItem('carrito')) : false
}
