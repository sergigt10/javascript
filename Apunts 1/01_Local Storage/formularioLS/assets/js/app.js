// Variables
const listaTweets = document.getElementById('lista-tweets');



// Event Listeners

eventListeners();

// Ponemos los event listeners en una función
function eventListeners() {
     // Cuando se envia el formulario
     document.querySelector('#formulario').addEventListener('submit', agregarTweet);

     // Borrar Tweets (utilizamos delegation)
     listaTweets.addEventListener('click', borrarTweet);

     // Contenido cargado
     // DOMContentLoaded -> cuando se ha cargado todo el archivo index.html se ejecuta este event listener
     document.addEventListener('DOMContentLoaded', localStorageListo);
}



// Funciones

// Añadir tweet del formulario
function agregarTweet(e) {
     e.preventDefault();
     // leer el valor del textarea
     const tweet = document.getElementById('tweet').value;
     // crear boton de eliminar
     const botonBorrar = document.createElement('a');
     botonBorrar.classList = 'borrar-tweet';
     botonBorrar.innerText = 'X';

     // Crear elemento y añadirle el contenido a la lista
     const li = document.createElement('li');
     li.innerText = tweet;
     // añade el botón de borrar al tweet
     li.appendChild(botonBorrar);
     // añade el tweet a la lista
     listaTweets.appendChild(li);

     // Añadir a Local Storage
     agregarTweetLocalStorage(tweet);
}

// Elimina el Tweet del DOM
function borrarTweet(e) {
     e.preventDefault();
     // Si damos clic en el boto de eliminar
     if(e.target.className === 'borrar-tweet') {
          // e.target.parentElement -> devuelve el li
          // Elimina el li que hemos hecho clic
          e.target.parentElement.remove();
          // Pasamos el nombre del tweet que queremos eliminar
          borrarTweetLocalStorage(e.target.parentElement.innerText);
     } 
}

// Mostrar datos de LocalStorage en la lista
function localStorageListo() {
     let tweets;
     tweets = obtenerTweetsLocalStorage();

     // Recorremos este array
     tweets.forEach(function(tweet) {
          // crear boton de eliminar
          const botonBorrar = document.createElement('a');
          botonBorrar.classList = 'borrar-tweet';
          botonBorrar.innerText = 'X';

          // Crear elemento y añadirle el contenido a la lista
          const li = document.createElement('li');
          li.innerText = tweet;
          // añade el botón de borrar al tweet
          li.appendChild(botonBorrar);
          // añade el tweet a la lista
          listaTweets.appendChild(li);
     });
}

// Agrega tweet a local storage
function agregarTweetLocalStorage(tweet) {
     // Variable que almacena todos los tweets
     let tweets;
     tweets = obtenerTweetsLocalStorage();
     // Añadir el nuevo tweet en el array
     tweets.push(tweet);
     // Convertir de string a arreglo para local storage
     // Guardamos en el localstorage
     localStorage.setItem('tweets', JSON.stringify(tweets) );
}

// Comprobar que haya elementos en localstorage, retorna un arreglo
function obtenerTweetsLocalStorage() {
     let tweets;
     // Revisamos los valoes del local storage
     if(localStorage.getItem('tweets') === null) {
          // Si esta vacío lo inicializamos el array
          tweets = []; 
     } else {
          // Pasamos el string a un objeto javascript
          tweets = JSON.parse(localStorage.getItem('tweets') );
     }
     return tweets;
}

// Eliminar tweet de Local Storage

function borrarTweetLocalStorage(tweet) {
     let tweets, tweetBorrar;
     // Elimina la X del tweet
     tweetBorrar = tweet.substring(0, tweet.length - 1);

     tweets = obtenerTweetsLocalStorage();

     tweets.forEach(function(tweet, index) {
          if(tweetBorrar === tweet) {
               tweets.splice(index, 1);
          }
     }) ;

     // Actualizamos el arreglo
     localStorage.setItem('tweets', JSON.stringify(tweets) );
}