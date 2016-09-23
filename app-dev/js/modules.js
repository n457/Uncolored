// Only one namespace
const N = {};
N.ElectronFramework = {};
N.Functions = {};

N.boolDevMode = false;

N.ElectronFramework.Electron = require('electron');

// Uses to access main process things. More info here :
// http://electron.atom.io/docs/v0.37.2/api/remote/
N.ElectronFramework.Remote = N.ElectronFramework.Electron.remote;

// Get access to the BrowserWindow object which this web page belongs to.
N.ElectronFramework.CurrentWindow = N.ElectronFramework.Remote.getCurrentWindow();

// Hide application menu bar
N.ElectronFramework.CurrentWindow.setMenuBarVisibility(false);

if (N.boolDevMode) {
  N.ElectronFramework.CurrentWindow.webContents.openDevTools();
}

// Module to control application life.
N.ElectronFramework.App = N.ElectronFramework.Remote.app;
// Used to handle native dialog windows
N.ElectronFramework.Dialog = N.ElectronFramework.Remote.dialog;

// Used to trigger native commands
N.ElectronFramework.Shell = N.ElectronFramework.Electron.shell;
// Used to handle clipboard data
N.ElectronFramework.Clipboard = N.ElectronFramework.Electron.clipboard;

// "fs" for "File System" : used to read and write files on disks.
N.ElectronFramework.Fs = require('fs');

// manipulate path string
N.ElectronFramework.Path = require('path');
