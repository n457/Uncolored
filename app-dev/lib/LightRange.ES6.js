// LightRange.js - A simple and lightweight selection, range and caret information library in native JavaScript, with an additional selection save & restore system. - https://github.com/n457/LightRange.js
// Version 2.2.0
// MIT License - Copyright (c) 2015 Bertrand Vignaud-Lerouge / n457 - https://github.com/n457


// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes
class LightRange {

  getSelectionInfo() {
    // Info data that will be returned by the method.
    const data = {};

    // Modern browsers.
    if (window.getSelection) {
      const selection = window.getSelection();

      const bodyScrollTop = document.body.scrollTop;
      const bodyScrollLeft = document.body.scrollLeft;

      // If something is selected.
      if (selection.rangeCount > 0) {
        // With cloneRange() we create a perfect abstract copy of the range. We do not want to modify the real one.
        const range = selection.getRangeAt(0).cloneRange();

        // http://stackoverflow.com/questions/6846230/coordinates-of-selected-text-in-browser-page/6847328#6847328
        // http://stackoverflow.com/questions/12603397/calculate-width-height-of-the-selected-text-javascript/12603796#12603796
        // getBoundingClientRect() gives us correct information about a range but not about a caret (returns 0 as coordinates (here we test a height of 0) ).
        // getClientRects() gives us correct information about a caret but not about a range (returns wrong coordinates).
        let rect = range.getBoundingClientRect();
        if (rect.height === 0) {
          rect = range.getClientRects()[0];
        }

        // If the caret is on an empty line or if the range contains noting or new lines only, 'rect' will be undefined.
        if (rect) {
          data.width = rect.width;
          data.height = rect.height;

          // By default, x and y are calculated at the beginning of the range.
          // We have to add body scroll values
          data.xStart = rect.left + bodyScrollLeft;
          data.yStart = rect.top + bodyScrollTop;
        }

        data.text = selection.toString();

        data.charStart = range.startOffset;
        data.charEnd = range.endOffset;

        // Collapse the range to its end.
        range.collapse(false);
        // We have to update the rect with getClientRects() because the range became a caret.
        rect = range.getClientRects()[0];

        if (rect) {
          data.xEnd = rect.left + bodyScrollLeft;
          data.yEnd = rect.top + bodyScrollTop;
        }

      }
    }

    // IE 8 and other old browsers.
    else if (document.selection) {
      const selection = document.selection;
      const range = selection.createRange();

      const bodyScrollTop = document.documentElement.scrollTop;
      const bodyScrollLeft = document.documentElement.scrollLeft;

      data.width = range.boundingWidth;
      data.height = range.boundingHeight;

      data.xStart = range.boundingLeft + bodyScrollLeft;
      data.yStart = range.boundingTop + bodyScrollTop;

      data.text = range.text;

      // startOffset and endOffset for IE 8 and below are not natively supported and are not so easy to implement.

      range.collapse(false);

      data.xEnd = range.boundingLeft + bodyScrollLeft;
      data.yEnd = range.boundingTop + bodyScrollTop;
    }

    // The browser doesn't support the feature
    else {
      return null;
    }

    if (data.text) {
      // From Countable JS lib : https://github.com/RadLikeWhoa/Countable
      // https://github.com/RadLikeWhoa/Countable/blob/master/Countable.js#L210
      data.characters = data.text.replace(/\s/g, '').length;
      data.charactersAll = data.text.replace(/[\n\r]/g, '').length;
    } else {
      data.characters = 0;
      data.charactersAll = 0;
    }


    // Some properties can be undefined. This is fine, it's easier to handle special cases.
    return data;
  }



  // http://stackoverflow.com/questions/4687808/contenteditable-selected-text-save-and-restore/4690057#4690057
  // http://jsfiddle.net/timdown/cCAWC/3/
  saveSelection() {
    // Modern browsers.
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection.getRangeAt && selection.rangeCount) {
        return selection.getRangeAt(0);
      }
    }
    // IE 8 and other old browsers.
    else if (document.selection && document.selection.createRange) {
      return document.selection.createRange();
    }
    // The browser doesn't support the feature
    else {
      return null;
    }
  }


  restoreSelection(rangeToRestore) {
    if (rangeToRestore) {
      // Modern browsers.
      if (window.getSelection) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(rangeToRestore);
      }
      // IE 8 and other old browsers.
      else if (document.selection && rangeToRestore.select) {
        rangeToRestore.select();
      }
      // The browser doesn't support the feature
      else {
        return null;
      }

      return rangeToRestore;
    }
  }


}

const lightrange = new LightRange();
