const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const puppeteer = require('puppeteer');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('scrape-game-data', async (event, gameUrl) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(gameUrl);

  const gameData = await page.evaluate(() => {
    // Replace this with actual selectors for your game
    return {
      score: document.querySelector('.score')?.textContent,
      level: document.querySelector('.level')?.textContent
    };
  });

  await browser.close();
  return gameData;
});
