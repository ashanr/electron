document.getElementById('scrapeButton').addEventListener('click', async () => {
    const gameUrl = document.getElementById('gameUrl').value;
    const result = await window.electronAPI.scrapeGameData(gameUrl);
    document.getElementById('result').textContent = JSON.stringify(result, null, 2);
  });
  