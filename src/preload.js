// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    // Funciones expuestas
    login: (email, password) => ipcRenderer.invoke('login', { email, password }),
    register: (email, password, name, last_name) => ipcRenderer.invoke('register', { email, password, name, last_name })
});

