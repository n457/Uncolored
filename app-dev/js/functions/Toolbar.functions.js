N.Functions.Toolbar = {};


N.Functions.Toolbar.funcAutoPosition = () => {
  const Range = lightrange.getSelectionInfo();
  const intToolsWidth = N.$Toolbar.offsetWidth;

  let intToolsTop = Range.yStart - N.$Toolbar.offsetHeight - 4;
  if (intToolsTop < 0) {
    intToolsTop = Range.yStart + Range.height + 5;
  }
  N.$Toolbar.style.top = intToolsTop + 'px';


  let intToolsLeft = Range.xStart + (Range.width / 2 - intToolsWidth / 2);
  if (intToolsLeft < 7) {
    intToolsLeft = 7;
  }
  else {
    const intWindowRightLimit = window.innerWidth - 12;
    if (intToolsLeft + intToolsWidth > intWindowRightLimit) {
      intToolsLeft = intWindowRightLimit - intToolsWidth;
    }
  }
  N.$Toolbar.style.left = intToolsLeft + 'px';


  // To know if the selection is a range or a caret, for displaying the toolbar or not
  return Range;
};


N.Functions.Toolbar.funcResetPosition = () => {
  N.$Toolbar.style.top = '7px';
  N.$Toolbar.style.left = '7px';
};


N.Functions.Toolbar.funcView = () => {
  N.$Toolbar.dataset.view = 'tools-list';

  if (N.Functions.Toolbar.funcAutoPosition().characters) {
    N.$Toolbar.classList.add('active');
  } else {
    N.$Toolbar.classList.remove('active');
  }
};


N.Functions.Toolbar.funcResetView = () => {
  lightrange.restoreSelection(N.DocActive.LastSelection);
  N.$Toolbar.dataset.view = 'tools-list';
  N.Functions.Toolbar.funcAutoPosition();
};


N.Functions.Toolbar.funcCheckTools = () => {
  forEach(N.$Toolbar.getElementsByTagName('li'), ($Button) => {
    if ($Button.dataset.cmd) {
      if ($Button.dataset.cmdcheck) {
        if (document.queryCommandState($Button.dataset.cmdcheck)) {
          $Button.classList.add('active');
        } else {
          $Button.classList.remove('active');
        }
      } else {
        if (document.queryCommandState($Button.dataset.cmd)) {
          $Button.classList.add('active');
        } else {
          $Button.classList.remove('active');
        }
      }
    } else if ($Button.dataset.tag) {
      if (document.queryCommandValue('formatBlock') === $Button.dataset.tag) {
        $Button.classList.add('active');
      } else {
        $Button.classList.remove('active');
      }
    }
  });

  if (N.$ToolQuote.classList.contains('active') || N.$ToolH1.classList.contains('active') || N.$ToolH2.classList.contains('active') || N.$ToolH3.classList.contains('active') || N.$ToolH4.classList.contains('active') || N.$ToolH5.classList.contains('active') || N.$ToolH6.classList.contains('active') ) {
    N.$ToolUnorderedList.classList.add('disabled');
    N.$ToolOrderedList.classList.add('disabled');
  } else {
    N.$ToolUnorderedList.classList.remove('disabled');
    N.$ToolOrderedList.classList.remove('disabled');
  }

  if (N.$ToolUnorderedList.classList.contains('active') || N.$ToolOrderedList.classList.contains('active')) {
    N.$ToolQuote.classList.add('disabled');
    N.$ToolH1.classList.add('disabled');
    N.$ToolH2.classList.add('disabled');
    N.$ToolH3.classList.add('disabled');
    N.$ToolH4.classList.add('disabled');
    N.$ToolH5.classList.add('disabled');
    N.$ToolH6.classList.add('disabled');
  } else {
    N.$ToolQuote.classList.remove('disabled');
    N.$ToolH1.classList.remove('disabled');
    N.$ToolH2.classList.remove('disabled');
    N.$ToolH3.classList.remove('disabled');
    N.$ToolH4.classList.remove('disabled');
    N.$ToolH5.classList.remove('disabled');
    N.$ToolH6.classList.remove('disabled');
  }
};
