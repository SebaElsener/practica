
// Importando módulos variables y DOM
import {variablesExport} from './variables.js'
import {domExport} from './DOM.js'

// Pidiendo información desde json local
const traerDatos = () =>{
    fetch('../datos.json')
    .then((response) => response.json())
    .then((datos) => {
        // Volcando al array de productos el contenido del json
        datos.data.forEach(element => {
            variablesExport.stockCubiertas.push(element)
        })
        generarGrillaProductos()
    })
}

traerDatos()

// Cargando datos guardados en storage
cargarDatosStorage()

// Evento click para validar y continuar la compra una vez ingresados los datos
domExport.btnContinuarCompra.addEventListener("click", (e) => {
    e.preventDefault()
    validarDatos()
})

// Function para validar datos, si los campos no son vacíos habilita las cards de productos para comprar con animaciones opacity (y deshabilita el botón de "continuar compra". Si los campos están vacíos manda msj pidiendo completarlos)
const validarDatos = () => {
    let nombreUsuario = domExport.nombreApellido.value
    let email = domExport.email.value
    if (nombreUsuario.length == 0 || email.length == 0) {
        domExport.alertaCompra.style.aligntext = 'center'
        domExport.alertaCompra.innerText = 'Por favor ingrese su nombre, apellido y email'
    } else {
        domExport.alertaCompra.innerText = ''
        domExport.btnContinuarCompra.style.display = 'none'
        domExport.grillaWrapper.style.opacity = '1'
        // Guardando datos personales comprador en storage
        sessionStorage.setItem('nombreApellido', JSON.stringify(nombreUsuario))
        sessionStorage.setItem('email', JSON.stringify(email))
    }
}

// Function para generar la grilla de productos con el array
function generarGrillaProductos() {
    for (let cubierta of variablesExport.stockCubiertas) {
        let html = `<div class="cajaProducto" id="${cubierta.id}">
                        <img class="imgProducto" src="../img/catalogos/cubiertas/${cubierta.descripcion}.png" alt="imagen-cubierta-${cubierta.descripcion}">
                        <p class="precioCubierta"><strong>$ ${cubierta.precio}</strong></p>
                        <p class="descripcionCubierta">${cubierta.descripcion}</p>
                        <p class="medidaCubierta">${cubierta.medida}</p>
                        <button class="btnAgregarProducto">Agregar</button>
                    </div>`
        domExport.contenedorProductos.innerHTML += html
    }
    // Bucle event click botones "agregar" de las cards asociados al id de cada objeto del array
    for (let i=0; i < domExport.btnAgregar.length; i++){
        domExport.btnAgregar[i].addEventListener("click", function (){
            let idProductoAgregado = this.parentElement.id
            // Pusheando id de productos elegidos al carrito
            variablesExport.carrito.push(idProductoAgregado)
            // Obtengo el producto que coincide con el click para extraer el valor del producto para el total del preview del carrito
            const productoPorId = variablesExport.stockCubiertas.find(idProducto => idProducto.id == idProductoAgregado)
            // Pusheando el valor del producto al array del total preview carrito
            variablesExport.totalPreviewCarrito.push(productoPorId.precio)
            // Guardando carrito y total preview carrito en storage
            guardarCarritoStorage()
            // Llamando function preview carrito
            previewCarrito()
        }, false)
    }
}

// Preview resúmen del carrito html ventacubiertas
function previewCarrito(){
    domExport.DOMCarrito.innerHTML = `<a href="carrito.html">CARRITO: <span>${variablesExport.carrito.length} ITEM(S) - </span><span>$ ${sumaTotal()} TOTAL</span></a>`
}

// Función precio total preview carrito
function sumaTotal (){
    // Sumando total
    const precioAcumulado = variablesExport.totalPreviewCarrito.reduce((acumulado, valorActual) => {
        return acumulado + valorActual
    }, 0)
    return precioAcumulado
}

// Function para guardar carrito en storage
function guardarCarritoStorage () {
    sessionStorage.setItem('carrito', JSON.stringify(variablesExport.carrito));
    sessionStorage.setItem('totalPreviewCarrito', JSON.stringify(variablesExport.totalPreviewCarrito));
}

// Function para cargar datos comprador storage y preview carrito, si los hubiera
function cargarDatosStorage () {
    if (sessionStorage.getItem('nombreApellido') !== null && JSON.parse(sessionStorage.getItem('nombreApellido')) !== ''){
        variablesExport.nombreUsuario = JSON.parse(sessionStorage.getItem('nombreApellido'))
        variablesExport.email = JSON.parse(sessionStorage.getItem('email'))
        domExport.nombreApellido.value = variablesExport.nombreUsuario
        domExport.email.value = variablesExport.email
        domExport.alertaCompra.innerText = ''
        domExport.btnContinuarCompra.style.display = 'none'
        domExport.grillaWrapper.style.opacity = '1'
        previewCarrito()
    }
}

