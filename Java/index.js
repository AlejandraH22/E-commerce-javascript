class Prendas {
    constructor(nombre, tipo, talle, categoria, precio, cantidad) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.talle = talle;
        this.categoria = categoria;
        this.precio = precio;
        this.cantidad = cantidad;
        if (this.cantidad > 0) {
            this.stock = "si";
        } else {
            this.stock = "no"
        }
    }
}

const remeraGris = new Prendas("remera gris", "manga corta", "xxl", "remeras", 1500, 25);
const remeraAzul = new Prendas("remera azul", "manga corta", "xl", "remeras", 2500, 42);
const remeraRoja = new Prendas("remera roja", "manga larga", "m", "remeras", 1800, 35)
const jeanNegro = new Prendas("jean negro", "al cuerpo", "40", "jeans", 4000, 33);
const jeanCeleste = new Prendas("jean celeste", "holgado", "42", "jeans", 6000, 0);
const pantalonGamuza = new Prendas("pantalon de gamuza", "3/4", "38 y 1/2", "pantalones", 1200, 50);
const pantalonLargo = new Prendas("pantalon largo", "pantalon", "40", "pantalones", 8000, 81);
const bermuda = new Prendas("bermuda", "pantalon corto", "40", "pantalones", 3500, 25)
const poleraBeige = new Prendas("polera beige", "manga larga", "xl", "polera", 7500, 40);


const stock = [
    remeraGris,
    remeraAzul,
    remeraRoja,
    jeanNegro,
    jeanCeleste,
    pantalonGamuza,
    pantalonLargo,
    bermuda,
    poleraBeige
];




const carrito = [];
const subtotal = () => carrito.reduce((acc, el) => acc + el.precio, 0);
let total = subtotal;


// Funciones


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




// EVENTOS

// Botones de compra/ agregar a carrito

for (let i = 0; i < stock.length; i++) {
    botonCarrito[i].addEventListener("click", agregarCarrito)

    function agregarCarrito() {
        botonCompra(stock[i], botonCantidad[i].value);
        if (stock[i].stock === "si") {
            if (botonCantidad[i].value > 0) {
                let productoComprado = stock[i].nombre;
                let cantidadComprada = botonCantidad[i].value;
                let precioComprado = stock[i].precio;
                final.push(`<div class="d-flex justify-content-around recuadro"> <p>${productoComprado}</p> <p>${cantidadComprada}</p> <p>${precioComprado}</p> </div>`);
                final.join();

                return seccionPrecio[0].innerHTML = `${final} ${subtotalPantalla.innerHTML = `<div class="recuadro d-flex justify-content-end"> Subtotal = ${subtotal()}`} </div>`
            }
        } else {
            ventaProducto[i].innerHTML = `${ventaProducto[i].innerHTML} <p>Fuera de stock</p>`
        }
    }
}

iconoCuenta.onclick = () => {

    contenedorForm.style.display = "block";


    formularioIngreso.onsubmit = (e) => {
        e.preventDefault();
        let usuarioId = usuario.value;
        let contraseñaId = contraseña.value;
        if (usuarioId === "Nano" && contraseñaId === "1234") {
            
            linkCargaProducto.style.display = "block";
        }
    }

}


// CARGAR PRODUCTO


// Enlace con DOM


let cargarProducto = document.getElementById("cargarProducto");
let ventanaCargaProducto = document.getElementById("ventanaCargaProducto");
let formularioCargaProducto = document.getElementById("formularioCargaProducto");
let botonCargaProducto = document.getElementById("botonCargaProducto");
let DatosCarga;
let datosi = [];




// EVENTOS

cargarProducto.onclick = () => {
  ventanaCargaProducto.style.display = "block";
 
  formularioCargaProducto.onsubmit = (e) =>{
    DatosCarga = e.target;
    let nombreStock = (DatosCarga[0].value).replace(" ", "");
 
   for (let i = 0; i < DatosCarga.length; i++){
       datosi.push(DatosCarga[i].value)
} 
 nombreStock = new Prendas (datosi);
 }

}






// let consulta = (prompt("desea realizar una compra")).toLowerCase();

// while (consulta === "si") {
//     let prenda = (prompt("que prenda desea comprar")).toLowerCase();
//     let verdadero = stock.some((el) => el.nombre === prenda);
//     let cantidadPrenda = parseInt(prompt("Cuantas prendas desea comprar"));
//     if (verdadero === true) {
//         for (let el of stock) {
//             if (el.nombre === prenda) {
//                 if (el.cantidad > cantidadPrenda) {
//                     botonCompra(el, cantidadPrenda);

//                     alert(`agregaste ${el.nombre} a tu carrito`)
//                 } else {
//                     alert(`solo contamos con ${el.cantidad} prendas de este tipo`)
//                 }
//             }
//         }
//     } else {
//         alert("No contamos con ese producto")
//     }
//     consulta = prompt("desea realizar otra compra")
// };

// let consulta2 = (prompt("Querés saber cuantos productos estas llevando carrito")).toLowerCase();

// if (consulta2 === "si") {

