N.Functions.Documents = {};


N.Functions.Documents.funcDocActiveChange = () => {
  if (N.DocActive) {
    N.DocActive.LastSelection = lightrange.saveSelection();
    N.DocActive.$Tab.classList.remove('active');
    N.DocActive.$ContentContainer.classList.remove('active');

    N.Functions.Editor.funcCleanSearch({ Document: N.DocActive });
  }
};


N.Functions.Documents.funcOpenDialog = () => {
  N.Functions.Dialogs.funcCloseContext();

  N.ElectronFramework.Dialog.showOpenDialog({
    properties: [
      'openFile',
      'multiSelections',
      'createDirectory'
    ],
    filters: [
      {name: 'Supported documents', extensions: ['html', 'htm', 'md', 'markdown']},
      {name: 'HTML documents', extensions: ['html', 'htm']},
      {name: 'Markdown documents', extensions: ['md', 'markdown']}
    ]
  }, (arrPaths) => {
    // arrPaths is undefined if the opening is cancelled by the user
    if (arrPaths) {
      N.Functions.Documents.funcOpen({ arrPaths: arrPaths });
    }
  });
};



N.Functions.Documents.funcOpen = (Parameter) => {

  forEach(Parameter.arrPaths, (strPath) => {
    strPath = N.ElectronFramework.Path.normalize(strPath);

    let boolIsDocAlreadyOpened = false;

    // Check the current path with all opened document
    forEach(N.arrDocs, (Doc) => {
      // If the document is saved on disk (has a path) and has the same path (already opened)
      if (Doc && Doc.strPath && Doc.strPath === strPath) {
        // We mark it for the next step
        boolIsDocAlreadyOpened = true;
        if (Parameter.arrPaths.length === 1) {
          Doc.methShow();
        }
        // Break the loop, it's useless to continue
        return;
      }
    });

    // After looping into all the saved and opened documents, the document is not already opened, so we open it
    if ( ! boolIsDocAlreadyOpened) {
      const FilePathInfo = N.Functions.Utils.funcGetFilePathInfo({ strPath: strPath });

      let LoadedFile = N.Functions.IO.funcLoadDoc({ strPath: strPath, strFormat: FilePathInfo.strFormat });

      if (LoadedFile) {
        let strDocThemeSlug;
        let strDocThemeName;
        if (FilePathInfo.strFormat === 'HTML') {
          strDocThemeSlug = LoadedFile.strLoadedDocThemeSlug;
          strDocThemeName = LoadedFile.strLoadedDocThemeName;
        }

        let boolLockedDoc = false;
        if (FilePathInfo.strDirPath === N.ElectronFramework.Path.normalize(`${N.strAppPath}/documents`)) {
          boolLockedDoc = true;
        }

        new Document({
          strPath: strPath,
          strContent: LoadedFile.strLoadedContent,
          strDocThemeSlug: strDocThemeSlug,
          strDocThemeName: strDocThemeName,
          boolLockedDoc: boolLockedDoc
        });

        // Close the previous empty tab if there is only two tabs
        if (N.intCurrentDocs === 2) {
          const $PreviousTab = N.DocActive.$Tab.previousElementSibling;
          if ( ! $PreviousTab.classList.contains('doc-unsaved') && ! $PreviousTab.classList.contains('opened-doc')) {
            $PreviousTab.getElementsByClassName('close-tab')[0].click();
          }
        }
      }
    }
  });

};


// Option :
// - boolForceAction
N.Functions.Documents.funcCloseAll = (Option) => {
  forEach(N.arrDocs, (Doc) => {
    if (Doc) {
      if (Option && Option.boolForceAction) {
        Doc.methClose({ boolForceAction: true });
      } else {
        Doc.methClose();
      }
    }
  });

  if (N.$TabsList.getElementsByClassName('doc-unsaved').length) {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'unsaved-docs' });
    // returning a status to show a warning dialog at application closing
    return { boolUnsavedDocs: true };
  }

  return { boolUnsavedDocs: false };
};
