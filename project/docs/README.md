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
- Install Ubuntu 16.04 LTS 64-bit (used exact v16.04.7) (from https://releases.ubuntu.com)
- `sudo apt-get install git curl`
- Install Node.js v7.x (used exact v7.10.1), NPM v4.x (used exact v4.2.0): `curl -fsSL https://deb.nodesource.com/setup_7.x | sudo -E bash -`, then `sudo apt-get install -y nodejs` (from https://github.com/nodesource/distributions/blob/master/README.md#deb)
- Clone the repository.
- *(in the repo)* `npm install`
- *(in the repo)* in root `package.json`, remove incompatible & unnecessary output format in `linux.target` array
- *(in the repo)* `npm run gulp`, then `npm run dist`


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
