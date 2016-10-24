$(function () {

  var $AppLargeImg = $('.app-large-img');
  var strAppLargeImgPathBase = 'img/uncolored-large-screenshot-.png';
  var $DownloadButton = $('.multi-download-button');
  var $AppVersion = $DownloadButton.find('.version');

  if (platform.os.family === 'Windows') {
    $AppLargeImg.attr('src', strAppLargeImgPathBase.replace('.png', 'win.png'));
    $AppVersion.after($DownloadButton.find('.win-setup').clone());
  }
  else if (platform.os.family === 'OS X') {
    $AppLargeImg.attr('src', strAppLargeImgPathBase.replace('.png', 'osx.png'));
    $AppVersion.after($DownloadButton.find('.osx-dmg').clone());
  }
  // OS family detection on Debian returns 'Linux'
  else if (platform.os.family === 'Ubuntu') {
    $AppLargeImg.attr('src', strAppLargeImgPathBase.replace('.png', 'linux.png'));
    $AppVersion.after($DownloadButton.find('.deb').clone());
  }
  else {
    $AppLargeImg.attr('src', strAppLargeImgPathBase.replace('.png', 'linux.png'));
    $DownloadButton.removeClass('os-known');
    $DownloadButton.addClass('os-unknown');
    $DownloadButton.addClass('opened');
  }

  $AppLargeImg.addClass('visible');


  $DownloadButton.find('.more-button').on('click', function () {
    $DownloadButton.addClass('opened');
  });
  $DownloadButton.find('.less-button').on('click', function () {
    $DownloadButton.removeClass('opened');
  });


  emojify.setConfig({ img_dir: 'lib/emojis' });

  $('.contains-emojis').each(function () {
    emojify.run(this);
  });
});
