N.Functions.Window = {};


N.Functions.Window.funcClose = () => {
  window.close();
};

N.Functions.Window.funcMinimize = () => {
  N.ElectronFramework.CurrentWindow.minimize();
};

N.Functions.Window.funcToggleMaximize = () => {
  if (N.ElectronFramework.CurrentWindow.isMaximized()) {
    N.ElectronFramework.CurrentWindow.unmaximize();
  } else {
    N.ElectronFramework.CurrentWindow.maximize();
  }
};

N.Functions.Window.funcToggleFullscreen = () => {
  if (N.ElectronFramework.CurrentWindow.isFullScreen()) {
    N.ElectronFramework.CurrentWindow.setFullScreen(false);
    document.body.classList.remove('fullscreen');
  } else {
    N.ElectronFramework.CurrentWindow.setFullScreen(true);
    document.body.classList.add('fullscreen');
  }
};


N.Functions.Window.funcPlatformDetect = () => {
  if (process.platform === 'win32') {
    N.strOS = 'windows';
    document.body.classList.add('windows-os');
  } else if (process.platform === 'darwin') {
    N.strOS = 'osx';
    document.body.classList.add('osx-os');
  } else {
    N.strOS = 'linux';
    document.body.classList.add('linux-os');
  }
};
