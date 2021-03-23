export default function validarCrearProducto(valores) {

    let errores = {}

    //Validar el nombre del usuario
    if (!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio"
    }

    // validar el email
    if (!valores.empresa) {
        errores.empresa = "Nombre de Empresa es obligatorio"
    }

    //Validar el password
    if (!valores.url) {
        errores.url = "La URL del producto es obligaatoria"
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = "URL mal formateada o no valida"
    }

    //Validar descripción
    if (!valores.descripcion) {
        errores.descripcion = "Agrega una descripción de tu producto"
    }

    return errores
}