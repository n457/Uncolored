N.Functions.Dialogs = {};


N.Functions.Dialogs.funcShow = (Parameter) => {
  if (N.strDialogActiveSlug === 'search') {
    N.Functions.Content.funcCleanSearch({ Document: N.DocActive });
  }

  document.body.dataset.dialog = Parameter.strDialogSlug;
  N.strDialogActiveSlug = Parameter.strDialogSlug;

  if (N.strDialogActiveSlug) {
    N.$DialogActive = document.getElementById(`${N.strDialogActiveSlug}-dialog_unc2741`);
  } else {
    N.$DialogActive = null;
  }

  N.$Toolbar.classList.remove('active');
};


N.Functions.Dialogs.funcValidateCurrent = () => {
  if (N.strDialogActiveSlug) {
    const $RaisedButton = N.$DialogActive.getElementsByClassName('mdl-button--raised')[0];
    if ($RaisedButton) {
      $RaisedButton.click();
    }
  }
};


N.Functions.Dialogs.funcCloseCurrent = () => {
  if (N.strDialogActiveSlug) {
    // In every dialog, there is at least one .close-dialog-button
    N.$DialogActive.getElementsByClassName('close-dialog-button')[0].click();
  }
};


N.Functions.Dialogs.funcForceClose = () => {
  N.Functions.Dialogs.funcShow({ strDialogSlug: '' });
};


N.Functions.Dialogs.funcCloseContext = () => {
  if (
    N.strDialogActiveSlug
    && N.strDialogActiveSlug !== 'table-content'
    && N.strDialogActiveSlug !== 'doc-info'
    && N.strDialogActiveSlug !== 'unsaved-docs'
    && N.strDialogActiveSlug !== 'new-update'
    && N.strDialogActiveSlug !== 'priority-info'
    && N.strDialogActiveSlug !== 'io-error'
  ) {
    N.Functions.Dialogs.funcCloseCurrent();
  }
};



N.Functions.Dialogs.funcUpdateTableContent = () => {
  N.$HeadingsList.innerHTML = '';
  const arrDocHeadings = N.DocActive.$ContentEditable.querySelectorAll('h1, h2, h3, h4, h5, h6');

  if (arrDocHeadings.length) {
    N.Functions.Content.funcSetHeadingsIDs({ Document: N.DocActive });

    forEach(arrDocHeadings, ($H) => {
      const intHeadingLevel = parseInt($H.tagName.slice(-1));
      let strHeadingLevel = '';
      switch (intHeadingLevel) {
        case 1:
          strHeadingLevel = 'XL';
          break;
        case 2:
          strHeadingLevel = 'L';
          break;
        case 3:
          strHeadingLevel = 'M';
          break;
        case 4:
          strHeadingLevel = 'S';
          break;
        case 5:
          strHeadingLevel = 'XS';
          break;
        case 6:
          strHeadingLevel = 'XXS';
          break;
      }

      const $HeadingItem = N.$TableContentHeadingModel.cloneNode(true);
      $HeadingItem.getElementsByClassName('mdl-list__item-primary-content')[0].textContent = $H.textContent;
      $HeadingItem.getElementsByClassName('mdl-list__item-secondary-action')[0].textContent = strHeadingLevel;
      $HeadingItem.dataset.anchor = '#' + $H.id;


      $HeadingItem.addEventListener('click', () => {
        const $Anchor = document.querySelector($HeadingItem.dataset.anchor);
        if ($Anchor) {
          zenscroll.createScroller(N.DocActive.$ContentContainer).center($Anchor);
        }
      });

      N.$HeadingsList.appendChild($HeadingItem);
    });

    N.$TableContentDialog.dataset.view = 'headings-list';
  }
  else {
    N.$TableContentDialog.dataset.view = 'no-headings';
  }
};



N.Functions.Dialogs.funcUpdateDocInfo = () => {
  if (N.DocActive.strDocThemeName) {
    N.$DocInfoThemeName.textContent = N.DocActive.strDocThemeName;
  } else {
    N.$DocInfoThemeName.textContent = '—';
  }

  Countable.once(N.DocActive.$ContentEditable, (Counter) => {
    N.$DocInfoParagraphs.textContent = Counter.paragraphs;
    N.$DocInfoSentences.textContent = Counter.sentences;
    N.$DocInfoWords.textContent = Counter.words;
    N.$DocInfoCharacters.textContent = Counter.characters;
    N.$DocInfoCharactersSpaces.textContent = Counter.all;
  });
};
