N.Functions.IO = {};


N.Functions.IO.funcIOErrorCheck = (Parameter) => {
  try {
    // Execute and return whatever funcToExec returns
    return Parameter.funcToExec();
  }
  catch (Error) {
    console.error(Error);
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'io-error' });
    return false;
  }
};



N.Functions.IO.funcReadFile = (Parameter) => {
  // Return whatever funcToExec returns
  return N.Functions.IO.funcIOErrorCheck({ funcToExec: () => {
    return N.ElectronFramework.Fs.readFileSync(Parameter.strPath, 'utf8');
  } });
};



N.Functions.IO.funcLoadSettings = () => {
  N.Settings;

  try {
    N.Settings = JSON.parse( N.ElectronFramework.Fs.readFileSync(N.strSettingsFilePath, 'utf8') );
  }
  catch (Error) {
    N.Settings = {
      boolFirstStart: true,
      strUIThemeSlug: '_ORIGINAL_white-room',
      strUILangSlug: 'english',
      boolAutoUpdateCheck: true
    };

    N.Functions.IO.funcSaveSettings();
  }
};



N.Functions.IO.funcSaveSettings = () => {
  N.Functions.IO.funcIOErrorCheck({ funcToExec: () => {
    N.ElectronFramework.Fs.writeFileSync(N.strSettingsFilePath, JSON.stringify(N.Settings), 'utf8');
  } });
};



N.Functions.IO.funcLoadDocThemesLibs = () => {
  N.Functions.IO.funcIOErrorCheck({ funcToExec: () => {
    const strDocThemesLibrariesPath = `${N.strAppPath}/themes/doc-themes/lib`;
    N.DocThemesLibraries = {};

    // Lib
    N.DocThemesLibraries.strNormalizeCSS = N.ElectronFramework.Fs.readFileSync(`${strDocThemesLibrariesPath}/normalize.custom.min.css`, 'utf8');

    N.DocThemesLibraries.strHighlightJS = N.ElectronFramework.Fs.readFileSync(`${strDocThemesLibrariesPath}/highlight.pack.custom.min.js`, 'utf8');

    N.DocThemesLibraries.strEmojisCSS = N.ElectronFramework.Fs.readFileSync(`${strDocThemesLibrariesPath}/emojify.pack.min.css`, 'utf8');
    N.DocThemesLibraries.strEmojisJS = N.ElectronFramework.Fs.readFileSync(`${strDocThemesLibrariesPath}/emojify.min.js`, 'utf8');

    // Common code
    N.DocThemesLibraries.strDocumentCSS = N.ElectronFramework.Fs.readFileSync(`${strDocThemesLibrariesPath}/document.css`, 'utf8');
    N.DocThemesLibraries.strDocumentJS = N.ElectronFramework.Fs.readFileSync(`${strDocThemesLibrariesPath}/document.js`, 'utf8');
  } });
};



// Parameters :
// - strSavePath
// - strFormat
// - strDocThemeSlug
// - $ContentEditable
N.Functions.IO.funcSaveDoc = (Parameters) => {
  // Return whatever funcToExec returns
  return N.Functions.IO.funcIOErrorCheck({ funcToExec: () => {
    const $ContentEditableClone = Parameters.$ContentEditable.cloneNode(true);

    const strDocThemePath = `${N.strAppPath}/themes/doc-themes/themes-dir/${Parameters.strDocThemeSlug}`;
    let strDocContent = '';

    if (Parameters.strFormat === 'HTML') {
      N.Functions.Content.funcClearHTMLForHTMLExport({ $ContentEditable: $ContentEditableClone });

      strDocContent = N.ElectronFramework.Fs.readFileSync(`${strDocThemePath}/template.html`, 'utf8');

      const strHighlightThemeCSS = N.ElectronFramework.Fs.readFileSync(`${strDocThemePath}/highlight.js-theme.min.css`, 'utf8');
      const strDocThemeCSS = N.ElectronFramework.Fs.readFileSync(`${strDocThemePath}/style.css`, 'utf8');

      const strDocThemeJS = N.ElectronFramework.Fs.readFileSync(`${strDocThemePath}/script.js`, 'utf8');

      // Lib
      strDocContent = strDocContent.replace('/* __normalizecss */', N.DocThemesLibraries.strNormalizeCSS);

      if ($ContentEditableClone.getElementsByTagName('pre').length) {
        strDocContent = strDocContent.replace('/* __highlightthemecss */', strHighlightThemeCSS);
        strDocContent = strDocContent.replace('/* __highlightjs */', N.DocThemesLibraries.strHighlightJS);
      } else {
        strDocContent = strDocContent.replace('/* __highlightthemecss */', '');
        strDocContent = strDocContent.replace('/* __highlightjs */', '');
      }

      if ($ContentEditableClone.getElementsByClassName('emoji').length) {
        strDocContent = strDocContent.replace('/* __emojifycss */', N.DocThemesLibraries.strEmojisCSS);
        strDocContent = strDocContent.replace('/* __emojifyjs */', N.DocThemesLibraries.strEmojisJS);
      } else {
        strDocContent = strDocContent.replace('/* __emojifycss */', '');
        strDocContent = strDocContent.replace('/* __emojifyjs */', '');
      }

      // Common code
      strDocContent = strDocContent.replace('/* __documentcss */', N.DocThemesLibraries.strDocumentCSS);
      strDocContent = strDocContent.replace('/* __documentjs */', N.DocThemesLibraries.strDocumentJS);

      // Doc theme code
      strDocContent = strDocContent.replace('/* __docthemecss */', strDocThemeCSS);
      strDocContent = strDocContent.replace('/* __docthemejs */', strDocThemeJS);

      // HTML content replace at the end, to avoid regexp false detection with previous strings
      strDocContent = strDocContent.replace('<!-- __documentcontent -->', $ContentEditableClone.innerHTML);
    }


    else if (Parameters.strFormat === 'Markdown') {
      N.Functions.Content.funcClearHTMLForMarkdownExport({ $ContentEditable: $ContentEditableClone });
      strDocContent = N.Functions.Utils.funcHTMLToMarkdown({ strContent: $ContentEditableClone.innerHTML });
    }

    N.ElectronFramework.Fs.writeFileSync(Parameters.strSavePath, strDocContent, 'utf8');

    return true;
  } });
};



// Parameters :
// - strPath
// - strFormat
N.Functions.IO.funcLoadDoc = (Parameters) => {
  // Return whatever funcToExec returns
  return N.Functions.IO.funcIOErrorCheck({ funcToExec: () => {
    let strDocContent = N.ElectronFramework.Fs.readFileSync(Parameters.strPath, 'utf8');

    if (Parameters.strFormat === 'HTML') {
      return {
        strLoadedDocThemeSlug: strDocContent.match('- __themeslug: (.*) -')[1],
        strLoadedDocThemeName: strDocContent.match('- __themename: (.*) -')[1],
        // RegExp -> [\s\S] any characters, even line breaks
        strLoadedContent: strDocContent.match(/<main>([\s\S]*)<\/main>/)[1]
      };
    }
    else if (Parameters.strFormat === 'Markdown') {
      return {
        strLoadedContent: N.Functions.Utils.funcMarkdownToHTML({ strContent: strDocContent })
      };
    }
  } });
};
