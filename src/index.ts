import { app as ElectronApp, BrowserWindow } from 'electron';

let mainWindow: Electron.BrowserWindow;

ElectronApp.on('ready', () => {
	mainWindow = new BrowserWindow({ width: 1024, height: 800, resizable: true });
	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
	mainWindow.webContents.openDevTools();
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
});

ElectronApp.on('window-all-closed', () => {
	ElectronApp.quit();
});
