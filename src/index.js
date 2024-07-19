const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'login', 'login.html'));
  // Si necesitas cargar main.html después del inicio de sesión
  ipcMain.handle('navigate-to-main', () => {
    mainWindow.loadFile(path.join(__dirname, '..', 'view', 'index.html'));
  });
};

// Ruta del archivo de base de datos
const dbPath = path.join(__dirname, 'Database', 'baseDatosPrueba.db');

// Manejar el inicio de sesión
ipcMain.handle('login', async (event, { email, password }) => {
  const db = new sqlite3.Database(dbPath);
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Base de datos abierta exitosamente.');
  }

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        reject({ success: false, message: 'Error al consultar el usuario.' });
      }
      if (!user) {
        resolve({ success: false, message: 'Usuario no encontrado.' });
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: 'Contraseña incorrecta.' });
        }
      }
    });

    db.close();
  });
});

// Manejar el registro
ipcMain.handle('register', async (event, { email, password, name, last_name }) => {
  const db = new sqlite3.Database(dbPath);
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Base de datos abierta exitosamente.');
  }

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        reject({ success: false, message: 'Error al hashear la contraseña.' });
      }

      db.run('INSERT INTO users (email, password, name, last_name) VALUES (?, ?, ?, ?)',
          [email, hashedPassword, name, last_name],
          function (err) {
            if (err) {
              reject({ success: false, message: 'Error al registrar el usuario.' });
            } else {
              resolve({ success: true });
            }
          });

      db.close();
    });
  });
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
