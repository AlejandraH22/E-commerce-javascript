const carrito = [];
const subtotal = () => carrito.reduce((acc, el) => acc + el.precioFinal, 0);
let total = subtotal;
let contadorCarrito = 1;


// Funciones

const guardarStorage = (clave, valor) => {
    localStorage.setItem(clave, valor)
}

const basePorcentaje = (n) => {
    return (m) => (m * n) / 100
}

const porcentaje10 = basePorcentaje(10);
const porcentaje25 = basePorcentaje(25);
const porcentaje35 = basePorcentaje(35);


const botonCompra = (compra, cantidad) => {
    if (compra.stock === "si") {
        if (cantidad <= compra.cantidad) {
            compra.cantidad = compra.cantidad - cantidad;
            if (compra.cantidad > 0) {
                compra.stock = "si";
            } else {
                compra.stock = "no"
            }
            let precio = compra.precio;
            let precioParcial = compra.precio * cantidad;
            let buscador = carrito.some((el) => el.producto === compra.nombre);
            if (buscador === true) {
                for (let el of carrito) {
                    if (el.producto === compra.nombre) {
                        el.cantidades += parseInt(cantidad);
                        el.precioFinal += precioParcial;
                    }
                }
            } else {
                carrito.push({
                    cantidades: parseInt(cantidad),
                    producto: compra.nombre,
                    precioFinal: precioParcial,
                    precioIndividual: precio,
                    imagen: compra.imagen,
                });
            }

            Toastify({
                text: `Agregaste ${cantidad} productos a tu carrito`,
                className: "info",
                duration: 1000,
                style: {
                    background: "#D74E09",
                    borderRadius: "30px",
                }

            }).showToast();
        }

    }
}

let contadorIcono = document.getElementById("contador")

function contadorCarritoIcono() { 
   contadorCarrito = carrito.length;

   contadorIcono.innerText = `${contadorCarrito}`;
}

const botonReset = () => {
    carrito.splice(0, carrito.length)
}




const buscadorPorPrecio = () => {
    let precioMinimo = prompt("Indique el precio mínimo")
    let precioMaximo = prompt("Indique el precio máximo")
    buscador = stock.filter((num) => num.precio <= precioMaximo && num.precio >= precioMinimo);
    buscador.forEach((el) => alert(`${el.nombre} se adecua a tu búsquedas`))
    if (buscador.length == 0) {
        alert("No hay ningún producto que se adecue a tu búsqueda")
    }

}




// Botones de compra/ agregar a carrito





// EVENTOS


// Cargar Página

