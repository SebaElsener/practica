
// Si hay datos en carrito localStorage los trae, sino declara el carrito vacío
const carrito = JSON.parse(sessionStorage.getItem('carrito')) !== null ? JSON.parse(sessionStorage.getItem('carrito')) : []

const stockCubiertas = []
const nombreUsuario = ''
const email = ''
const html=''
const precioTotal = []
const unidadesTotal = []
const totalPreviewCarrito = JSON.parse(sessionStorage.getItem('totalPreviewCarrito')) !== null ? JSON.parse(sessionStorage.getItem('totalPreviewCarrito')) : []

// Objeto de variables a exportar
export const variablesExport = {
    stockCubiertas,
    carrito,
    nombreUsuario,
    email,
    html,
    precioTotal,
    unidadesTotal,
    totalPreviewCarrito
}