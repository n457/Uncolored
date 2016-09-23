N.Functions.Utils = {};


N.Functions.Utils.funcSetDOMAppName = () => {
  forEach(document.getElementsByClassName('app-name'), ($Element) => {
    $Element.textContent = N.strAppName;
  });
};


// Parameter :
// - strPath
N.Functions.Utils.funcGetFilePathInfo = (Parameter) => {
  const strExtensionLowerCase = N.ElectronFramework.Path.extname(Parameter.strPath).toLowerCase();

  let strFormat = '';
  if (['.html', '.htm'].indexOf(strExtensionLowerCase) !== -1) {
    strFormat = 'HTML';
  } else if (['.md', '.markdown'].indexOf(strExtensionLowerCase) !== -1) {
    strFormat = 'Markdown';
  }

  return {
    strName: N.ElectronFramework.Path.basename(Parameter.strPath),
    strDirPath: N.ElectronFramework.Path.dirname(Parameter.strPath),
    strFormat: strFormat
  };
};


// Parameters :
// - strEvent
// - $Element
N.Functions.Utils.funcTriggerEvent = (Parameters) => {
  Parameters.$Element.dispatchEvent(new Event(Parameters.strEvent));
};


// http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
// https://github.com/sindresorhus/escape-string-regexp
// Parameter :
// - strRegExp
N.Functions.Utils.funcEscapeStringRegexp = (Parameter) => {
  return Parameter.strRegExp.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};


N.Functions.Utils.funcPurifyHTML = (Parameters) => {
  const PurifyParameters = {
    ALLOWED_TAGS: [
                    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                    'blockquote', 'ul', 'ol', 'li', 'img', 'iframe',
                    'b', 'i', 'u', 'strike', 'a', 'sup', 'sub'
                  ],
    ALLOWED_ATTR: [
                    'src', 'href',
                    // For iframe only :
                    'width', 'height', 'allowfullscreen'
                  ]
  };

  if ( ! Parameters.boolPasteMode) {
    PurifyParameters.ALLOWED_TAGS.push('p', 'br');
  }

  return DOMPurify.sanitize(Parameters.strHTML, PurifyParameters);
};


N.Functions.Utils.funcNoCacheSuffix = () => {
  // http://stackoverflow.com/questions/728616/disable-cache-for-some-images/6116854#6116854
  return '?nocache2650=' + new Date().getTime();
};


N.Functions.Utils.funcClearHTMLForHTMLExport = (Parameter) => {

  forEach(Parameter.$ContentEditable.querySelectorAll('a, .emoji'), ($Element) => {
    if ($Element.tagName === 'A') {
      $Element.target = '_blank';
    }
    if ($Element.classList.contains('emoji')) {
      $Element.removeAttribute('contenteditable');
      $Element.title = $Element.getElementsByClassName('emoji-text')[0].textContent;
    }
  });

  // Not deleting &nbsp; because user may write some in <pre> elements in a future release of the app.
};


N.Functions.Utils.funcClearHTMLForMarkdownExport = (Parameter) => {
  while (Parameter.$ContentEditable.getElementsByClassName('emoji').length) {
    forEach(Parameter.$ContentEditable.getElementsByClassName('emoji'), ($Emoji) => {
      if ($Emoji) {
        $Emoji.outerHTML = $Emoji.getElementsByClassName('emoji-text')[0].textContent;
      }
    });
  }
};


N.Functions.Utils.funcMarkdownToHTML = (Parameter) => {
  try {
    return marked(Parameter.strContent);
  } catch (Error) {
    console.error(Error);
    // Error during the convertion.
    return false;
  }
};

N.Functions.Utils.funcHTMLToMarkdown = (Parameter) => {
  try {
    return toMarkdown(Parameter.strContent);
  } catch (Error) {
    console.error(Error);
    // Error during the convertion.
    return false;
  }
};
