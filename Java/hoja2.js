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
const poleraBeige = new Prendas("polera beige", "manga larga", "xl", "poleras", 7500, 40);


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




class Registrar{

    constructor(nombre, edad, mail){
        this.nombre = nombre;
        this.edad = edad;
        this.mail = mail;
    }
}