window.onload = () => {
    let productoCarritoGuardado = localStorage.getItem("productosCarritoStorage");
    if (productoCarritoGuardado != null) {
        productoCarritoGuardado = JSON.parse(productoCarritoGuardado);
        carritoProductosElegidos.innerHTML = `${productoCarritoGuardado}`;
        final.push(productoCarritoGuardado);

    }

    let carritoGuardado = localStorage.getItem("carritoStorage");
   

        carritoGuardado = JSON.parse(carritoGuardado);
        
        if (carritoGuardado != undefined){
            
           
               
        for (let i = 0; i < carritoGuardado.length; i++) {
            for (let e of stock) {
                if (carritoGuardado[i].producto === e.nombre) {

                    e.cantidad = e.cantidad - carritoGuardado[i].cantidades;

                    e.cantidad === 0 ? e.stock = "no" : e.stock = "si"

                    carrito.push(carritoGuardado[i]);


                    final.push(`<div class="d-flex justify-content-between muestrarioCarrito align-items-center"><img src=${e.imagen} alt="..." class= "imagenEnCarrito"> <div class="productosEnCarrito">    <h3 class= "nombreProductoEnCarrito">${e.nombre}</h3> <div class="sumadorCarrito"><button class="botonCarritoIngresado botonMenosCarrito">-</button> <p>${carrito[i].cantidades}</p>  <button class="botonCarritoIngresado botonMasCarrito">+</button> </div><p>${carrito[i].precioFinal}$</p></div></div>`);
                    carritoProductosElegidos.innerHTML = `${final.join("")}`;

                }
            }

        }

        subtotal() != 0 && (carritoSubtotal.innerHTML = `<div class="d-flex justify-content-around subtotalEnCarrito"> Subtotal = ${subtotal()}$ </div><div class= "d-flex justify-content-center divCompletarCompra"><button type="button" class="btn btn-primary boton6" id="botonCompletarCompra">Completar compra</button><button type="button" class="btn btn-primary boton7" id="botonDescuento">Código de descuento</button>`);
    }

    let productoGuardadoEnStorage = localStorage.getItem("productosNuevos");



    if (productoGuardadoEnStorage != undefined) {

        productoGuardadoEnStorage = JSON.parse(productoGuardadoEnStorage);
        productoNuevo = new Prendas(productoGuardadoEnStorage["nombre"], productoGuardadoEnStorage["tipo"], productoGuardadoEnStorage["talle"], productoGuardadoEnStorage["categoria"], productoGuardadoEnStorage["precio"], productoGuardadoEnStorage["cantidad"], productoGuardadoEnStorage["imagen"]);
        stock.push(productoNuevo);

        tarjetanueva.setAttribute("class", "card col-4");
        tarjetanueva.setAttribute("style", "width: 18rem");
        tarjetanueva.innerHTML = `
     <img
       src="${productoGuardadoEnStorage["imagen"]}"
       class="card-img-top imagenProductos" alt="...">
     <div class="card-body d-flex justify-content-between align-items-center">
       <p class="card-text ventaProducto">${productoGuardadoEnStorage["nombre"]}</p>
       <input type="number" class="botonCantidad" value="0">
       <input type="button" value="Boton" class="boton btn-primary" name="Agregar">
     </div>`;

        padreTarjeta.appendChild(tarjetanueva);
    }


    let usuarioGuardadoEnStorage = localStorage.getItem("usuarioNuevo");

    if (usuarioGuardadoEnStorage != undefined) {

        usuarioGuardadoEnStorage = JSON.parse(usuarioGuardadoEnStorage);

        usuarioNuevo = new Registrar(usuarioGuardadoEnStorage["nombre"], usuarioGuardadoEnStorage["edad"], usuarioGuardadoEnStorage["mail"], usuarioGuardadoEnStorage["contraseña"])
        usuarios.push(usuarioNuevo)

    }

    let usuarioIngresadoStorage = localStorage.getItem("usuarioIngresado")

    if (usuarioIngresadoStorage != undefined) {

        usuarioIngresadoStorage === "si" && (linkCargaProducto.style.display = "block");
        let saludoDeStorage = JSON.parse(localStorage.getItem("saludo"));
        saludo[0].style.display = "block";
        saludo[0].innerText = `${saludoDeStorage}`
        saludo[0].style.display === "block" && (formularioIngreso.innerHTML = `<h3> Ya has ingresado a tu cuenta</h3>`)

    }
}

    




// Agregar productos a carrito


// EMPARENTAMIENTO DOM

let botonCarrito = document.querySelectorAll(".boton");
let ventaProducto = document.querySelectorAll(".ventaProducto");
let botonCantidad = document.querySelectorAll(".botonCantidad");
let listaContador = document.querySelectorAll(".listaContador");
let seccionPrecio = document.querySelectorAll(".precios")
let final = [];
let subtotalPantalla = document.getElementById("subtotal");
let iconoCuenta = document.getElementById("iconoCuenta");
let formularioIngreso = document.getElementById("formulario");
let contenedorForm = document.getElementById("contenedorForm");
let botonSubmit = document.getElementsByClassName("boton2");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("contraseña");
let linkCargaProducto = document.getElementById("linkCargaProducto");
let imagenProductos = document.getElementsByClassName("imagenProductos")



