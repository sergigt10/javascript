class UI {
     constructor() {
          // Instanciar la API
          this.api = new API();     
          // Crear los mapas en un grupo
          this.markers = new L.LayerGroup(); 
          // Iniciar el mapa
          this.mapa = this.inicializarMapa();
     }

     inicializarMapa() {
          // Inicializar y obtener la propiedad del mapa
          const map = L.map('mapa').setView([19.390519, -99.3739778], 6);

          const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

          L.tileLayer(
              'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; ' + enlaceMapa + ' Contributors',
              maxZoom: 18,
              }).addTo(map);

          return map;
     }

     // Mostrar establecimientos de la api
     mostrarEstablecimientos() {
          this.api.obtenerDatos()
                    .then(datos =>  {
                         const resultado = datos.respuestaJSON.results;
                         // Muestra los pines en el Mapa
                         this.mostrarPines(resultado);
                    } )
     }

     // Muestra los pines
     mostrarPines(datos) {
          // Limpiamos los pines del mapa (markers)
          this.markers.clearLayers();
          // Recorrer establecimientos
          datos.forEach(dato => {
               // Destructuring 
               const {latitude, longitude, calle, regular, premium} = dato;
               // Creamos un popup
               const opcionesPopUp = L.popup()
               .setContent(`<p>Calle: ${calle}</p> 
                            <p></p><b>Regular:</b>$ ${regular}</p>
                            <p> <b>Premium:</b>$ ${premium}</p>`);
               // Agregar el Pin
               const marker = new L.marker([
                    parseFloat(latitude),
                    parseFloat(longitude)
               ] )
               // Vinculamos el pin con el popup creado anteriormente.
               .bindPopup(opcionesPopUp)
               // Añadimos a la capa de markers creada.
               this.markers.addLayer(marker); 
          });
          // Indicamos en que mapa mostramos todos los pines
          this.markers.addTo(this.mapa)
     }

      // Obtiene las sugerencias de la REST API
     obtenerSugerencias(busqueda) {
          this.api.obtenerDatos()
               .then(datos => {
                    // Obtener los resultados
                    const resultados = datos.respuestaJSON.results;
                    // Enviar el JSON y la busqueda para el filtrado
                    this.filtrarSugerencias(resultados, busqueda);
               })
     }

     // Filtrar las sugerencias en base al input
     filtrarSugerencias(resultados, busqueda) {
          // Filtrar
          // indexOf recorre si el termino concuerda y si no lo encuentra devuelve -1.
          const filtro = resultados.filter( filtro => filtro.calle.indexOf(busqueda) !== -1 );
          // Mostrar pines del Filtro
          this.mostrarPines(filtro);
     }
}