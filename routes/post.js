const express = require('express');
const router = express.Router();
const Post = require('../models/post'); // Importa el modelo de datos 'Post' para interactuar con la base de datos.

// Obtener todos los posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // Utiliza el método 'find()' del modelo 'Post' para buscar todos los posts en la base de datos.
    res.json(posts); // Envía una respuesta JSON con los posts encontrados.
  } catch (err) {
    res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un mensaje de error y un código de estado 500.
  }
});

// Crear un nuevo post
router.post('/posts', async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  }); // Crea una nueva instancia del modelo 'Post' con los datos proporcionados en el cuerpo de la solicitud.

  try {
    const savedPost = await newPost.save(); // Guarda el nuevo post en la base de datos.
    res.status(201).json(savedPost); // Devuelve el post creado con un código de estado 201 (Created).
  } catch (err) {
    res.status(400).json({ message: err.message }); // Si ocurre un error, devuelve un mensaje de error y un código de estado 400.
  }
});

// Obtener un post por ID
router.get('/posts/:id', getPost, (req, res) => {
  res.json(res.post); // Devuelve el post encontrado por el middleware 'getPost'.
});

// Actualizar un post por ID (PUT /posts/:id)
router.put('/posts/:id', getPost, async (req, res) => {
  if (req.body.title != null) {
    res.post.title = req.body.title; // Actualiza el título del post si se proporciona en el cuerpo de la solicitud.
  }
  if (req.body.content != null) {
    res.post.content = req.body.content; // Actualiza el contenido del post si se proporciona en el cuerpo de la solicitud.
  }
  try {
    const updatedPost = await res.post.save(); // Guarda los cambios en el post actualizado en la base de datos.
    res.json(updatedPost); // Devuelve el post actualizado.
  } catch (err) {
    res.status(400).json({ message: err.message }); // Si ocurre un error, devuelve un mensaje de error y un código de estado 400.
  }
});

// Eliminar un post por ID
router.delete('/posts/:id', getPost, async (req, res) => {
  try {
    await res.post.remove(); // Elimina el post encontrado por el middleware 'getPost' de la base de datos.
    res.json({ message: 'Post eliminado' }); // Devuelve un mensaje de éxito.
  } catch (err) {
    res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un mensaje de error y un código de estado 500.
  }
});

// Middleware para obtener un post por ID
async function getPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id); // Busca un post por su ID en la base de datos.
    if (post == null) {
      return res.status(404).json({ message: 'No se encontró el post' }); // Si no se encuentra el post, devuelve un mensaje de error y un código de estado 404.
    }
    res.post = post; // Almacena el post encontrado en la respuesta para su uso posterior.
    next(); // Llama a la función 'next()' para continuar con el manejo de la solicitud.
  } catch (err) {
    return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un mensaje de error y un código de estado 500.
  }
}

module.exports = router; // Exporta el enrutador con las rutas y los manejadores definidos.
