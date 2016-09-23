N.Functions.Dialogs = {};


N.Functions.Dialogs.funcShow = (Parameter) => {
  if (N.strDialogActiveSlug === 'search') {
    N.Functions.Editor.funcCleanSearch({ Document: N.DocActive });
  }

  document.body.dataset.dialog = Parameter.strDialogSlug;
  N.strDialogActiveSlug = Parameter.strDialogSlug;

  if (N.strDialogActiveSlug) {
    N.$DialogActive = document.getElementById(`${N.strDialogActiveSlug}-dialog`);
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
    && N.strDialogActiveSlug !== 'doc-info'
    && N.strDialogActiveSlug !== 'unsaved-docs'
    && N.strDialogActiveSlug !== 'new-update'
    && N.strDialogActiveSlug !== 'priority-info'
    && N.strDialogActiveSlug !== 'io-error'
  ) {
    N.Functions.Dialogs.funcCloseCurrent();
  }
};
