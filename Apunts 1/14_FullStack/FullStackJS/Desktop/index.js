// BrowserWindow crea la ventana de un escritorio
const { app, BrowserWindow } = require('electron');


let appWindow;

// Toda la configuración de la app desktop (creamos la ventana)
function crearVentana() {
    appWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        center: true,
        show: false,
        icon: 'icon.png'
    });

    // Cuando la aplicación es cerrada.
    appWindow.on('closed', () => {
        appWindow = null;
    });

    // Cargar HTML
    appWindow.loadFile('./index.html');

    // Cuando la app este lista, mostrar la ventana
    appWindow.once('ready-to-show', () => {
        appWindow.show();
    });
}

// Pasamos a electron toda la configuración de la app
app.on('ready', crearVentana);