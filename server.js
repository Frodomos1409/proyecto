const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Cambia esto por tu contraseña
  database: 'registro' // El nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conexión a MySQL exitosa.');
});

// Configurar el middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para obtener registros de vacunas
app.get('/vacunas', (req, res) => {
  connection.query('SELECT * FROM vacunas', (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error en la consulta');
      return;
    }
    res.json(results);
  });
});

// Ruta para registrar una nueva vacuna
app.post('/vacunas', (req, res) => {
  const { nombre, edad, vacuna, fecha } = req.body;
  if (nombre && edad && vacuna && fecha) {
    connection.query('INSERT INTO vacunas (nombre, edad, vacuna, fecha) VALUES (?, ?, ?, ?)', [nombre, edad, vacuna, fecha], (err) => {
      if (err) {
        console.error('Error al insertar vacuna:', err);
        res.status(500).send('Error al registrar vacuna');
        return;
      }
      res.status(201).json({ mensaje: 'Vacuna registrada' });
    });
  } else {
    res.status(400).json({ mensaje: 'Datos incompletos' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
