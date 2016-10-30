(() => {

  N.Functions.Window.funcPlatformDetect();

  N.$WindowControls.getElementsByClassName('close')[0].addEventListener('click', () => {
    N.Functions.Window.funcClose();
  });

  N.$WindowControls.getElementsByClassName('minimize')[0].addEventListener('click', () => {
    N.Functions.Window.funcMinimize();
  });

  N.$WindowControls.getElementsByClassName('toggle-maximize')[0].addEventListener('click', () => {
    N.Functions.Window.funcToggleMaximize();
  });

  N.$WindowControls.getElementsByClassName('toggle-fullscreen')[0].addEventListener('click', () => {
    N.Functions.Window.funcToggleFullscreen();
  });
  Mousetrap.bindGlobal(['f11', 'command+ctrl+f'], () => {
    N.Functions.Window.funcToggleFullscreen();
  });

  N.$WindowControls.getElementsByClassName('toggle-always-on-top')[0].addEventListener('click', () => {
    N.Functions.Window.funcToggleAlwaysOnTop();
  });

})();