//     let cantidad = carrito.reduce((acc, el) => acc + parseInt(el.cantidades), 0);
//     alert(`Llevás en tu carrito ${cantidad} productos con un total de ${subtotal()}$`);

// }

// let consulta4 = (prompt(`Desea eliminar algún producto de su carrito`)).toLowerCase();

// while (consulta4 === "si") {

//     let prenda = (prompt("Qué prenda desea eliminar")).toLowerCase();
//     let verdadero = carrito.some((el) => el.producto === prenda);

//     let cantidadPrenda = parseInt(prompt("Cuanta cantidad"));
//     let verdadero2 = carrito.some((el) => el.cantidades >= cantidadPrenda);
//     if (verdadero === true) {
//         if (verdadero2 === true) {
//             for (let el of stock) {
//                 if (prenda === el.nombre && el.cantidades >= cantidadPrenda) {

//                     botonQuitarCompra(el, cantidadPrenda);
//                     alert(`sacaste ${cantidadPrenda} ${prenda} de tu carrito`)

//                     let cantidad = carrito.reduce((acc, el) => acc + parseInt(el.cantidades), 0);
//                     alert(`Ahora llevás en tu carrito ${cantidad} productos con un total de ${subtotal()}$`);

//                 }
//             }
//         } else {
//             alert("No contas con esa cantidad de producto en tu carrito")
//         }
//     } else {
//         alert("Ese producto no se encuentra en el carrito")
//     }
//     consulta4 = (prompt("Desea eliminar otro producto")).toLowerCase()
// }

// let consulta3 = (prompt("queres aplicar algún descuento")).toLowerCase();

// if (consulta3 === "si") {

//     let codigo = (prompt("Decinos tu código de descuento")).toLowerCase();

//     descuento(codigo);


//     if (total != subtotal()) {
//         alert(`Tu monto anterior era de ${subtotal()}$`)
//         alert(`Tu monto con el descuento es del ${total}$`)
//     } else {
//         alert(`El codigo no es válido`)
//     }
// }






// let consulta = (prompt("desea realizar una compra")).toLowerCase();

// while (consulta === "si") {
//     let prenda = (prompt("que prenda desea comprar")).toLowerCase();
//     let verdadero = stock.some((el) => el.nombre === prenda);
//     let cantidadPrenda = parseInt(prompt("Cuantas prendas desea comprar"));
//     if (verdadero === true) {
//         for (let el of stock) {
//             if (el.nombre === prenda) {
//                 if (el.cantidad > cantidadPrenda) {
//                     botonCompra(el, cantidadPrenda);

//                     alert(`agregaste ${el.nombre} a tu carrito`)
//                 } else {
//                     alert(`solo contamos con ${el.cantidad} prendas de este tipo`)
//                 }
//             }
//         }
//     } else {
//         alert("No contamos con ese producto")
//     }
//     consulta = prompt("desea realizar otra compra")
// };

// let consulta2 = (prompt("Querés saber cuantos productos estas llevando carrito")).toLowerCase();

// if (consulta2 === "si") {

//     let cantidad = carrito.reduce((acc, el) => acc + parseInt(el.cantidades), 0);
//     alert(`Llevás en tu carrito ${cantidad} productos con un total de ${subtotal()}$`);

// }

// let consulta4 = (prompt(`Desea eliminar algún producto de su carrito`)).toLowerCase();

// while (consulta4 === "si") {

//     let prenda = (prompt("Qué prenda desea eliminar")).toLowerCase();
//     let verdadero = carrito.some((el) => el.producto === prenda);

//     let cantidadPrenda = parseInt(prompt("Cuanta cantidad"));
//     let verdadero2 = carrito.some((el) => el.cantidades >= cantidadPrenda);
//     if (verdadero === true) {
//         if (verdadero2 === true) {
//             for (let el of stock) {
//                 if (prenda === el.nombre && el.cantidades >= cantidadPrenda) {

//                     botonQuitarCompra(el, cantidadPrenda);
//                     alert(`sacaste ${cantidadPrenda} ${prenda} de tu carrito`)

//                     let cantidad = carrito.reduce((acc, el) => acc + parseInt(el.cantidades), 0);
//                     alert(`Ahora llevás en tu carrito ${cantidad} productos con un total de ${subtotal()}$`);

//                 }
//             }
//         } else {
//             alert("No contas con esa cantidad de producto en tu carrito")
//         }
//     } else {
//         alert("Ese producto no se encuentra en el carrito")
//     }
//     consulta4 = (prompt("Desea eliminar otro producto")).toLowerCase()
// }

// let consulta3 = (prompt("queres aplicar algún descuento")).toLowerCase();

// if (consulta3 === "si") {

//     let codigo = (prompt("Decinos tu código de descuento")).toLowerCase();

//     descuento(codigo);


//     if (total != subtotal()) {
//         alert(`Tu monto anterior era de ${subtotal()}$`)
//         alert(`Tu monto con el descuento es del ${total}$`)
//     } else {
//         alert(`El codigo no es válido`)
//     }
// }