for (let i = 0; i < stock.length; i++) {

    botonCarrito[i].addEventListener("click", agregarCarrito);

    function agregarCarrito() {
        if (stock[i].cantidad >= 1 && stock[i].cantidad >= botonCantidad[i].value) {
            botonCompra(stock[i], botonCantidad[i].value);
            if (botonCantidad[i].value > 0) {
                final.length = 0;
                for (let el of carrito) {

                    final.push(`<div class="d-flex justify-content-between muestrarioCarrito align-items-center"><img src=${el.imagen} alt="..." class= "imagenEnCarrito"> <div class="productosEnCarrito">    <h3 class= "nombreProductoEnCarrito">${el.producto}</h3> <div class="sumadorCarrito"><button class="botonCarritoIngresado botonMenosCarrito">-</button> <p>${el.cantidades}</p>  <button class="botonCarritoIngresado botonMasCarrito">+</button> </div><p>${el.precioFinal}$</p></div></div>`);


                    carritoProductosElegidos.innerHTML = `${final.join("")}`;
                    carritoSubtotal.innerHTML = null;
                    carritoSubtotal.innerHTML = `<div class="d-flex justify-content-around subtotalEnCarrito"> Subtotal = ${subtotal()}$ </div><div class= "d-flex justify-content-center divCompletarCompra"><button type="button" class="btn btn-primary boton6" id="botonCompletarCompra">Completar compra</button><button type="button" class="btn btn-primary boton7" id="botonDescuento">Código de descuento</button>`;




                    textoCarritoVacio[0].innerHTML = carrito[0] != undefined && `Mi pedido`;
                    carritoProductosElegidos.style.overflowY = "scroll";
                    // let ProductosCarritoStorage = JSON.stringify(carritoProductosElegidos.innerHTML);
                    // guardarStorage("productosCarritoStorage", ProductosCarritoStorage);
                    let carritoStorage = JSON.stringify(carrito);
                    guardarStorage("carritoStorage", carritoStorage);
                    contadorCarritoIcono();



                }
            }
        } else {

            ventaProducto[i].innerHTML = `${ventaProducto[i].innerHTML} <p>Fuera de stock</p> <br> Stock: ${stock[i].cantidad}`

        }


    }

}

let iconoCarrito = document.getElementById("iconoCarrito");
let productosEnCarrito = document.getElementById("posBotonCarrito");
let textoCarritoVacio = document.getElementsByClassName("carritoVacio");
let carritoProductosElegidos = document.getElementById("carritoProductosElegidos");
let carritoSubtotal = document.getElementById("carritoSubtotal");
let botonMenosCarrito = document.getElementsByClassName("botonMenosCarrito");
let botonMasCarrito = document.getElementsByClassName("botonMasCarrito");
let nombreProductoEnCarrito = document.getElementsByClassName("nombreProductoEnCarrito");
let cantidadesEnCarrito = document.querySelectorAll(".cantidadesEnCarrito");
let botonDescuento = document.getElementsByClassName("boton7");
let carritoAplicarDescuento = document.getElementById("carritoAplicarDescuento");
let botonVolverDescuento = document.getElementById("botonVolverDescuento");
let codigoDescuento = document.getElementById("codigoDescuento");
let botonAplicarDescuento = document.getElementById("botonAplicarDescuento");
let intervalo;
let botonCambioPagina = document.getElementById("switch");
// let body = document.getElementsByTagName("body");
// let header = document.getElementsByClassName("header");
// let main = document.getElementsByName("main");


// botonCambioPagina.onclick = () =>{
//     if (botonCambioPagina.checked === true){
//     body[0].setAttribute("id","body_kids");
//     header[0].classList.add("header_kids");
//     main[0].classList.add("productos_kids")


   
// }  else{
//     body[0].classList.remove("header_kids")
//     header[0].classList.remove("header_kids");
// } 

// }

