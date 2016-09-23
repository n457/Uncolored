(() => {

  const $ToolParagraph = document.getElementById('tool-paragraph');
  const $ToolRemoteImage = document.getElementById('tool-remote-image');
  const $ToolRemoteVideo = document.getElementById('tool-remote-video');

  const $ToolBold = document.getElementById('tool-bold');
  const $ToolItalic = document.getElementById('tool-italic');
  const $ToolUnderline = document.getElementById('tool-underline');
  const $ToolStrike = document.getElementById('tool-strike');
  const $ToolApplyLink = document.getElementById('tool-apply-link');
  const $ToolSuperscript = document.getElementById('tool-superscript');
  const $ToolSubscript = document.getElementById('tool-subscript');
  const $ToolClear = document.getElementById('tool-clear');


  const $InputRemoteImage = N.$Toolbar.querySelector('.remote-image-view input');
  const $CancelRemoteImage = N.$Toolbar.querySelector('.remote-image-view .cancel-tool');
  const $ValidateRemoteImage = N.$Toolbar.querySelector('.remote-image-view .validate-tool');

  const $InputRemoteVideo = N.$Toolbar.querySelector('.remote-video-view input');
  const $CancelRemoteVideo = N.$Toolbar.querySelector('.remote-video-view .cancel-tool');
  const $ValidateRemoteVideo = N.$Toolbar.querySelector('.remote-video-view .validate-tool');

  const $InputApplyLink = N.$Toolbar.querySelector('.apply-link-view input');
  const $CancelApplyLink = N.$Toolbar.querySelector('.apply-link-view .cancel-tool');
  const $ValidateApplyLink = N.$Toolbar.querySelector('.apply-link-view .validate-tool');



  N.$Toolbar.addEventListener('mousedown', (Event) => {
    Event.preventDefault();
  });
  forEach(N.$Toolbar.getElementsByTagName('input'), ($Input) => {
    $Input.addEventListener('mousedown', (Event) => {
      Event.stopPropagation();
    });
  });


  forEach(N.$Toolbar.getElementsByTagName('li'), ($Button) => {
    $Button.addEventListener('click', () => {

      // Special behaviors handling
      let boolCanFormat = true;

      // Some tools incompatibilities with activated lists
      if (N.$ToolUnorderedList.classList.contains('active') || N.$ToolOrderedList.classList.contains('active')) {
        if (
          $Button === $ToolParagraph || $Button === N.$ToolQuote ||
          $Button === N.$ToolH1 || $Button === N.$ToolH2 || $Button === N.$ToolH3 || $Button === N.$ToolH4 || $Button === N.$ToolH5 || $Button === N.$ToolH6
        ) {
          boolCanFormat = false;
        }
      }

      // List tools incompatibilities with some activated tools
      if ($Button === N.$ToolUnorderedList || $Button === N.$ToolOrderedList) {
        if (
          N.$ToolQuote.classList.contains('active') || N.$ToolH1.classList.contains('active') || N.$ToolH2.classList.contains('active') || N.$ToolH3.classList.contains('active') || N.$ToolH4.classList.contains('active') || N.$ToolH5.classList.contains('active') || N.$ToolH6.classList.contains('active')
        ) {
          boolCanFormat = false;
        }
      }


      if (boolCanFormat) {
        if ($Button.dataset.cmd) {
          if ($Button.dataset.cmdparam) {
            // http://stackoverflow.com/questions/1723287/calling-a-javascript-function-named-in-a-variable
            N.DocActive.Editor[$Button.dataset.cmd]($Button.dataset.cmdparam);
          } else {
            N.DocActive.Editor[$Button.dataset.cmd]();
          }
        } else if ($Button.dataset.tag) {
          N.DocActive.Editor.format($Button.dataset.tag);
        } else {
          N.DocActive.LastSelection = lightrange.saveSelection();
          N.$Toolbar.dataset.view = $Button.id.replace('tool-', '');
          N.Functions.Toolbar.funcAutoPosition();

          if ($Button === $ToolRemoteImage) {
            $InputRemoteImage.select();
          }
          else if ($Button === $ToolRemoteVideo) {
            $InputRemoteVideo.select();
          }
          else if ($Button === $ToolApplyLink) {
            $InputApplyLink.select();
          }
        }

        N.Functions.Toolbar.funcCheckTools();
      }

    });
  });



  forEach(N.$Toolbar.getElementsByClassName('cancel-tool'), ($Button) => {
    $Button.addEventListener('click', () => {
      N.Functions.Toolbar.funcResetView();
    });
  });


  $ValidateRemoteImage.addEventListener('click', () => {
    if ($InputRemoteImage.value) {
      $InputRemoteImage.classList.remove('invalid');
      lightrange.restoreSelection(N.DocActive.LastSelection);
      N.DocActive.Editor.insertImage($InputRemoteImage.value + N.Functions.Utils.funcNoCacheSuffix());
      N.Functions.Toolbar.funcResetView();
    } else {
      $InputRemoteImage.classList.add('invalid');
    }
  });


  $ValidateRemoteVideo.addEventListener('click', () => {
    const ParsedURL = urlParser.parse($InputRemoteVideo.value);

    if (ParsedURL) {
      $InputRemoteVideo.classList.remove('invalid');

      lightrange.restoreSelection(N.DocActive.LastSelection);

      // Cleared & Embed URL
      const strEmbedURL = urlParser.create({
        videoInfo: ParsedURL,
        format: 'embed'
      });

      // All embed video player at the same dimensions : 560px x 315px, which is the YouTube dimensions.
      if (ParsedURL.provider === 'youtube' || ParsedURL.provider === 'vimeo' || ParsedURL.provider === 'dailymotion' || ParsedURL.provider === 'twitch') {
        let strProtocol = '';

        if (ParsedURL.provider === 'youtube' || ParsedURL.provider === 'vimeo') {
          strProtocol = 'https:';
        } else if (ParsedURL.provider === 'dailymotion') {
          strProtocol = 'http:';
        }

        N.DocActive.Editor.insertHTML(`<iframe src="${strProtocol}${strEmbedURL}" width="560" height="315" allowfullscreen></iframe>`);
      }

      N.Functions.Toolbar.funcResetView();
    }
    else {
      $InputRemoteVideo.classList.add('invalid');
    }
  });


  $ValidateApplyLink.addEventListener('click', () => {
    if ($InputApplyLink.value) {
      $InputApplyLink.classList.remove('invalid');
      lightrange.restoreSelection(N.DocActive.LastSelection);
      N.DocActive.Editor.insertLink($InputApplyLink.value);
      // N.Functions.Editor.funcEditLinkTags() is not needed here for the moment, but may be in a future release.
      N.Functions.Toolbar.funcResetView();
    } else {
      $InputApplyLink.classList.add('invalid');
    }
  });


  $InputRemoteImage.addEventListener('keyup', (Event) => {
    // Enter
    if (Event.keyCode === 13) {
      $ValidateRemoteImage.click();
    }
    // Escape
    else if (Event.keyCode === 27) {
      $CancelRemoteImage.click();
    }
  });

  $InputRemoteVideo.addEventListener('keyup', (Event) => {
    // Enter
    if (Event.keyCode === 13) {
      $ValidateRemoteVideo.click();
    }
    // Escape
    else if (Event.keyCode === 27) {
      $CancelRemoteVideo.click();
    }
  });

  $InputApplyLink.addEventListener('keyup', (Event) => {
    // Enter
    if (Event.keyCode === 13) {
      $ValidateApplyLink.click();
    }
    // Escape
    else if (Event.keyCode === 27) {
      $CancelApplyLink.click();
    }
  });



  Mousetrap.bindGlobal('mod+1', () => {
    N.$ToolH1.click();
  });
  Mousetrap.bindGlobal('mod+2', () => {
    N.$ToolH2.click();
  });
  Mousetrap.bindGlobal('mod+3', () => {
    N.$ToolH3.click();
  });
  Mousetrap.bindGlobal('mod+4', () => {
    N.$ToolH4.click();
  });
  Mousetrap.bindGlobal('mod+5', () => {
    N.$ToolH5.click();
  });
  Mousetrap.bindGlobal('mod+6', () => {
    N.$ToolH6.click();
  });

  Mousetrap.bindGlobal('mod+shift+p', () => {
    $ToolParagraph.click();
  });
  Mousetrap.bindGlobal('mod+shift+q', () => {
    N.$ToolQuote.click();
  });
  Mousetrap.bindGlobal('mod+shift+l', () => {
    N.$ToolUnorderedList.click();
  });
  Mousetrap.bindGlobal('mod+alt+l', () => {
    N.$ToolOrderedList.click();
  });
  Mousetrap.bindGlobal('mod+alt+i', () => {
    N.$Toolbar.classList.add('active');
    $ToolRemoteImage.click();
  });
  Mousetrap.bindGlobal('mod+alt+v', () => {
    N.$Toolbar.classList.add('active');
    $ToolRemoteVideo.click();
    // Prevent triggering the paste event
    return false;
  });

  Mousetrap.bindGlobal('mod+b', () => {
    $ToolBold.click();
    // Prevent the Chromium default shortcut
    return false;
  });
  Mousetrap.bindGlobal('mod+i', () => {
    $ToolItalic.click();
    return false;
  });
  Mousetrap.bindGlobal('mod+u', () => {
    $ToolUnderline.click();
    return false;
  });
  Mousetrap.bindGlobal('mod+alt+s', () => {
    $ToolStrike.click();
  });
  Mousetrap.bindGlobal('mod+l', () => {
    N.$Toolbar.classList.add('active');
    $ToolApplyLink.click();
  });
  Mousetrap.bindGlobal('mod+shift+up', () => {
    $ToolSuperscript.click();
  });
  Mousetrap.bindGlobal('mod+shift+down', () => {
    $ToolSubscript.click();
  });
  Mousetrap.bindGlobal('mod+shift+c', () => {
    $ToolClear.click();
  });

})();
