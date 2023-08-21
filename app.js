const express = require('express'); // Importar Express para la creación del servidor
const mongoose = require('mongoose'); // Importar Mongoose para interactuar con MongoDB
const bodyParser = require('body-parser'); // Importar bodyParser para analizar las solicitudes JSON

const app = express(); // Crear una instancia de la aplicación Express
const port = process.env.PORT || 3000; // Definir el puerto de escucha del servidor (por defecto 3000)

// Configurar bodyParser para analizar el contenido JSON de las solicitudes
app.use(bodyParser.json());

// Conexión a la base de datos MongoDB a través de Mongoose
mongoose.connect('mongodb+srv://cesar:cesar@cluster0.wtlfm.mongodb.net/', {
  useNewUrlParser: true, // Usar el nuevo analizador de URL
  useUnifiedTopology: true, // Usar el nuevo motor de topología unificada
})
.then(() => {
  console.log('Conexión a la base de datos exitosa'); // Mensaje si la conexión es exitosa
})
.catch(error => {
  console.error('Error en la conexión a la base de datos:', error); // Mensaje si hay un error en la conexión
});

// Rutas de la API
const apiRoutes = require('./routes/post'); // Importar las rutas relacionadas con los posts desde el archivo post.js
app.use('/post', apiRoutes); // Usar las rutas para la URL base "/post"

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`); // Mensaje de confirmación al iniciar el servidor
});
