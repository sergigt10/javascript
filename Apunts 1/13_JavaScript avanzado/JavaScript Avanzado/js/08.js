// Composición
// Crear composición
const obtenerNombre = (info) => ({
    mostrarNombre() {
        console.log(`Nombre: ${info.nombre}`);
    }
});
const guardarEmail = (info) => ({
    email(email) {
        console.log(`Guardando email en: ${info.nombre}`);
        info.email = email;
    }
})
const obtenerEmail = (info) => ({
    mostrarEmail() {
        console.log(`Correo: ${info.email}`);
    }
});
const obtenerEmpresa = (info) => ({
    mostrarEmpresa() {
        console.log(`Empresa: ${info.empresa}`);
    }
});
const obtenerPuesto = (info) => ({
    mostrarPuesto() {
        console.log(`Puesto: ${info.puesto}`);
    }
});
// Fin composición

function Cliente(nombre, email, empresa) {
    let info = {
        nombre, 
        email, 
        empresa
    }
    // Asignar composiciones declaradas
    return Object.assign(
        // Objeto info de cliente
        info, 
        obtenerNombre(info),
        guardarEmail(info),
        obtenerEmail(info), 
        obtenerEmpresa(info)
    )
}

function Empleado(nombre, email, puesto) {
    let info = {
        nombre, 
        email, 
        puesto
    }
    return Object.assign(
        info, 
        obtenerNombre(info),
        guardarEmail(info),
        obtenerEmail(info),
        obtenerPuesto(info)
    )
}

const cliente = Cliente('Juan', null, 'Udemy');
cliente.mostrarNombre();
cliente.email('cliente@cliente.com');
cliente.mostrarEmail()
cliente.mostrarEmpresa()

const empleado = Empleado('Pedro', null, 'Programador');
empleado.mostrarNombre();
empleado.email('empleado@empleado.com');
empleado.mostrarEmail()
empleado.mostrarPuesto()