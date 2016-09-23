$(function () {

  $DownloadButton = $('.multi-download-button');
  $AppVersion = $DownloadButton.find('.version');


  emojify.setConfig({ img_dir: 'lib/emojis' });

  $('.contains-emojis').each(function () {
    emojify.run(this);
  });


  $DownloadButton.find('.more-button').on('click', function () {
    $DownloadButton.addClass('opened');
  });
  $DownloadButton.find('.less-button').on('click', function () {
    $DownloadButton.removeClass('opened');
  });


  if (platform.os.family === 'Windows') {
    $AppVersion.after($DownloadButton.find('.win-setup').clone());
  }
  // else if (platform.os.family === 'OS X') {
  //   $AppVersion.after($DownloadButton.find('.osx-dmg').clone());
  // }
  // OS family detection on Debian returns 'Linux'
  else if (platform.os.family === 'Ubuntu') {
    $AppVersion.after($DownloadButton.find('.deb').clone());
  }
  else {
    $DownloadButton.removeClass('os-known');
    $DownloadButton.addClass('os-unknown');
    $DownloadButton.addClass('opened');
  }

});
