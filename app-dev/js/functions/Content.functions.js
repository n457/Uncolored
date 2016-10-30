N.Functions.Content = {};


N.Functions.Content.funcPurifyHTML = (Parameters) => {
  let arrAllowedTags = [];
  let arrAllowedAttr = [];

  if (Parameters.strAllowedContentMode === 'paste') {
    arrAllowedTags = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'ul', 'ol', 'li', 'img',
      'b', 'i', 'u', 'strike', 'a', 'sup', 'sub', 'br'
    ];
    arrAllowedAttr = [
      'src', 'href'
    ];
  }
  else if (Parameters.strAllowedContentMode === 'document') {
    arrAllowedTags = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'blockquote', 'ul', 'ol', 'li', 'img', 'iframe',
      'b', 'i', 'u', 'strike', 'a', 'sup', 'sub', 'br'
    ];
    arrAllowedAttr = [
      'src', 'href',
      'id',
      // For iframe only :
      'width', 'height', 'allowfullscreen'
    ];
  }
  else if (Parameters.strAllowedContentMode === 'embed') {
    arrAllowedTags = ['iframe'];
    arrAllowedAttr = [
      'src', 'width', 'height', 'allowfullscreen'
    ];
  }

  const PurifyParameters = { ALLOWED_TAGS: arrAllowedTags, ALLOWED_ATTR: arrAllowedAttr };

  return DOMPurify.sanitize(Parameters.strHTML, PurifyParameters);
};



N.Functions.Content.funcSetHeadingsIDs = (Parameter) => {
  forEach(Parameter.Document.$ContentEditable.querySelectorAll('h1, h2, h3, h4, h5, h6'), ($H) => {
    // From https://github.com/chjj/marked/blob/master/lib/marked.js#L800
    $H.id = $H.textContent.toLowerCase().replace(/[^\w]+/g, '-');
  });
};



N.Functions.Content.funcDisplayEmojis = (Parameter) => {
  // https://github.com/Ranks/emojify.js#browser
  emojify.run(Parameter.Document.$ContentEditable, (strEmojiSymbol, strEmojiName) => {
    const $Span = document.createElement('span');
    $Span.classList.add('emoji');
    $Span.classList.add('emoji-' + strEmojiName);
    $Span.setAttribute('contenteditable', 'false');

    const $SpanInner = document.createElement('span');
    $SpanInner.classList.add('emoji-text');
    $SpanInner.innerHTML = ':' + strEmojiName + ':';

    $Span.appendChild($SpanInner);

    return $Span;
  });

  forEach(Parameter.Document.$ContentEditable.getElementsByClassName('emoji'), ($Emoji) => {
    $Emoji.setAttribute('contenteditable', 'false');
  });
};



N.Functions.Content.funcClearHTMLForHTMLExport = (Parameter) => {
  // Selecting all links exept those with [href] starting with "#" (anchor links)
  forEach(Parameter.$ContentEditable.querySelectorAll('a:not([href^="#"])'), ($A) => {
    $A.target = '_blank';
  });

  forEach(Parameter.$ContentEditable.getElementsByClassName('emoji'), ($Emoji) => {
    $Emoji.removeAttribute('contenteditable');
    $Emoji.title = $Emoji.getElementsByClassName('emoji-text')[0].textContent;
  });
  // Not deleting &nbsp; because user may write some in <pre> elements in a future release of the app.
};

N.Functions.Content.funcClearHTMLForMarkdownExport = (Parameter) => {
  while (Parameter.$ContentEditable.getElementsByClassName('emoji').length) {
    forEach(Parameter.$ContentEditable.getElementsByClassName('emoji'), ($Emoji) => {
      if ($Emoji) {
        $Emoji.outerHTML = $Emoji.getElementsByClassName('emoji-text')[0].textContent;
      }
    });
  }
};



N.Functions.Content.funcClearHTML = (Parameter) => {
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

  // It happens that the editor outputs some element with [style], we don't want this attribute.
  forEach(Parameter.Document.$ContentEditable.querySelectorAll('[style]'), ($Element) => {
    $Element.removeAttribute('style');
  });

  // See N.Functions.Content.funcPurifyHTML() for a better comprehension

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



N.Functions.Content.funcCleanSearch = (Parameter) => {
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
