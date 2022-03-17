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
                        el.cantidades += cantidad;
                        el.precio += precioParcial;
                    }
                }
            } else {
                carrito.push({
                    cantidades: cantidad,
                    producto: compra.nombre,
                    precio: precioParcial
                });
            }
        } else {
            alert(`Solo contamos con ${compra.cantidad} prendas de este producto`);

        }

    } else {
        alert(`Solo contamos con ${compra.cantidad} prendas de este producto`);
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

let body = document.body;
let divPadre = document.querySelector(".divPadre");
let divHijo = document.querySelectorAll(".divHijo");
let producto = document.querySelectorAll(".nombre");
let descripcion = document.querySelectorAll(".descripcion");
let boton = document.querySelectorAll(".boton");
let divPadre2 = document.querySelectorAll(".divPadre2");
let compra = document.getElementById("compras");
let cantidad = document.querySelectorAll(".cantidad");
let precio = document.querySelectorAll(".precio");


// body.style.margin = "0";
// body.style.padding = "0";
// divPadre.style.display = "flex";
// divPadre.style.flexWrap = "wrap";
// divPadre.style.justifyContent = "space-around";


// const productoComprado = carrito.map ((el) =>{
//     let productoComprado = el.producto;
//       return `<li> ${productoComprado} </li>`;
//   })
// productoComprado.join("")
//   const cantidadComprada = carrito.map ((el) =>{
//      let cantidadComprada = el.cantidades;
//        return `<li> ${cantidadComprada} </li>`;
//    })
// cantidadComprada.join("")
//    const precioComprado = carrito.map ((el) =>{
//      let precioComprado = el.precio;
//        return `<li> ${precioComprado} </li>`;
//    })
// precioComprado.join("")



// for (let el of divHijo) {
//     el.style.margin = "2rem 4rem"
//     el.style.textAlign = "center"
//     el.style.fontFamily = "sans-serif"
// }


// for (let el of boton) {
//     el.style.backgroundColor = "#FF861C";
//     el.style.color = "white";
//     el.style.height = "3rem";
//     el.style.borderRadius = "30px";
//     el.style.border = "none";
//     el.style.fontSize = "large";
//     el.style.fontweigh = "bold";
//     el.style.boxShadow = "-2px 4px 10px 4px rgba(0,0,0,0.19);"
// }


let consulta = (prompt("desea realizar una compra")).toLowerCase();

while (consulta === "si") {
    let prenda = (prompt("que prenda desea comprar")).toLowerCase();
    let verdadero = stock.some((el) => el.nombre === prenda);
    let cantidadPrenda = parseInt(prompt("Cuantas prendas desea comprar"));
    if (verdadero === true) {
        for (let el of stock) {
            if (el.nombre === prenda) {
                if (el.cantidad > cantidadPrenda) {
                    botonCompra(el, cantidadPrenda);

                    alert(`agregaste ${el.nombre} a tu carrito`)
                } else {
                    alert(`solo contamos con ${el.cantidad} prendas de este tipo`)
                }
            }
        }
    } else {
        alert("No contamos con ese producto")
    }
    consulta = prompt("desea realizar otra compra")
};

let consulta2 = (prompt("Querés saber cuantos productos estas llevando carrito")).toLowerCase();

if (consulta2 === "si") {

    let cantidad = carrito.reduce((acc, el) => acc + parseInt(el.cantidades), 0);
    alert(`Llevás en tu carrito ${cantidad} productos con un total de ${subtotal()}$`);

}

let consulta4 = (prompt(`Desea eliminar algún producto de su carrito`)).toLowerCase();

while (consulta4 === "si") {

    let prenda = (prompt("Qué prenda desea eliminar")).toLowerCase();
    let verdadero = carrito.some((el) => el.producto === prenda);

    let cantidadPrenda = parseInt(prompt("Cuanta cantidad"));
    let verdadero2 = carrito.some((el) => el.cantidades >= cantidadPrenda);
    if (verdadero === true) {
        if (verdadero2 === true) {
            for (let el of stock) {
                if (prenda === el.nombre && el.cantidades >= cantidadPrenda) {

                    botonQuitarCompra(el, cantidadPrenda);
                    alert(`sacaste ${cantidadPrenda} ${prenda} de tu carrito`)

                    let cantidad = carrito.reduce((acc, el) => acc + parseInt(el.cantidades), 0);
                    alert(`Ahora llevás en tu carrito ${cantidad} productos con un total de ${subtotal()}$`);

                }
            }
        } else {
            alert("No contas con esa cantidad de producto en tu carrito")
        }
    } else {
        alert("Ese producto no se encuentra en el carrito")
    }
    consulta4 = (prompt("Desea eliminar otro producto")).toLowerCase()
}

let consulta3 = (prompt("queres aplicar algún descuento")).toLowerCase();

if (consulta3 === "si") {

    let codigo = (prompt("Decinos tu código de descuento")).toLowerCase();

    descuento(codigo);


    if (total != subtotal()) {
        alert(`Tu monto anterior era de ${subtotal()}$`)
        alert(`Tu monto con el descuento es del ${total}$`)
    } else {
        alert(`El codigo no es válido`)
    }
}