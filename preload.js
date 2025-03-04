const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  scrapeGameData: (url) => ipcRenderer.invoke('scrape-game-data', url)
});
