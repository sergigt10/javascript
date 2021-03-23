// New Binding
function Automovil(modelo, color) {
    // New Binding -> this.modelo
    this.modelo = modelo;
    this.color = color;
}

const auto = new Automovil('Camaro', 'Negro');
console.log(auto);