iconoCarrito.onclick = () => {

    if (productosEnCarrito.style.display === "none") {
        productosEnCarrito.style.display = "block";
        contenedorForm.style.display = "none";
        let botonFinalizarCompra = document.getElementsByClassName("boton6");


        if (carrito[0] != undefined) {
            textoCarritoVacio[0].innerHTML = `Mi pedido`;
            carritoProductosElegidos.style.overflowY = "scroll";

        }

       

         intervalo = setInterval(() => {
            if (subtotal() != 0) {

                for (let i = 0; i < carrito.length; i++) {

                    botonMasCarrito[i].onclick = () => {

                        for (let el of carrito) {

                            if (el.producto === nombreProductoEnCarrito[i].innerText) {
                                el.cantidades += 1;
                                el.precioFinal = el.precioIndividual * el.cantidades;

                                let nuevo = (`<div class="d-flex justify-content-between muestrarioCarrito align-items-center"><img src=${el.imagen} alt="..." class= "imagenEnCarrito"> <div class="productosEnCarrito">    <h3 class= "nombreProductoEnCarrito">${el.producto}</h3> <div class="sumadorCarrito"><button class="botonCarritoIngresado botonMenosCarrito">-</button> <p>${el.cantidades}</p>  <button class="botonCarritoIngresado botonMasCarrito">+</button> </div><p>${el.precioFinal}$</p></div></div>`);
                                final.splice(i, 1, nuevo);
                                carritoProductosElegidos.innerHTML = `${final.join("")}`;
                                carritoSubtotal.innerHTML = null;
                                carritoSubtotal.innerHTML = `<div class="d-flex justify-content-around subtotalEnCarrito"> Subtotal = ${subtotal()}$ </div> <div class= "d-flex justify-content-center divCompletarCompra"><button type="button" class="btn btn-primary boton6" id="botonCompletarCompra">Completar compra</button><button type="button" class="btn btn-primary boton7" id="botonDescuento">Código de descuento</button>`;




                                textoCarritoVacio[0].innerHTML = carrito[0] != undefined && `Mi pedido`;
                                // let ProductosCarritoStorage = JSON.stringify(carritoProductosElegidos.innerHTML);
                                // guardarStorage("productosCarritoStorage", ProductosCarritoStorage);
                                let carritoStorage = JSON.stringify(carrito);
                                guardarStorage("carritoStorage", carritoStorage)



                            }
                        }

                        

                    }
                    


                    botonMenosCarrito[i].onclick = () => {

                        for (let el of carrito) {
                            if (el.producto === nombreProductoEnCarrito[i].innerText) {
                                el.cantidades -= 1;
                                el.precioFinal = el.precioFinal - el.precioIndividual;
                                

                                if (el.cantidades <= 0) {

                                    final.splice(i, 1);
                                    carritoProductosElegidos.innerHTML = `${final.join("")}`;
                                    carrito.splice(i, 1);
                                    contadorCarritoIcono();
                                   
                                    if (carrito[0] === undefined) {

                                        textoCarritoVacio[0].innerHTML = `Aún no contas con ningún producto en tu carrito`
                                        carritoSubtotal.innerHTML = null;

                                        localStorage.removeItem("carritoStorage");
                                        localStorage.removeItem("productosCarritoStorage");
                                        

                                    }
                                    if (carrito[0] != undefined) {
                                        // let ProductosCarritoStorage = JSON.stringify(carritoProductosElegidos.innerHTML);
                                        // guardarStorage("productosCarritoStorage", ProductosCarritoStorage);
                                        let carritoStorage = JSON.stringify(carrito);
                                        guardarStorage("carritoStorage", carritoStorage)

                                        carritoSubtotal.innerHTML = null;
                                carritoSubtotal.innerHTML = `<div class="d-flex justify-content-around subtotalEnCarrito"> Subtotal = ${subtotal()}$ </div><div class= "d-flex justify-content-center divCompletarCompra"><button type="button" class="btn btn-primary boton6" id="botonCompletarCompra">Completar compra</button><button type="button" class="btn btn-primary boton7" id="botonDescuento">Código de descuento</button>`;
                                    }
                                } else {

                                    let nuevo = (`<div class="d-flex justify-content-between muestrarioCarrito align-items-center"><img src=${el.imagen} alt="..." class= "imagenEnCarrito"> <div class="productosEnCarrito">    <h3 class= "nombreProductoEnCarrito">${el.producto}</h3> <div class="sumadorCarrito"><button class="botonCarritoIngresado botonMenosCarrito">-</button> <p>${el.cantidades}</p>  <button class="botonCarritoIngresado botonMasCarrito">+</button> </div><p>${el.precioFinal}$</p></div></div>`);
                                    final.splice(i, 1, nuevo);
                                    carritoProductosElegidos.innerHTML = `${final.join("")}`;
                                    carritoSubtotal.innerHTML = null;
                                    carritoSubtotal.innerHTML = `<div class="d-flex justify-content-around subtotalEnCarrito"> Subtotal = ${subtotal()}$ </div><div class= "d-flex justify-content-center divCompletarCompra"><button type="button" class="btn btn-primary boton6" id="botonCompletarCompra">Completar compra</button><button type="button" class="btn btn-primary boton7" id="botonDescuento">Código de descuento</button>`;

                                    textoCarritoVacio[0].innerHTML = (carrito[0] != undefined && `Mi pedido`);
                                    // let ProductosCarritoStorage = JSON.stringify(carritoProductosElegidos.innerHTML);
                                    // guardarStorage("productosCarritoStorage", ProductosCarritoStorage);
                                    let carritoStorage = JSON.stringify(carrito);
                                    guardarStorage("carritoStorage", carritoStorage)

                                }
                                
                            }
                        }


                    }


                }
                if (subtotal() != 0) {
                    botonFinalizarCompra[0].onclick = () => {
                        Swal.fire({
                            title: '¡PRONTO PODRÁS COMPLETAR EL PROCESO!',
                            width: 600,
                            padding: '3em',
                            confirmButtonColor: `#D74E09`,
                            color: '#FFFFFF',
                            background: '#D74E09',
                            backdrop: `
                              rgba(0,0,123,0.1)
                              left top
                              no-repeat
                            `
                          })

                    }

                    botonDescuento[0].onclick = () => {
                        carritoProductosElegidos.style.display = "none";
                        carritoSubtotal.style.display = "none";
                        carritoAplicarDescuento.style.display = "block";
                        textoCarritoVacio[0].innerHTML = `Descuento`;

                        botonVolverDescuento.onclick = () => {
                            carritoProductosElegidos.style.display = "block";
                            carritoSubtotal.style.display = "block";
                            carritoAplicarDescuento.style.display = "none";
                            textoCarritoVacio[0].innerHTML = `Mi pedido`;
                            
                        }

                        botonAplicarDescuento.onclick = () => {
                            let codigoIngresado = (codigoDescuento.value).toLowerCase();

                            descuento(codigoIngresado);

                            if (subtotal() != total) {
                                Swal.fire({
                                    position: 'top',
                                    icon: 'success',
                                    title: `¡Descuento aplicado con éxito! El total es de: ${total}`,
                                    showConfirmButton: false,
                                    timer: 3000,
                                    background: '#D74E09',
                                    color: '#FFFFFF'
                                })


                                carritoSubtotal.innerHTML = `<div class="d-flex justify-content-around subtotalEnCarrito"> Total = ${total}$ </div><div class= "d-flex justify-content-center divCompletarCompra"><button type="button" class="btn btn-primary boton6" id="botonCompletarCompra">Completar compra</button>`;
                            }
                            carritoProductosElegidos.style.display = "block";
                            carritoSubtotal.style.display = "block";
                            carritoAplicarDescuento.style.display = "none";
                            textoCarritoVacio[0].innerHTML = `Mi pedido`;
                        }


                    }

                }
            }
        }, 0)


    } else {
        productosEnCarrito.style.display = "none";
        

    }
}



