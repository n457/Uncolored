N.Functions.Window = {};


N.Functions.Window.funcClose = () => {
  window.close();
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
