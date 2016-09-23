/*! foreach.js v1.1.0 | (c) 2014 @toddmotto | https://github.com/toddmotto/foreach */
var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};


(function () {

  // Checking for an Internet connection
  // From http://youmightnotneedjquery.com/#request IE8+
  var Request = new XMLHttpRequest();
  // Load a tiny library from a reliable source to check if a real Internet connexion is available.
  Request.open('GET', 'https://ajax.googleapis.com/ajax/libs/threejs/r76/three.min.js', true);
  Request.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        // Success. Do nothing.
      } else {
        alert('Apparently, there is no Internet connexion. Some ressources may not load, like remote images.');
      }
    }
  };
  Request.send();
  Request = null;


  // Executing highlight.js if there is at least one <pre>
  forEach(document.getElementsByTagName('pre'), ($CodeBlock) => {
    hljs.highlightBlock($CodeBlock);
  });

})();
