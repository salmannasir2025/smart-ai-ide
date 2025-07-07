const { contextBridge, ipcRenderer } = require('electron');

// Expose safe APIs to renderer process here if needed

contextBridge.exposeInMainWorld('electronAPI', {
  // Example: ipcRenderer.send('channel', data)
});
