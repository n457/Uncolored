(() => {

  const $MinorInfoBar = document.getElementById('minor-info-bar_unc2741');

  const $ContextMenuLinkOpen = N.$ContextMenu.querySelector('.a-view .open a');
  const $ContextMenuAnchorGoTo = N.$ContextMenu.getElementsByClassName('go-to-anchor')[0];
  const $ContextMenuImgOpen = N.$ContextMenu.querySelector('.img-view .open a');

  const $PreviewLarge = document.getElementById('preview-large_unc2741');
  const $PreviewLargeImg = $PreviewLarge.getElementsByTagName('img')[0];



  const funcFindRealTarget = (Parameter) => {
    let $Target = Parameter.$ElementBase;

    while (
      $Target.tagName !== 'A'
      && $Target.tagName !== 'IMG'
      && ! N.RegExpHeading.test($Target.tagName)
      && ! $Target.classList.contains('emoji')
      && ! $Target.classList.contains('preview-list-item')
      && ! $Target.classList.contains('tab')
      && $Target !== N.$Workspace
      && $Target !== document.body
    ) {
      $Target = $Target.parentNode;
    }

    if (
      $Target.tagName === 'A'
      || $Target.tagName === 'IMG'
      || N.RegExpHeading.test($Target.tagName)
      || $Target.classList.contains('emoji')
      || $Target.classList.contains('preview-list-item')
      || $Target.classList.contains('tab')
      || $Target === N.$Workspace
    ) {
      let TargetInfo = {};

      if ($Target.tagName === 'A') {
        // http://stackoverflow.com/questions/3861076/how-can-i-extract-text-after-hash-in-the-href-part-from-a-tag/3861095#3861095
        if ($Target.hash) {
          TargetInfo = {
            $Target: $Target,
            strTargetType: 'anchor-link',
            strTargetValue: $Target.hash
          };
        } else {
          TargetInfo = {
            $Target: $Target,
            strTargetType: 'a',
            strTargetValue: $Target.href
          };
        }
      }
      else if ($Target.tagName === 'IMG') {
        TargetInfo = {
          $Target: $Target,
          strTargetType: 'img',
          strTargetValue: $Target.src
        };
      }
      else if (N.RegExpHeading.test($Target.tagName)) {
        TargetInfo = {
          $Target: $Target,
          strTargetType: 'anchor',
          strTargetValue: '#' + $Target.id
        };
      }
      else if ($Target.classList.contains('emoji')) {
        TargetInfo = {
          $Target: $Target,
          strTargetType: 'emoji',
          strTargetValue: $Target.getElementsByClassName('emoji-text')[0].textContent
        };
      }
      else if ($Target.classList.contains('preview-list-item')) {
        TargetInfo = {
          $Target: $Target,
          strTargetType: 'preview-list-item',
          strTargetValue: $Target.getElementsByTagName('img')[0].src
        };
      }
      else if ($Target.classList.contains('tab')) {
        TargetInfo = {
          $Target: $Target,
          strTargetType: 'tab',
          strTargetValue: N.arrDocs[$Target.dataset.id].strPath
        };
      }
      else if ($Target === N.$Workspace) {
        TargetInfo = {
          $Target: $Target,
          strTargetType: 'text',
          strTargetValue: null
        };
      }

      return TargetInfo;
    } else {
      return null;
    }
  };



  const funcPositionElementContext = (Parameters) => {
    if (Parameters.Event.pageX < window.innerWidth / 2) {
      Parameters.$Element.style.left = Parameters.Event.pageX + 'px';
    } else {
      Parameters.$Element.style.left = (Parameters.Event.pageX - Parameters.$Element.offsetWidth) + 'px';
    }

    if (Parameters.Event.pageY < window.innerHeight / 2) {
      Parameters.$Element.style.top = Parameters.Event.pageY + 'px';
    } else {
      Parameters.$Element.style.top = (Parameters.Event.pageY - Parameters.$Element.offsetHeight) + 'px';
    }
  };



  document.addEventListener('click', (Event) => {
    if ( ! Event.target.classList.contains('menu-list-item')) {
      N.$ContextMenu.classList.remove('active');
    }
  });



  document.addEventListener('mousemove', (Event) => {
    const TargetInfo = funcFindRealTarget({ $ElementBase: Event.target });

    if (TargetInfo && TargetInfo.strTargetValue) {

      if (TargetInfo.$Target.classList.contains('no-info-bar') || TargetInfo.$Target.classList.contains('no-context-info')) {
        $MinorInfoBar.classList.remove('active');
      } else {
        $MinorInfoBar.textContent = TargetInfo.strTargetValue;
        $MinorInfoBar.classList.add('active');
      }

      if (TargetInfo.strTargetType === 'preview-list-item') {
        $PreviewLargeImg.src = TargetInfo.strTargetValue;
        funcPositionElementContext({
          $Element: $PreviewLarge,
          Event: Event
        });
        $PreviewLarge.classList.add('active');
      } else {
        $PreviewLarge.classList.remove('active');
      }

    } else {
      $MinorInfoBar.classList.remove('active');
      $PreviewLarge.classList.remove('active');
    }
  });


  document.addEventListener('contextmenu', (Event) => {
    const TargetInfo = funcFindRealTarget({ $ElementBase: Event.target });

    if (TargetInfo) {

      if (TargetInfo.$Target.classList.contains('no-context-menu') || TargetInfo.$Target.classList.contains('no-context-info')) {
        N.$ContextMenu.classList.remove('active');
      }
      else {
        N.$ContextMenu.dataset.target = TargetInfo.strTargetType;

        // No need to check TargetInfo.strTargetValue, the user can't directly add an empty value and the document content is cleared at input.

        if (TargetInfo.strTargetType === 'a') {
          $ContextMenuLinkOpen.href = TargetInfo.strTargetValue;
        }
        else if (TargetInfo.strTargetType === 'anchor-link') {
          $ContextMenuAnchorGoTo.dataset.anchor = TargetInfo.strTargetValue;
        }
        else if (TargetInfo.strTargetType === 'img') {
          $ContextMenuImgOpen.href = TargetInfo.strTargetValue;
        }
        else if (TargetInfo.strTargetType === 'tab') {
          N.$Header.classList.add('active');
        }

        funcPositionElementContext({
          $Element: N.$ContextMenu,
          Event: Event
        });

        N.$ContextMenu.classList.add('active');

        N.LastContextMenuElementInfo = TargetInfo;

        // Toolbar and context menu must not be visible at the same time.
        N.Functions.Toolbar.funcResetView();
        N.$Toolbar.classList.remove('active');
      }
    } else {
      N.$ContextMenu.classList.remove('active');
    }
  });



  N.$ContextMenu.addEventListener('mousedown', (Event) => {
    Event.preventDefault();
  });


  forEach(N.$ContextMenu.querySelectorAll('li.copy'), ($Item) => {
    $Item.addEventListener('click', () => {
      N.$ContextMenu.classList.remove('active');
      N.ElectronFramework.Clipboard.writeText(N.LastContextMenuElementInfo.strTargetValue);
    });
  });

  forEach(N.$ContextMenu.querySelectorAll('li.open'), ($Item) => {
    $Item.addEventListener('click', () => {
      N.$ContextMenu.classList.remove('active');
    });
  });

  N.$ContextMenu.getElementsByClassName('close-tabs')[0].addEventListener('click', () => {
    N.$ContextMenu.classList.remove('active');
    N.Functions.Documents.funcCloseAll();
  });

  N.$ContextMenu.getElementsByClassName('select-all')[0].addEventListener('click', () => {
    N.$ContextMenu.classList.remove('active');
    document.execCommand('selectAll');
  });
  N.$ContextMenu.getElementsByClassName('copy-selection')[0].addEventListener('click', () => {
    N.$ContextMenu.classList.remove('active');
    document.execCommand('copy');
  });
  N.$ContextMenu.getElementsByClassName('paste')[0].addEventListener('click', () => {
    N.$ContextMenu.classList.remove('active');
    document.execCommand('paste');
  });


  $ContextMenuAnchorGoTo.addEventListener('click', () => {
    N.$ContextMenu.classList.remove('active');

    const $Anchor = document.querySelector($ContextMenuAnchorGoTo.dataset.anchor);
    if ($Anchor) {
      zenscroll.createScroller(N.DocActive.$ContentContainer).center($Anchor);
    }
  });

})();
