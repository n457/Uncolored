N.Functions.Editor = {};


N.Functions.Editor.funcEditLinkTags = (Parameter) => {
  forEach(Parameter.Document.$ContentEditable.getElementsByTagName('a'), ($A) => {
    $A.removeAttribute('target');
  });
};

N.Functions.Editor.funcDisplayEmojis = (Parameter) => {
  emojify.run(Parameter.Document.$ContentEditable);

  forEach(Parameter.Document.$ContentEditable.getElementsByClassName('emoji'), ($Emoji) => {
    if ( ! $Emoji.getElementsByClassName('emoji-text').length) {
      const $Span = document.createElement('span');
      $Span.innerHTML = $Emoji.title;
      $Span.classList.add('emoji-text');
      $Emoji.appendChild($Span);
    }
    if ( ! $Emoji.hasAttribute('contenteditable')) {
      $Emoji.removeAttribute('title');
      $Emoji.setAttribute('contenteditable', 'false');
    }
  });
};


N.Functions.Editor.funcClearHTML = (Parameter) => {
  // Must use while : outerHTML = innerHTML cause issues with for/forEach loops

  // It happens that the editor outputs some <div>. But we want <p> instead.
  while (Parameter.Document.$ContentEditable.getElementsByTagName('div').length) {
    forEach(Parameter.Document.$ContentEditable.getElementsByTagName('div'), ($Div) => {
      if ($Div) {
        $Div.outerHTML = '<p>' + $Div.innerHTML + '</p>';
      }
    });
  }

  // It happens that the editor outputs some <span>. But we want only .emoji
  while (Parameter.Document.$ContentEditable.querySelectorAll('span:not(.emoji):not(.emoji-text), a:not([href])').length) {
    forEach(Parameter.Document.$ContentEditable.querySelectorAll('span:not(.emoji):not(.emoji-text), a:not([href])'), ($Element) => {
      if ($Element) {
        $Element.outerHTML = $Element.innerHTML;
      }
    });
  }

  // The to-markdown lib returns id attributes for titles, which is good for markdown docs, but we don't want that for this version. Full support in next releases.
  // It happens that the editor outputs some element with [style], we don't want this attribute.
  forEach(Parameter.Document.$ContentEditable.querySelectorAll('[id], [style]'), ($Element) => {
    $Element.removeAttribute('id');
    $Element.removeAttribute('style');
  });

  // See N.Functions.Utils.funcPurifyHTML() for a better comprehension

  forEach(Parameter.Document.$ContentEditable.querySelectorAll('[href]:not(a)'), ($Element) => {
    $Element.removeAttribute('href');
  });

  forEach(Parameter.Document.$ContentEditable.querySelectorAll('[src]:not(img):not(iframe)'), ($Element) => {
    $Element.removeAttribute('src');
  });
  forEach(Parameter.Document.$ContentEditable.querySelectorAll('img:not([src]), iframe:not([src])'), ($Element) => {
    $Element.parentNode.removeChild($Element);
  });

  forEach(Parameter.Document.$ContentEditable.querySelectorAll('[width]:not(iframe), [height]:not(iframe), [allowfullscreen]:not(iframe)'), ($Element) => {
    $Element.removeAttribute('width');
    $Element.removeAttribute('height');
    $Element.removeAttribute('allowfullscreen');
  });
};


N.Functions.Editor.funcCleanSearch = (Parameter) => {
  // Must use while : outerHTML = innerHTML cause issues with for/forEach loops
  while (Parameter.Document.$ContentEditable.getElementsByTagName('searchresult').length) {
    forEach(Parameter.Document.$ContentEditable.getElementsByTagName('searchresult'), ($Searchresult) => {
      if ($Searchresult) {
        $Searchresult.outerHTML = $Searchresult.innerHTML;
      }
    });
  }

  N.$SearchResultsTotal.textContent = '0';
};
