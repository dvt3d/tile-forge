import { app, BrowserWindow } from 'electron'
import url from 'url'
import path from 'path'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let win
function createWindow() {
  win = new BrowserWindow({
    width: 1080,
    height: 720,
    minWidth: 800,
    minHeight: 500,
    backgroundColor: '#1e1e1e',
    title: 'TileForge',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.mjs'),
    },
  })

  try {
    win.center()
    win.removeMenu()
  } catch {}

  const devUrl = process.env.VITE_DEV_SERVER_URL
  if (devUrl) {
    win.loadURL(devUrl)
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  win.on('closed', () => {
    win = null
  })
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