const descuento = (codigo) => {
    if (codigo === "hipocampo") {
        total = subtotal() - porcentaje10(subtotal())
    } else if (codigo === "bolso") {
        total = subtotal() - porcentaje25(subtotal())
    } else {
        total = parseInt(subtotal());
    }
};




// CIERRE CARRITO/USUARIO

let cruzDeCierre = document.getElementsByClassName("cruzCierre");


for (let i = 0; i < cruzDeCierre.length; i++) {
    cruzDeCierre[i].onclick = (e) => {
        e.preventDefault();
        productosEnCarrito.style.display = "none";
        contenedorForm.style.display = "none";

        if (formularioDeRegistro.style.display === "block") {
            formularioDeRegistro.style.display = "none";
            formularioIngreso.style.display = "block";
            usuariosTitulo.innerText = "Ingreso a cuenta";
        }
    }
}

cruzDeCierre[5].onclick = () => {

    ventanaCargaProducto.style.display = "none";


}




// CARGAR PRODUCTO


// Enlace con DOM


let cargarProducto = document.getElementById("cargarProducto");
let ventanaCargaProducto = document.getElementById("ventanaCargaProducto");
let formularioCargaProducto = document.getElementById("formularioCargaProducto");
let botonCargaProducto = document.getElementById("botonCargaProducto");
let DatosCarga;
let contador = 0;
let tarjetanueva = document.createElement("div");
let padreTarjeta = document.getElementById("padreTarjeta");



