(() => {

  const $SettingsDialog = document.getElementById('settings-dialog');

  const $UIThemeSheet = document.getElementById('ui-theme-sheet');

  // For populating UI language select list
  const $SelectUILangInput = document.getElementById('select-ui-lang');
  const $SelectUILang = $SettingsDialog.querySelector('.mdl-menu[for="select-ui-lang"]');
  const $SelectUILangItem = $SelectUILang.getElementsByClassName('mdl-menu__item')[0];

  const $SwitchAutoUpdate = $SettingsDialog.querySelector('[for="switch-auto-update-check"]');
  const $SwitchAutoUpdateInput = $SwitchAutoUpdate.getElementsByTagName('input')[0];

  // For populating UI themes select list
  const $UIThemesList = $SettingsDialog.getElementsByClassName('preview-list')[0];
  const $UIThemesListItem = $UIThemesList.getElementsByClassName('preview-list-item')[0];




  const funcResetSettings = () => {
    if (N.Settings.strUILangSlug !== 'english') {
      $SelectUILang.querySelector('[data-slug="english"]').click();
    }
    if ( ! N.Settings.boolAutoUpdateCheck) {
      $SwitchAutoUpdateInput.click();
    }
    if (N.Settings.strUIThemeSlug !== '_ORIGINAL_white-room') {
      $UIThemesList.querySelector('[data-slug="_ORIGINAL_white-room"]').click();
    }
  };


  // TODO [(Un)colored] : Lang switch function (no need to reload)
  const funcSetUIThemeLang = () => {

  };




  // Handling UI languages

  const arrFileNames = N.ElectronFramework.Fs.readdirSync(`${N.strAppPath}/lang/`);
  // For each UI language
  forEach(arrFileNames, (strFileName) => {
    // Create a UI language list item
    const $SelectUILangItemClone = $SelectUILangItem.cloneNode(true);
    $SelectUILangItemClone.removeAttribute('hidden');
    $SelectUILangItemClone.dataset.slug = strFileName.replace('.xml', '');

    // Trying to read the UI languages XML file.
    const strUILangXML = N.Functions.IO.funcReadFile({ strPath: `${N.strAppPath}/lang/${strFileName}` });

    if (strUILangXML) {
      const Parser = new DOMParser();
      const $UILangXML = Parser.parseFromString(strUILangXML, 'text/xml');

      // Getting the UI language name inside the file content
      $SelectUILangItemClone.textContent = $UILangXML.getElementsByTagName('langname')[0].textContent;

      // Set UI lang on item click
      $SelectUILangItemClone.addEventListener('click', () => {
        // If the clicked lang is different than the actual one
        if ($SelectUILangItemClone.dataset.slug !== N.Settings.strUILangSlug) {
          N.Settings.strUILangSlug = $SelectUILangItemClone.dataset.slug;
          N.Functions.IO.funcSaveSettings();
        }
      });

      if ($SelectUILangItemClone.dataset.slug === N.Settings.strUILangSlug) {
        $SelectUILangInput.value = $SelectUILangItemClone.textContent;
      }

      $SelectUILang.appendChild($SelectUILangItemClone);
    }
  });




  // Handling UI themes

  const arrFolderNames = N.ElectronFramework.Fs.readdirSync(`${N.strAppPath}/themes/ui-themes/`);
  // For each interface theme
  forEach(arrFolderNames, (strFolderName) => {
    // Create a UI theme list item
    const $UIThemesListItemClone = $UIThemesListItem.cloneNode(true);
    $UIThemesListItemClone.removeAttribute('hidden');
    $UIThemesListItemClone.dataset.slug = strFolderName;

    // Trying to read the UI theme CSS file.
    const strUIThemeCSS = N.Functions.IO.funcReadFile({ strPath: `${N.strAppPath}/themes/ui-themes/${strFolderName}/style.css` });

    if (strUIThemeCSS) {
      // Getting the UI theme name inside the file content
      $UIThemesListItemClone.getElementsByClassName('mdl-list__item-primary-content')[0].textContent = strUIThemeCSS.match('- __themename: (.*) -')[1];
      $UIThemesListItemClone.getElementsByTagName('img')[0].src = `../themes/ui-themes/${strFolderName}/preview.png`;

      // Set UI theme on item click
      $UIThemesListItemClone.addEventListener('click', () => {
        // If the clicked theme is different than the actual one
        if ($UIThemesListItemClone.dataset.slug !== N.Settings.strUIThemeSlug || ! $UIThemesList.getElementsByClassName('active')[0]) {
          N.Settings.strUIThemeSlug = $UIThemesListItemClone.dataset.slug;
          $UIThemeSheet.href = `${N.strAppPath}/themes/ui-themes/${strFolderName}/style.css`;
          const $UIThemeSelected = $UIThemesList.getElementsByClassName('active')[0];
          if ($UIThemeSelected) {
            $UIThemeSelected.classList.remove('active');
          }
          $UIThemesListItemClone.classList.add('active');

          N.Functions.IO.funcSaveSettings();
        }
      });

      $UIThemesList.appendChild($UIThemesListItemClone);
    }
  });

  // Selecting the corresponding UI theme in the list
  $UIThemesList.querySelector(`[data-slug="${N.Settings.strUIThemeSlug}"]`).click();



  // Handling app auto update check
  $SwitchAutoUpdateInput.addEventListener('click', () => {
    N.Settings.boolAutoUpdateCheck = ! $SwitchAutoUpdate.classList.contains('is-checked');
    N.Functions.IO.funcSaveSettings();
  });


  $SettingsDialog.getElementsByClassName('reset-button')[0].addEventListener('click', () => {
    funcResetSettings();
  });

  $SettingsDialog.getElementsByClassName('settings-folder-button')[0].addEventListener('click', () => {
    N.ElectronFramework.Shell.showItemInFolder(N.strSettingsFilePath);
  });


  // First init of the auto update switch
  if ($SwitchAutoUpdate.classList.contains('is-checked') !== N.Settings.boolAutoUpdateCheck) {
    $SwitchAutoUpdateInput.click();
  }


  if (N.Settings.boolFirstStart) {
    N.$MenuQuickGuide.click();
    N.Settings.boolFirstStart = false;
    N.Functions.IO.funcSaveSettings();
  }
})();
