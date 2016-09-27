(() => {

  const $SaveAsDialog = document.getElementById('save-as-dialog');

  const $PathField = document.getElementById('save-path-field');
  let strPathFieldValue = '';
  const $PathFieldContainer = $PathField.parentNode;
  const $PathFieldTooltip = $SaveAsDialog.getElementsByClassName('mdl-tooltip')[0];


  const $DocThemeListLabel = $SaveAsDialog.getElementsByClassName('preview-list-label')[0];
  // For populating document themes item list
  const $DocThemeList = $SaveAsDialog.getElementsByClassName('preview-list')[0];
  const $DocThemeItem = $DocThemeList.getElementsByClassName('preview-list-item')[0];

  let FilePathInfo = {};



  const funcSaveDocController = (Options) => {
    if ( (N.DocActive.$Tab.classList.contains('doc-unsaved') && ! N.DocActive.boolLocked) || (Options && Options.boolSaveAsMode) ) {
      if (N.DocActive.strPath || (Options && Options.boolSaveAsMode) ) {
        let SaveParameters = {};

        if (Options && Options.boolSaveAsMode) {
          SaveParameters = {
            strSavePath: Options.strSavePath,
            strFormat: Options.strFormat,
            strDocThemeSlug: Options.strDocThemeSlug,
            $ContentEditable: N.DocActive.$ContentEditable
          };
        } else {
          SaveParameters = {
            strSavePath: N.DocActive.strPath,
            strFormat: N.DocActive.strFormat,
            strDocThemeSlug: N.DocActive.strDocThemeSlug,
            $ContentEditable: N.DocActive.$ContentEditable
          };
        }

        const boolSaveResult = N.Functions.IO.funcSaveDoc(SaveParameters);

        if (boolSaveResult) {
          N.DocActive.strLastSavedContent = N.DocActive.$ContentEditable.innerHTML;
          N.DocActive.$Tab.classList.remove('doc-unsaved');
          N.$GlobalUnsavedMark.classList.remove('active');
        }

      } else {
        N.Functions.Dialogs.funcShow({ strDialogSlug: 'save-as' });
      }
    }
  };



  N.$MenuSave.addEventListener('click', () => {
    funcSaveDocController();
  });
  Mousetrap.bindGlobal('mod+s', () => {
    // We don't force the N.$MenuSave.click() here to keep the save as dialog display system.
    funcSaveDocController();
  });





  // Handling document themes

  const arrFolderNames = N.ElectronFramework.Fs.readdirSync(`${N.strAppPath}/themes/doc-themes/themes-dir/`);
  // For each interface theme
  forEach(arrFolderNames, (strFolderName) => {
    // Create a document theme list item
    const $DocThemeItemClone = $DocThemeItem.cloneNode(true);
    $DocThemeItemClone.removeAttribute('hidden');
    $DocThemeItemClone.dataset.slug = strFolderName;

    // Trying to read the HTML document theme file.
    const strDocThemeHTML = N.Functions.IO.funcReadFile({ strPath: `${N.strAppPath}/themes/doc-themes/themes-dir/${strFolderName}/template.html` });

    if (strDocThemeHTML) {
      // Getting the document theme name inside the file content
      $DocThemeItemClone.getElementsByClassName('mdl-list__item-primary-content')[0].textContent = strDocThemeHTML.match('- __themename: (.*) -')[1];
      $DocThemeItemClone.getElementsByTagName('img')[0].src = `../themes/doc-themes/themes-dir/${strFolderName}/preview.png`;

      // Set document theme on item click
      $DocThemeItemClone.addEventListener('click', () => {
          const $DocThemeSelected = $DocThemeList.getElementsByClassName('active')[0];
          if ($DocThemeSelected) {
            $DocThemeSelected.classList.remove('active');
          }
          $DocThemeItemClone.classList.add('active');
      });

      $DocThemeList.appendChild($DocThemeItemClone);
    }
  });

  // Selecting the corresponding document theme in the list
  $DocThemeList.querySelector('li:nth-child(2)').click();






  $PathField.addEventListener('click', () => {
    const strExtensionLowerCase = N.ElectronFramework.Path.extname(N.DocActive.$FileName.textContent).toLowerCase();
    let strDefaultPathExtension = '';

    if (['.html', '.htm', '.md', '.markdown'].indexOf(strExtensionLowerCase) === -1) {
      strDefaultPathExtension = '.html';
    }

    N.ElectronFramework.Dialog.showSaveDialog({
      defaultPath: N.DocActive.$FileName.textContent + strDefaultPathExtension,
      filters: [
        {name: 'HTML document', extensions: ['html', 'htm']},
        {name: 'Markdown document', extensions: ['md', 'markdown']}
      ]
    }, (strSavePath) => {
      // strSavePath is undefined if the action is cancelled by the user
      if (strSavePath) {
        $PathField.value = strSavePath;
        strPathFieldValue = strSavePath;
        $PathFieldTooltip.textContent = strSavePath;

        FilePathInfo = N.Functions.Utils.funcGetFilePathInfo({ strPath: strSavePath });
        if (FilePathInfo.strFormat === 'HTML') {
          $DocThemeListLabel.removeAttribute('hidden');
          $DocThemeList.removeAttribute('hidden');
        } else if (FilePathInfo.strFormat === 'Markdown') {
          $DocThemeListLabel.setAttribute('hidden', null);
          $DocThemeList.setAttribute('hidden', null);
        }

      } else {
        $PathField.value = '';
        strPathFieldValue = '';
        $PathFieldTooltip.textContent = '';
      }

      N.Functions.Utils.funcTriggerEvent({
        strEvent: 'input',
        $Element: $PathField
      });

    });

  });


  // Save button
  $SaveAsDialog.getElementsByClassName('save-button')[0].addEventListener('click', () => {
    if (strPathFieldValue) {
      $PathFieldContainer.classList.remove('is-invalid');
      N.Functions.Dialogs.funcForceClose();

      let strDocThemeSlug = null;
      let strDocThemeName = null;
      if (FilePathInfo.strFormat === 'HTML') {
        const $DocThemeSelected = $DocThemeList.getElementsByClassName('active')[0];
        strDocThemeSlug = $DocThemeSelected.dataset.slug;
        strDocThemeName = $DocThemeSelected.textContent;
      }

      funcSaveDocController({
        boolSaveAsMode: true,
        strSavePath: strPathFieldValue,
        strFormat: FilePathInfo.strFormat,
        strDocThemeSlug: strDocThemeSlug
      });
      N.DocActive.methSetTabData({
        strPath: strPathFieldValue,
        strDocThemeSlug: strDocThemeSlug,
        strDocThemeName: strDocThemeName
      });

      N.DocActive.methShow();

    } else {
      $PathFieldContainer.classList.add('is-invalid');
    }
  });

})();