// REGISTRAR USUARIO

let botonRegistrarme = document.getElementsByClassName("boton3");
let formularioDeRegistro = document.getElementById("formularioDeRegistro");
let formRegistrarse = document.getElementById("formRegistrarse");
let botonCompletarRegistro = document.getElementsByClassName("boton4");
let usuariosTitulo = document.getElementById("usuariosTitulo");

let botonVolverRegistrarse = document.getElementsByClassName("boton5")


botonRegistrarme[0].onclick = (e) => {

    e.preventDefault();

    formularioIngreso.style.display = "none";
    formularioDeRegistro.style.display = "block";
    usuariosTitulo.innerText = "Registro de cuentas"

    botonVolverRegistrarse[0].onclick = () => {
        usuariosTitulo.innerText = "Ingreso a cuenta";
        formularioIngreso.style.display = "block";
        formularioDeRegistro.style.display = "none";
    }

    formRegistrarse.onsubmit = (el) => {
        el.preventDefault;

        let datosUsuarioNuevo = el.target;

        const usuarioNuevo = new Registrar((datosUsuarioNuevo[0].value).toLowerCase(), datosUsuarioNuevo[1].value, datosUsuarioNuevo[2].value, (datosUsuarioNuevo[3].value).toLowerCase());

        let usuarioNuevoStorage = JSON.stringify(usuarioNuevo);
        guardarStorage("usuarioNuevo", usuarioNuevoStorage);


        usuarios.push(usuarioNuevo);
        usuariosTitulo.innerText = "Ingreso a cuenta";
        formularioIngreso.style.display = "block";
        formularioDeRegistro.style.display = "none";


    }


}




// INGRESO DE USUARIO

let recordarmeIngreso = document.getElementById("recordarmeIngreso");
let saludo = document.getElementsByClassName("saludo");


iconoCuenta.onclick = () => {
    if (contenedorForm.style.display === "none") {
        contenedorForm.style.display = "block";
        productosEnCarrito.style.display = "none";

        if(linkCargaProducto.style.display === "block"){
        formularioIngreso.innerHTML = `<h3> Ya has ingresado a tu cuenta</h3>`;
    }
        formularioIngreso.onsubmit = (e) => {
            e.preventDefault();
            let usuarioId = (usuario.value).toLowerCase();
            let contraseñaId = (contraseña.value).toLowerCase();
            let ingreso = usuarios.some((el) => (el.nombre).toLowerCase() === usuarioId && (el.contraseña).toLowerCase() === contraseñaId);

            if (ingreso === true){

            linkCargaProducto.style.display = "block";
            formularioIngreso.innerHTML = `<h3> Ya has ingresado a tu cuenta</h3>`;
            contenedorForm.style.display = "none";
            saludo[0].style.display = "block";

            saludo[0].innerText = `${saludo[0].innerText} ${usuarioId}`

            if (recordarmeIngreso.checked === true && ingreso === true) {
                guardarStorage("usuarioIngresado", "si");
                let saludoStorage = JSON.stringify(saludo[0].innerText)
                guardarStorage("saludo", saludoStorage)
            }

        }}
    } else {
        contenedorForm.style.display = "none";
    }
}



