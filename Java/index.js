const carrito = [];
const subtotal = () => carrito.reduce((acc, el) => acc + el.precio, 0);
let total = subtotal;


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
            let precioParcial = compra.precio * cantidad;
            let buscador = carrito.some((el) => el.producto === compra.nombre);
            if (buscador === true) {
                for (let el of carrito) {
                    if (el.producto === compra.nombre) {
                        el.cantidades += parseInt(cantidad);
                        el.precio += precioParcial;
                    }
                }
            } else {
                carrito.push({
                    cantidades: parseInt(cantidad),
                    producto: compra.nombre,
                    precio: precioParcial
                });
            }
        }

    }
}





const botonQuitarCompra = (quita, cantidad) => {
    let precioParcial = quita.precio * cantidad;
    quita.cantidad = quita.cantidad + cantidad;
    if (quita.cantidad > 0) {
        quita.stock = "si";
    } else {
        quita.stock = "no"
    }
    for (let el of carrito) {
        if (quita.nombre === el.producto) {
            el.cantidades = el.cantidades - cantidad;
            el.precio = el.precio - precioParcial;
            if (el.cantidades === 0) {
                let indice = carrito.findIndex((elemento) => elemento.producto === el.producto);
                carrito.splice(indice, 1)
            }
        }
    }
}


const botonReset = () => {
    carrito.splice(0, carrito.length)
}

const descuento = (codigo) => {
    if (codigo === "remera") {
        total = subtotal() - porcentaje10(subtotal())
    } else if (codigo === "jeans") {
        total = subtotal() - porcentaje25(subtotal())
    } else {
        total = parseInt(subtotal());
    }
};


const buscadorPorPrecio = () => {
    let precioMinimo = prompt("Indique el precio mínimo")
    let precioMaximo = prompt("Indique el precio máximo")
    buscador = stock.filter((num) => num.precio <= precioMaximo && num.precio >= precioMinimo);
    buscador.forEach((el) => alert(`${el.nombre} se adecua a tu búsquedas`))
    if (buscador.length == 0) {
        alert("No hay ningún producto que se adecue a tu búsqueda")
    }

}


const buscadorPorPalabra = () => {
    let palabra = prompt("Diganos una categoría entre remeras, pantalones, jeans o polera");
    palabra = palabra.toLowerCase();
    if (palabra === "remeras" || palabra === "pantalones" || palabra === "jeans" || palabra === "polera") {
        let buscador = stock.filter((el) => el.categoria == palabra);
        buscador.forEach((el) => alert(el.nombre))
    } else {
        alert("No contamos con ningún producto con ese nombre")
    }
}

// Botones de compra/ agregar a carrito

// EMPARENTAMIENTO DOM

let botonCarrito = document.querySelectorAll(".boton");
let ventaProducto = document.querySelectorAll(".ventaProducto");
let botonCantidad = document.querySelectorAll(".botonCantidad");
let listaContador = document.querySelectorAll(".listaContador");
let seccionPrecio = document.querySelectorAll(".precios")
let final = [];
let subtotalPantalla = document.getElementById("subtotal");
let iconoCuenta = document.getElementById("cuenta");
let formularioIngreso = document.getElementById("formulario");
let contenedorForm = document.getElementById("contenedorForm");
let botonSubmit = document.getElementsByClassName("boton2");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("contraseña");
let linkCargaProducto = document.getElementById("linkCargaProducto");
let imagenProductos = document.getElementsByClassName("imagenProductos")




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

    if (carritoGuardado != undefined) {

        carritoGuardado = JSON.parse(carritoGuardado);


        for (let i = 0; i < carritoGuardado.length; i++) {
            for (let e of stock){
            if (carritoGuardado[i].producto === e.nombre) {
                
                e.cantidad = e.cantidad - carritoGuardado[i].cantidades;
                
                if (e.cantidad === 0){
                    e.stock = "no";
                }

                carrito.push(carritoGuardado[i]);

            }
        }

    }
    }
}


// Agregar productos a carrito


