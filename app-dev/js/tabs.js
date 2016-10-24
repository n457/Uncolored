(() => {

  let timerHeaderVisible;
  const funcShowHeader = (Parameter) => {
    N.$Header.classList.add('active');

    clearTimeout(timerHeaderVisible);
    timerHeaderVisible = setTimeout(() => {
      N.$Header.classList.remove('active');
      clearTimeout(timerHeaderVisible);
    }, Parameter.flDelay);
  };



  document.getElementById('menu-new-doc_unc2741').addEventListener('click', () => {
    new Document();
  });
  N.$TabsList.addEventListener('dblclick', () => {
    new Document();
  });
  N.$Header.getElementsByClassName('add-tab-button')[0].addEventListener('click', () => {
    new Document();
  });
  // bind() doesn't work in any text fields. An official plugin 'global bind' allows that.
  Mousetrap.bindGlobal(['mod+n', 'mod+t'], () => {
    new Document();
  });

  N.$TabsList.addEventListener('mousewheel', (Event) => {
    N.$TabsList.scrollLeft -= Event.wheelDelta;
  });



  document.getElementById('menu-open-doc_unc2741').addEventListener('click', () => {
    N.Functions.Documents.funcOpenDialog();
  });
  Mousetrap.bindGlobal('mod+o', () => {
    N.Functions.Documents.funcOpenDialog();
  });


  Mousetrap.bindGlobal('mod+w', () => {
    N.DocActive.methClose();
  });


  document.getElementById('menu-close-all-docs_unc2741').addEventListener('click', () => {
    N.Functions.Documents.funcCloseAll();
  });
  Mousetrap.bindGlobal('mod+shift+w', () => {
    N.Functions.Documents.funcCloseAll();
  });



  Mousetrap.bindGlobal('ctrl+tab', () => {
    funcShowHeader({ flDelay: 2000 });

    // Click on the concerned tab only if there are more than 1 tab opened
    if (N.intCurrentDocs > 1) {
      let $NextTab = N.DocActive.$Tab.nextElementSibling;
      if ( ! $NextTab) {
        $NextTab = N.$TabsList.firstElementChild;
      }
      N.$TabsList.scrollLeft = $NextTab.offsetLeft - 120;
      $NextTab.click();
    }
  });

  Mousetrap.bindGlobal('ctrl+shift+tab', () => {
    funcShowHeader({ flDelay: 2000 });

    // Click on the concerned tab only if there are more than 1 tab opened
    if (N.intCurrentDocs > 1) {
      let $PreviousTab = N.DocActive.$Tab.previousElementSibling;
      if ( ! $PreviousTab) {
        // Warning : N.$TabsList must contain ONLY usable tabs, otherwise the script won't work.
        $PreviousTab = N.$TabsList.lastElementChild;
      }
      N.$TabsList.scrollLeft = $PreviousTab.offsetLeft - N.$TabsList.offsetWidth + $PreviousTab.offsetWidth + 120;
      $PreviousTab.click();
    }
  });



  N.$UnsavedDocsDialog.getElementsByClassName('force-close-all')[0].addEventListener('click', () => {
    N.Functions.Documents.funcCloseAll({ boolForceAction: true });
  });
  N.$UnsavedDocsDialog.getElementsByClassName('cancel-all')[0].addEventListener('click', () => {
    forEach(N.$TabsList.getElementsByClassName('tab'), ($Tab) => {
      $Tab.classList.remove('close-confirm');
    });
  });



  Sortable.create(N.$TabsList, {
    delay: 10,
    animation: 150
  });



  new Document();

})();
