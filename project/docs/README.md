## Full Documentation


### Launch (Un)colored Development Version



### Build (Un)colored

#### Windows
- *(recommended)* Install [cmder](http://cmder.net/) full version
- *(recommended)* Install [Scoop](http://scoop.sh/)
- Update Scoop & its apps if needed (`scoop update && scoop update *`)
- Install Node.js (`scoop install nodejs` or https://nodejs.org/en/ "Current" version)
- `npm rm --global gulp` [if needed](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#1-install-gulp-globally)
- `npm install --global gulp-cli`
- *(in the repo)* `npm install`
- *(in the repo)* `gulp`
- *(in the repo)* in root `package.json`, remove unnecessary output format in `win.target` array
- *(in the repo)* gulp dist

#### Ubuntu
- `sudo apt-get update && sudo apt-get upgrade`
- `sudo apt-get install nodejs-legacy npm`
- `sudo npm rm --global gulp` [if needed](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#1-install-gulp-globally)
- `sudo npm install --global gulp-cli`
- *(in the repo)* `npm install`
- *(in the repo)* `gulp`
- *(in the repo)* in root `package.json`, remove incompatible & unnecessary output format in `linux.target` array
- *(in the repo)* gulp dist


if you modify the icon, don't forget to buid the .ico as a multi-layer version with GIMP.



### How (Un)colored is made



### Useful links

For future updates of this full doc.

- https://docs.npmjs.com/files/package.json
- http://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
- https://www.giftofspeed.com/base64-encoder/
- http://catalyst.net.nz/news/creating-multi-resolution-favicon-including-transparency-gimp
- http://www.visualpharm.com/articles/icon_sizes.html
- http://www.thewindowsclub.com/rebuild-the-icon-cache-windows
- https://github.com/electron-userland/electron-builder/wiki/Options
- https://github.com/electron-userland/electron-builder/issues/239#issuecomment-224365515
- https://github.com/electron-userland/electron-builder/issues/239#issuecomment-224495871
- https://github.com/LinusU/node-appdmg#example
- https://www.gimp.org/
- https://github.com/lemonmojo/IconComposer2x
