// this con Explicit binding
function persona(el1, el2) {
    // this con Explicit binding -> ${this.nombre}, ${el1}, ...
    console.log(`Hola soy ${this.nombre} y me gusta el ${el1} y ${el2} `);
}
const informacion = {
    nombre: 'Juan',
    trabajo: 'Programador'
}
const generosMusicales = ['Heavy Metal', 'Rock'];

// Se utiliza para pasar información a una función.

// Explicit binding con call, cuando pasas arreglo debes colocar todas las posiciones
// En call no podemos pasar todo el array completo
persona.call(informacion, generosMusicales[0], generosMusicales[1]);

// explicit binding con .apply, ( si toma un arreglo )
// Aqui podemos pasar todo el array completo
persona.apply(informacion, generosMusicales);

// explicit binding .bind es igual a call pero este te va a crear una nueva función
const nuevaFn = persona.bind(informacion, generosMusicales[0], generosMusicales[1]);
nuevaFn();