// CARGAR PRODUCTOS



cargarProducto.onclick = () => {
    ventanaCargaProducto.style.display = "block";

    formularioCargaProducto.onsubmit = (e) => {

        e.preventDefault();

        DatosCarga = e.target;


        let nombre = DatosCarga[0].value;
        let tipo = DatosCarga[1].value;
        let talle = DatosCarga[2].value;
        let categoria = DatosCarga[3].value;
        let precio = DatosCarga[4].value;
        let cantidad = DatosCarga[5].value;
        let imagen = DatosCarga[6].value;




        productoNuevo = new Prendas(nombre, tipo, talle, categoria, parseInt(precio), parseInt(cantidad), imagen);
        stock.push(productoNuevo);

        tarjetanueva.setAttribute("class", "card col-4");
        tarjetanueva.setAttribute("style", "width: 18rem");
        tarjetanueva.innerHTML = `<div class="card col-4" style="width: 18rem;">
     <img
       src="${imagen}"
       class="card-img-top imagenProductos" alt="...">
     <div class="card-body d-flex justify-content-between align-items-center">
       <p class="card-text ventaProducto">${nombre}</p>
       <input type="number" class="botonCantidad" value="0">
       <input type="button" value="Boton" class="boton btn-primary" name="Agregar">
     </div>
   </div>`;

        padreTarjeta.appendChild(tarjetanueva);


        let productoNuevoStorage = JSON.stringify(productoNuevo);
        guardarStorage("productosNuevos", productoNuevoStorage);
        ventanaCargaProducto.style.display = "none";
        location.reload();

    }


}


// Buscador Por nombre

let botonesBuscadorPorNombre = document.getElementsByClassName("botonesBuscadorPorNombre");
let nombreBuscadorPorNombre = document.getElementsByClassName("nombreBuscadorPorNombre");
let cardsCreadas = document.getElementsByClassName("card");
let cardsTexto = document.getElementsByClassName("card-text");
let click = 0;


function eliminarAcentos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}



for (let i = 0; i < botonesBuscadorPorNombre.length; i++) {


    botonesBuscadorPorNombre[i].onchange = () => {

        if (botonesBuscadorPorNombre[i].checked === true) {

            let textoBuscador = eliminarAcentos((nombreBuscadorPorNombre[i].textContent).toLowerCase());
            click += 1;

            for (let o = 0; o < botonesBuscadorPorNombre.length; o++) {

                botonesBuscadorPorNombre[i] != botonesBuscadorPorNombre[o] && (botonesBuscadorPorNombre[o].checked = null);

            }

            for (let o = 0; o < cardsTexto.length; o++) {
                cardsCreadas[o].style.display = "none";
                let textoCard = eliminarAcentos((cardsTexto[o].textContent).toLowerCase());


                stock.forEach((el) => {

                    (el.nombre === textoCard && el.categoria === textoBuscador) && (cardsCreadas[o].style.display = "flex")

                })
            }
        } else {
            for (let o = 0; o < cardsTexto.length; o++) {

                cardsCreadas[o].style.display = "flex";

            }
        }




    }
}

let textoBarraFinalHeader = document.querySelectorAll(".textoBarraFinalHeader")

textoBarra = () => {

    if (textoBarraFinalHeader[0].id === "activo") {
        textoBarraFinalHeader[0].removeAttribute(`id`);
        textoBarraFinalHeader[1].id = "activo";
    } else if (textoBarraFinalHeader[1].id === "activo") {
        textoBarraFinalHeader[1].removeAttribute(`id`);
        textoBarraFinalHeader[2].id = "activo";
    } else if (textoBarraFinalHeader[2].id === "activo") {
        textoBarraFinalHeader[2].removeAttribute(`id`);
        textoBarraFinalHeader[0].id = "activo";
    }


}

setInterval(() => {
    textoBarra()
}, 4000)