N.strAppName = '(Un)colored';
N.strAppVersion = N.ElectronFramework.App.getVersion();

N.strAppPath = N.ElectronFramework.App.getAppPath();
N.strAppExePath = N.ElectronFramework.App.getPath('exe');

N.strAppUserData = N.ElectronFramework.App.getPath('userData');
N.strSettingsFilePath = `${N.strAppUserData}/settings.min.json`;


N.Functions.IO.funcLoadSettings();
N.Functions.IO.funcLoadDocThemesLibs();


N.$Header = document.getElementsByClassName('mdl-layout__header')[0];
N.$WindowControls = document.getElementsByClassName('window-controls')[0];
N.$TabsList = document.getElementsByClassName('tabs-list')[0];
N.$TabModel = document.querySelector('#tab-model-container_unc2741 li');

N.$MenuOpenDocFolder = document.getElementById('menu-open-doc-folder_unc2741');
N.$MenuSave = document.getElementById('menu-save_unc2741');
N.$MenuQuickGuide = document.getElementById('menu-quick-guide_unc2741');

N.$Workspace = document.getElementsByClassName('mdl-layout__content')[0];
N.$ContentContainerModel = N.$Workspace.getElementsByClassName('content-container')[0];
N.$GlobalUnsavedMark = document.getElementById('global-unsaved-mark_unc2741');

N.$Toolbar = document.getElementById('toolbar_unc2741');
// Need to be here because of disabled tool state
N.$ToolQuote = document.getElementById('tool-quote_unc2741');
N.$ToolUnorderedList = document.getElementById('tool-unordered-list_unc2741');
N.$ToolOrderedList = document.getElementById('tool-ordered-list_unc2741');
N.$ToolH1 = document.getElementById('tool-h1_unc2741');
N.$ToolH2 = document.getElementById('tool-h2_unc2741');
N.$ToolH3 = document.getElementById('tool-h3_unc2741');
N.$ToolH4 = document.getElementById('tool-h4_unc2741');
N.$ToolH5 = document.getElementById('tool-h5_unc2741');
N.$ToolH6 = document.getElementById('tool-h6_unc2741');

N.$ContextMenu = document.getElementById('context-menu_unc2741');

N.$SearchDialog = document.getElementById('search-dialog_unc2741');
N.$SearchInput = document.getElementById('search-field_unc2741');
N.$ReplaceInput = document.getElementById('replace-field_unc2741');
N.$SearchResultsTotal = N.$SearchDialog.getElementsByClassName('search-results-total')[0];

N.$TableContentDialog = document.getElementById('table-content-dialog_unc2741');
N.$HeadingsList = N.$TableContentDialog.getElementsByClassName('headings-list')[0];
N.$TableContentHeadingModel = document.querySelector('#heading-item-model-container_unc2741 li');

N.$DocInfoDialog = document.getElementById('doc-info-dialog_unc2741');
N.$DocInfoThemeName = N.$DocInfoDialog.getElementsByClassName('doc-theme-name')[0];
N.$DocInfoParagraphs = N.$DocInfoDialog.getElementsByClassName('paragraphs-number')[0];
N.$DocInfoSentences = N.$DocInfoDialog.getElementsByClassName('sentences-number')[0];
N.$DocInfoWords = N.$DocInfoDialog.getElementsByClassName('words-number')[0];
N.$DocInfoCharacters = N.$DocInfoDialog.getElementsByClassName('characters-number')[0];
N.$DocInfoCharactersSpaces = N.$DocInfoDialog.getElementsByClassName('characters-spaces-number')[0];

N.$AboutDialog = document.getElementById('about-dialog_unc2741');

N.$UnsavedDocsDialog = document.getElementById('unsaved-docs-dialog_unc2741');


N.arrDocs = [];
N.DocActive;

N.intDocIDsCount = -1;
N.intCurrentDocs = 0;

N.strLastHTMLCopied = '';
N.strLastHTMLPasted = '';
N.strLastHTMLDragged = '';
N.timerInput;
N.timerClipboard;
// N.boolCanDrop always "false" by default
N.boolCanDrop = false;

N.LastContextMenuElementInfo;
N.RegExpHeading = new RegExp(/^h\d$/, 'i');

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
