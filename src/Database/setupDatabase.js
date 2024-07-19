const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta del archivo de base de datos
const dbPath = path.join(__dirname, 'baseDatosPrueba.db');

// Crear o abrir la base de datos
const db = new sqlite3.Database(dbPath);

// Crear tablas
db.serialize(() => {
    // Crear la tabla de usuarios
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);

});

// Cerrar la base de datos
db.close((err) => {
    if (err) {
        console.error('Error al cerrar la base de datos:', err.message);
    } else {
        console.log('Base de datos y tablas creadas exitosamente.');
    }
});
