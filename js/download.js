$(function () {

  var strHash = window.location.hash.replace('#', '');
  var arrHashes = ['win-setup', 'win-zip', 'osx-dmg', 'osx-zip', 'deb', 'linux-zip'];
  var $Body = $('body');

  if (arrHashes.indexOf(strHash) > -1) {
    $Body.addClass('valid-hash');
    $Body.addClass(strHash);
    $Body.find('.' + strHash).get(0).click();
  }

});