for (let i = 0; i < stock.length; i++) {

    botonCarrito[i].addEventListener("click", agregarCarrito);

    function agregarCarrito() {
        if (stock[i].cantidad >= 1 && stock[i].cantidad >= botonCantidad[i].value) {
            botonCompra(stock[i], botonCantidad[i].value);
            if (botonCantidad[i].value > 0) {
                final.length = 0;
                for (let el of carrito) {

                    final.push(`<div class="d-flex justify-content-between muestrarioCarrito align-items-center"><img src=${imagenProductos[i].src} alt="..." class= "imagenEnCarrito"> <div class="productosEnCarrito"> <h3>${el.producto}</h3> <p>${el.cantidades}</p> <p>${el.precio}$</p></div></div>`);

                    carritoProductosElegidos.innerHTML = `${final.join("")} <div class="d-flex justify-content-end"> Subtotal = ${subtotal()}$ </div> `;
                   

                    if (carrito[0] != undefined){

                        textoCarritoVacio[0].innerHTML = `Mi pedido`;
                        textoCarritoVacio[0].style.borderBottom = "solid 1px black"
                
                
                    }
                

                    let ProductosCarritoStorage = JSON.stringify(carritoProductosElegidos.innerHTML);
                    guardarStorage("productosCarritoStorage", ProductosCarritoStorage);
                    let carritoStorage = JSON.stringify(carrito);
                    guardarStorage("carritoStorage", carritoStorage)
                }
            }
        } else {

            ventaProducto[i].innerHTML = `${ventaProducto[i].innerHTML} <p>Fuera de stock</p> <br> Stock: ${stock[i].cantidad}`

        }


    }
}


let iconoCarrito = document.getElementById("carrito");
let productosEnCarrito = document.getElementById("posBotonCarrito");
let textoCarritoVacio = document.getElementsByClassName("carritoVacio");
let carritoProductosElegidos = document.getElementById("carritoProductosElegidos");


iconoCarrito.onclick = () =>{

    productosEnCarrito.style.display = "block";
    contenedorForm.style.display = "none";
    
    if (carrito[0] != undefined){

        textoCarritoVacio[0].innerHTML = `Mi pedido`;
        textoCarritoVacio[0].style.borderBottom = "solid 1px black"


    }


}





// CARGAR PRODUCTO


// Enlace con DOM


let cargarProducto = document.getElementById("cargarProducto");
let ventanaCargaProducto = document.getElementById("ventanaCargaProducto");
let formularioCargaProducto = document.getElementById("formularioCargaProducto");
let botonCargaProducto = document.getElementById("botonCargaProducto");
let DatosCarga;
let contador = 0;
let nombre2;
let tarjetanueva = document.createElement("div");
let padreTarjeta = document.getElementById("padreTarjeta")



// EVENTOS

iconoCuenta.onclick = () => {

    contenedorForm.style.display = "block";
    productosEnCarrito.style.display = "none";

    formularioIngreso.onsubmit = (e) => {
        e.preventDefault();
        let usuarioId = (usuario.value).toLowerCase();
        let contraseñaId = contraseña.value;
        if (usuarioId === "nano" && contraseñaId === "1234" || usuarioId === "stefano" && contraseñaId === "1234") {

            linkCargaProducto.style.display = "block";
        }
    }

}

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



        nombre2 = new Prendas(nombre, tipo, talle, categoria, parseInt(precio), parseInt(cantidad));


        tarjetanueva.innerHTML = `<div class="card col-4" style="width: 18rem;">
     <img
       src="${imagen}"
       class="card-img-top" alt="...">
     <div class="card-body d-flex justify-content-between align-items-center">
       <p class="card-text ventaProducto">${nombre}</p>
       <input type="number" class="botonCantidad" value="0">
       <input type="button" value="Boton" class="boton btn-primary" name="Agregar">
     </div>
   </div>`

        padreTarjeta.append(tarjetanueva);

        stock.push(nombre2);
        let nombre2Storage = JSON.stringify(nombre2);
        guardarStorage("ProductosNuevos", nombre2Storage);

    }


}