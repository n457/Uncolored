const Electron = require('electron');
// Module to control application life.
const App = Electron.app;
// Module to create native browser windows.
const BrowserWindow = Electron.BrowserWindow;
// Module to create native window menus.
const Menu = Electron.Menu;
// Module to execute native commands.
const Shell = Electron.shell;
// "fs" for "File System" : used to read and write files on disks.
const Fs = require('fs');

const strAppUserData = App.getPath('userData');

let Settings;
try {
  // Accessing settings here for window related settings
  Settings = JSON.parse( Fs.readFileSync(`${strAppUserData}/settings.min.json`, 'utf8') );
} catch (Error) {}


let boolWindowFrame = false;

if (Settings) {
  if (Settings.boolWindowFrame) {
    boolWindowFrame = true;
  }
}



// Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
let MainWindow;



// (Un)colored is a single instance application. Close the second instance window if it exists.
// https://github.com/electron/electron/blob/master/docs/api/app.md#appmakesingleinstancecallback
const boolFirstInstanceExists = App.makeSingleInstance(() => {
  // Someone tried to run a second instance, we should focus our first window.
  if (MainWindow) {
    if (MainWindow.isMinimized()) {
      MainWindow.restore();
    }
    MainWindow.focus();
  }
});
if (boolFirstInstanceExists) {
  // Close this second instance window.
  App.quit();
}
// If this is the first instance, continue the execution of this script.



const funcCreateWindow = () => {

  const arrMenuTemplate = [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'CmdOrCtrl+Y',
          role: 'redo'
        },
        {
          label: 'Redo (alias)',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+Shift+Alt+R',
          click(Item, FocusedWindow) {
            if (FocusedWindow) {
              FocusedWindow.reload();
            }
          }
        },
        // {
        //   label: 'Toggle Full Screen',
        //   accelerator: (() => {
        //     if (process.platform == 'darwin') {
        //       return 'Ctrl+Command+F';
        //     } else {
        //       return 'F11';
        //     }
        //   })(),
        //   click(Item, FocusedWindow) {
        //     if (FocusedWindow) {
        //       FocusedWindow.setFullScreen( ! FocusedWindow.isFullScreen());
        //     }
        //   }
        // },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'CmdOrCtrl+Shift+Alt+D',
          click(Item, FocusedWindow) {
            if (FocusedWindow) {
              FocusedWindow.webContents.toggleDevTools();
            }
          }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    arrMenuTemplate.unshift({
      label: 'Application',
      submenu: [
        {
          label: 'Hide',
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() { App.quit(); }
        }
      ]
    });
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(arrMenuTemplate));


  // Create the browser window.
  MainWindow = new BrowserWindow({
    'width': 960,
    'height': 660,
    'frame': boolWindowFrame
  });


  // http://stackoverflow.com/questions/31670803/prevent-electron-app-from-redirecting-when-dragdropping-items-in-window
  MainWindow.webContents.on('will-navigate', (Event) => {
    Event.preventDefault();
    return false;
  });

  // From http://stackoverflow.com/questions/32402327/how-can-i-force-external-links-from-browser-window-to-open-in-a-default-browser
  MainWindow.webContents.on('new-window', (Event, strURL) => {
    Event.preventDefault();
    Shell.openExternal(strURL);
  });

  // Emitted when the window is closed.
  MainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows in an array if your app supports multi windows, this is the time when you should delete the corresponding element.
    MainWindow = null;
  });

  // and load the view of the app.
  MainWindow.loadURL(`file://${__dirname}/views/main.html`);

};

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
App.on('ready', () => {
  funcCreateWindow();
});

// Quit when all windows are closed.
App.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
  // Here we choose to close the app completely in all cases.
  App.quit();
  // Original OS X specific code here : https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md#write-your-first-electron-app
});

// In this file you can include the rest of your app's specific main process code. You can also put them in separate files and require them here.
App.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
  if (MainWindow === null) {
    funcCreateWindow();
  }
});
