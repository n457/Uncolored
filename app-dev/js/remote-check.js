(() => {

  const $AboutDialog = document.getElementById('about-dialog');
  const $AppCurrentVersion = $AboutDialog.getElementsByClassName('app-version')[0];

  const $NewUpdateDialog = document.getElementById('new-update-dialog');
  const $AppRemoteVersion = $NewUpdateDialog.getElementsByClassName('last-version')[0];
  const $RemoteReleaseNotes = $NewUpdateDialog.getElementsByClassName('release-notes')[0];

  const $RemotePriorityInfo = document.getElementById('priority-info-dialog').getElementsByClassName('mdl-card__supporting-text')[0];


  const funcUpdateCheck = () => {
    $AboutDialog.dataset.state = 'loading';

    N.Functions.Remote.funcGetUpdateInfo({
      funcOnSuccess: (UpdateCheckResult) => {
        if (UpdateCheckResult.boolUpdateAvailable) {
          $AppRemoteVersion.textContent = UpdateCheckResult.strRemoteLastestVersion;
          $RemoteReleaseNotes.innerHTML = UpdateCheckResult.strRemoteReleaseNotesHTML;
          $AboutDialog.dataset.state = 'new-update';
          N.Functions.Dialogs.funcShow({ strDialogSlug: 'new-update' });
        } else {
          $AboutDialog.dataset.state = 'up-to-date';
        }
      },
      funcOnError: (Error) => {
        $AboutDialog.dataset.state = 'error';
      }
    });
  };

  const funcPriorityInfoCheck = () => {
    N.Functions.Remote.funcGetPriorityInfo({
      funcOnSuccess: (PriorityInfoResult) => {
        if (PriorityInfoResult.strRemotePriorityInfoHTML !== '') {
          $RemotePriorityInfo.innerHTML = PriorityInfoResult.strRemotePriorityInfoHTML;
          N.Functions.Dialogs.funcShow({ strDialogSlug: 'priority-info' });
        }
      },
      funcOnError: (Error) => {}
    });
  };


  $AboutDialog.getElementsByClassName('show-update-dialog')[0].addEventListener('click', () => {
    N.Functions.Dialogs.funcShow({ strDialogSlug: 'new-update' });
  });

  $AboutDialog.getElementsByClassName('recheck')[0].addEventListener('click', () => {
    funcUpdateCheck();
  });


  $AppCurrentVersion.textContent = N.strAppVersion;


  if (N.Settings.boolAutoUpdateCheck) {
    funcUpdateCheck();
  }

  let timerPriorityInfoCheck;
  timerPriorityInfoCheck = setTimeout(() => {
    funcPriorityInfoCheck();
    clearTimeout(timerPriorityInfoCheck);
  }, 4000);

})();
