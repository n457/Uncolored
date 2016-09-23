(() => {

  const $SearchInputContainer = N.$SearchInput.parentNode;
  const $ReplaceInputContainer = N.$ReplaceInput.parentNode;
  const $SwitchCaseSensitive = N.$SearchDialog.querySelector('[for="switch-search-case-sensitive"]');

  let LastSearchRegExp;
  let Search = {};



  const funcMakeSearchRegExp = () => {
    let strRegExpFlags = 'g';
    if ( ! $SwitchCaseSensitive.classList.contains('is-checked')) {
      strRegExpFlags += 'i';
    }
    LastSearchRegExp = new RegExp(`(${N.Functions.Utils.funcEscapeStringRegexp({ strRegExp: N.$SearchInput.value })})`, strRegExpFlags);
  };


  const funcFindAll = () => {
    Search = findAndReplaceDOMText(N.DocActive.$ContentEditable, {
      find: LastSearchRegExp,

      replace: function(Portion, Match) {
        const $Searchresult = document.createElement('searchresult');
        $Searchresult.dataset.match = Match.index;
        $Searchresult.textContent = Portion.text;
        return $Searchresult;
      }
    });
  };


  const funcReplaceAll = () => {
    let strReplace = N.$ReplaceInput.value;
    if (! strReplace) {
      // findAndReplaceDOMText() doesn't accept empty value, but replace ' ' by an empty value
      strReplace = ' ';
    }

    findAndReplaceDOMText(N.DocActive.$ContentEditable, {
      find: LastSearchRegExp,
      replace: strReplace
    });
  };


  const funcFindReplaceController = (Parameter) => {
    if (N.$SearchInput.value) {
      $SearchInputContainer.classList.remove('is-invalid');

      if (Parameter.strMode === 'find-all') {
        N.Functions.Editor.funcCleanSearch({ Document: N.DocActive });
        funcMakeSearchRegExp();
        funcFindAll();
        N.$SearchResultsTotal.textContent = Search.reverts.length;
      }

      else if (Parameter.strMode === 'replace-all') {
        N.Functions.Editor.funcCleanSearch({ Document: N.DocActive });
        funcMakeSearchRegExp();
        funcReplaceAll();

        N.Functions.Utils.funcTriggerEvent({
          strEvent: 'input',
          $Element: N.DocActive.$ContentEditable
        });

        N.$SearchResultsTotal.textContent = '0';
      }
    }
    else {
      $SearchInputContainer.classList.add('is-invalid');
    }
  };


  N.$SearchDialog.getElementsByClassName('find-all-button')[0].addEventListener('click', () => {
    funcFindReplaceController({ strMode: 'find-all' });
  });
  N.$SearchDialog.getElementsByClassName('replace-all-button')[0].addEventListener('click', () => {
    funcFindReplaceController({ strMode: 'replace-all' });
  });

})();
