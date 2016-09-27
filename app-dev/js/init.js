N.strAppName = N.ElectronFramework.App.getName();
N.strAppVersion = N.ElectronFramework.App.getVersion();

N.strAppPath = N.ElectronFramework.App.getAppPath();
N.strAppExePath = N.ElectronFramework.App.getPath('exe');

N.strAppUserData = N.ElectronFramework.App.getPath('userData');
N.strSettingsFilePath = `${N.strAppUserData}/settings.min.json`;


N.Functions.IO.funcLoadSettings();
N.Functions.IO.funcLoadDocThemesLibs();

N.Functions.Window.funcPlatformDetect();


N.$Header = document.getElementsByClassName('mdl-layout__header')[0];
N.$TabsList = document.getElementsByClassName('tabs-list')[0];
N.$TabModel = document.getElementById('tab-model');

N.$MenuOpenDocFolder = document.getElementById('menu-open-doc-folder');
N.$MenuSave = document.getElementById('menu-save');
N.$MenuQuickGuide = document.getElementById('menu-quick-guide');

N.$Workspace = document.getElementsByClassName('mdl-layout__content')[0];
N.$ContentContainerModel = document.getElementById('content-container-model');
N.$GlobalUnsavedMark = document.getElementById('global-unsaved-mark');

N.$Toolbar = document.getElementById('toolbar');
// Need to be here because of disabled tool state
N.$ToolQuote = document.getElementById('tool-quote');
N.$ToolUnorderedList = document.getElementById('tool-unordered-list');
N.$ToolOrderedList = document.getElementById('tool-ordered-list');
N.$ToolH1 = document.getElementById('tool-h1');
N.$ToolH2 = document.getElementById('tool-h2');
N.$ToolH3 = document.getElementById('tool-h3');
N.$ToolH4 = document.getElementById('tool-h4');
N.$ToolH5 = document.getElementById('tool-h5');
N.$ToolH6 = document.getElementById('tool-h6');

N.$SearchDialog = document.getElementById('search-dialog');
N.$SearchInput = document.getElementById('search-field');
N.$ReplaceInput = document.getElementById('replace-field');
N.$SearchResultsTotal = N.$SearchDialog.getElementsByClassName('search-results-total')[0];

N.$DocInfoDialog = document.getElementById('doc-info-dialog');
N.$DocInfoThemeName = N.$DocInfoDialog.getElementsByClassName('doc-theme-name')[0];
N.$DocInfoParagraphs = N.$DocInfoDialog.getElementsByClassName('paragraphs-number')[0];
N.$DocInfoSentences = N.$DocInfoDialog.getElementsByClassName('sentences-number')[0];
N.$DocInfoWords = N.$DocInfoDialog.getElementsByClassName('words-number')[0];
N.$DocInfoCharacters = N.$DocInfoDialog.getElementsByClassName('characters-number')[0];
N.$DocInfoCharactersSpaces = N.$DocInfoDialog.getElementsByClassName('characters-spaces-number')[0];

N.$AboutDialog = document.getElementById('about-dialog');

N.$UnsavedDocsDialog = document.getElementById('unsaved-docs-dialog');


N.arrDocs = [];
N.DocActive;

N.intDocIDsCount = -1;
N.intCurrentDocs = 0;

N.strLastHTMLCopied = '';
N.strLastHTMLPasted = '';
N.strLastHTMLDragged = '';
N.timerCopy;
N.timerPaste;
// N.boolCanDrop always "false" by default
N.boolCanDrop = false;

N.LastContextMenuElementInfo;

N.$DialogActive;
N.strDialogActiveSlug = '';



N.Functions.Utils.funcSetDOMAppName();


Mousetrap.bindGlobal('tab', () => {
  if (document.activeElement !== N.$SearchInput) {
    return false;
  }
});
Mousetrap.bindGlobal('shift+tab', () => {
  if (document.activeElement !== N.$ReplaceInput) {
    return false;
  }
});

emojify.setConfig({ mode: 'data-uri' });
