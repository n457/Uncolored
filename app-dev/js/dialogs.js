(() => {

  forEach(document.getElementsByClassName('close-dialog-button'), ($Button) => {
    $Button.addEventListener('click', () => {
      N.Functions.Dialogs.funcForceClose();
    });
  });



  N.$MenuOpenDocFolder.addEventListener('click', () => {
    N.DocActive.methOpenFolder();
  });
  Mousetrap.bindGlobal('mod+shift+o', () => {
    N.$MenuOpenDocFolder.click();
  });


  document.getElementById('menu-save-as').addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'save-as' });
  });
  Mousetrap.bindGlobal('mod+shift+s', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'save-as' });
  });


  document.getElementById('menu-search').addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'search' });
    N.$SearchInput.select();
  });
  Mousetrap.bindGlobal('mod+f', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'search' });
    N.$SearchInput.select();
  });


  document.getElementById('menu-doc-info').addEventListener('click', () => {
    N.DocActive.methSetInfoDialog();
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'doc-info' });
  });

  document.getElementById('menu-print').addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'print' });
  });
  Mousetrap.bindGlobal('mod+p', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'print' });
  });


  document.getElementById('menu-settings').addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'settings' });
  });


  document.getElementById('menu-shortcuts').addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'shortcuts' });
  });
  Mousetrap.bindGlobal('ctrl+space', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'shortcuts' });
  });


  N.$MenuQuickGuide.addEventListener('click', () => {
    N.Functions.Documents.funcOpen({ arrPaths: [`${N.strAppPath}/documents/quick-guide-${N.Settings.strUILangSlug}.html`] });
  });


  document.getElementById('menu-about').addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'about' });
  });
  N.$AboutDialog.getElementsByClassName('app-folder-button')[0].addEventListener('click', () => {
    N.ElectronFramework.Shell.showItemInFolder(N.strAppExePath);
  });



  Mousetrap.bindGlobal('escape', () => {
    if (N.$Toolbar.dataset.view === 'tools-list') {
      N.$Toolbar.classList.remove('active');
    }

    N.Functions.Dialogs.funcCloseCurrent();
  });


  Mousetrap.bindGlobal('enter', () => {
    N.Functions.Dialogs.funcValidateCurrent();
  });




  N.$UnsavedDocsDialog.getElementsByClassName('quit-app')[0].addEventListener('click', () => {
    document.body.classList.add('force-close-app');
    N.Functions.Window.funcClose();
  });


  window.addEventListener('beforeunload', (Event) => {
    if ( ! document.body.classList.contains('force-close-app')) {
      const AfterCloseStatus = N.Functions.Documents.funcCloseAll();

      // Prevent the window from closing if there are unsaved documents
      if (AfterCloseStatus.boolUnsavedDocs) {
        Event.returnValue = false;
      }
    }
  });

})();
