// Window Binding
function obtenerAuto() {
    console.log(`Mi auto es color ${this.color}`);
}

const color = 'Negro'; // undefined
// Window Binding -> window.color 
window.color = 'Negro'; // Color Negro

obtenerAuto();