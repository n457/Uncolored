(() => {

  const $MinorInfoBar = document.getElementById('minor-info-bar');

  const $ContextMenu = document.getElementById('context-menu');
  const $ContextMenuLinkOpen = $ContextMenu.querySelector('.a-view .open .inner-container');
  const $ContextMenuImgOpen = $ContextMenu.querySelector('.img-view .open .inner-container');

  const $PreviewLarge = document.getElementById('preview-large');
  const $PreviewLargeImg = $PreviewLarge.getElementsByTagName('img')[0];



  const funcFindRealTarget = (Parameter) => {
    let $Target = Parameter.$ElementBase;

    while (
      ! $Target.classList.contains('tab')
      && $Target.tagName !== 'A'
      && $Target.tagName !== 'IMG'
      && ! $Target.classList.contains('emoji')
      && ! $Target.classList.contains('preview-list-item')
      && $Target !== document.body
    ) {
      $Target = $Target.parentNode;
    }

    if (
      $Target.classList.contains('tab')
      || $Target.tagName === 'A'
      || $Target.tagName === 'IMG'
      || $Target.classList.contains('emoji')
      || $Target.classList.contains('preview-list-item')
    ) {
      let TargetInfo = {};

      if ($Target.classList.contains('tab')) {
        TargetInfo = {
          $Target: $Target,
          strTargetType: 'tab',
          strTargetValue: N.arrDocs[$Target.dataset.id].strPath
        };
      }
      else if ($Target.tagName === 'A') {
        TargetInfo = {
          $Target: $Target,
          strTargetType: 'a',
          strTargetValue: $Target.href
        };
      }
      else if ($Target.tagName === 'IMG') {
        TargetInfo = {
          $Target: $Target,
          strTargetType: 'img',
          strTargetValue: $Target.src
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
    if ( ! Event.target.classList.contains('inner-container')) {
      $ContextMenu.classList.remove('active');
    }
  });



  document.addEventListener('mousemove', (Event) => {
    const TargetInfo = funcFindRealTarget({ $ElementBase: Event.target });

    if (TargetInfo && TargetInfo.strTargetValue) {

      if ( ! TargetInfo.$Target.classList.contains('no-info-bar') ) {
        $MinorInfoBar.textContent = TargetInfo.strTargetValue;
        $MinorInfoBar.classList.add('active');
      } else {
        $MinorInfoBar.classList.remove('active');
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

    if (TargetInfo && ! TargetInfo.$Target.classList.contains('no-context-menu') ) {
      $ContextMenu.dataset.target = TargetInfo.strTargetType;

      // No need to check TargetInfo.strTargetValue, the user can't directly add an empty value and the document content is cleared at input.
      if (TargetInfo.strTargetType === 'tab') {
        N.$Header.classList.add('active');
      }
      else if (TargetInfo.strTargetType === 'a') {
        $ContextMenuLinkOpen.href = TargetInfo.strTargetValue;
      }
      else if (TargetInfo.strTargetType === 'img') {
        $ContextMenuImgOpen.href = TargetInfo.strTargetValue;
      }

      funcPositionElementContext({
        $Element: $ContextMenu,
        Event: Event
      });

      $ContextMenu.classList.add('active');

      N.LastContextMenuElementInfo = TargetInfo;
    } else {
      $ContextMenu.classList.remove('active');
    }
  });



  forEach($ContextMenu.querySelectorAll('li.copy'), ($Item) => {
    $Item.addEventListener('click', () => {
      $ContextMenu.classList.remove('active');
      N.ElectronFramework.Clipboard.writeText(N.LastContextMenuElementInfo.strTargetValue);
    });
  });

  forEach($ContextMenu.querySelectorAll('li.open'), ($Item) => {
    $Item.addEventListener('click', () => {
      $ContextMenu.classList.remove('active');
    });
  });

  $ContextMenu.getElementsByClassName('close-tabs')[0].addEventListener('click', () => {
    $ContextMenu.classList.remove('active');
    N.Functions.Documents.funcCloseAll();
  });

})();
