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


  document.getElementById('menu-save-as_unc2741').addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'save-as' });
  });
  Mousetrap.bindGlobal('mod+shift+s', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'save-as' });
  });


  document.getElementById('menu-search_unc2741').addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'search' });
    N.$SearchInput.select();
  });
  Mousetrap.bindGlobal('mod+f', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'search' });
    N.$SearchInput.select();
  });


  document.getElementById('menu-table-content_unc2741').addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'table-content' });
    N.Functions.Dialogs.funcUpdateTableContent();
  });
  N.$TableContentDialog.getElementsByClassName('refresh-button')[0].addEventListener('click', () => {
    N.Functions.Dialogs.funcUpdateTableContent();
  });


  document.getElementById('menu-doc-info_unc2741').addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'doc-info' });
    N.Functions.Dialogs.funcUpdateDocInfo();
  });
  N.$DocInfoDialog.getElementsByClassName('recount-button')[0].addEventListener('click', () => {
    N.Functions.Dialogs.funcUpdateDocInfo();
  });

  document.getElementById('menu-print_unc2741').addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'print' });
  });
  Mousetrap.bindGlobal('mod+p', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'print' });
  });


  document.getElementById('menu-settings_unc2741').addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'settings' });
  });


  document.getElementById('menu-shortcuts_unc2741').addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'shortcuts' });
  });
  Mousetrap.bindGlobal('ctrl+space', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'shortcuts' });
  });


  N.$MenuQuickGuide.addEventListener('click', () => {
    N.Functions.Documents.funcOpen({ arrPaths: [`${N.strAppPath}/documents/quick-guide-${N.Settings.strUILangSlug}.html`] });
  });


  document.getElementById('menu-about_unc2741').addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'about' });
  });
  N.$AboutDialog.getElementsByClassName('app-folder-button')[0].addEventListener('click', () => {
    N.ElectronFramework.Shell.showItemInFolder(N.strAppExePath);
  });



  Mousetrap.bindGlobal('escape', () => {
    if (N.$Toolbar.dataset.view === 'tools-list') {
      N.$Toolbar.classList.remove('active');
    }

    N.$ContextMenu.classList.remove('active');

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
