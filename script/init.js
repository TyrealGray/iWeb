const path = require('path');
const download = require('download');
const Spinner = require('cli-spinner').Spinner;

let downloadURL = null;

if (/^win/.test(process.platform)) {
	downloadURL = 'https://dl.nwjs.io/v0.30.1/nwjs-v0.30.1-win-x64.zip';
} else {
	downloadURL = 'https://dl.nwjs.io/v0.30.1/nwjs-v0.30.1-osx-x64.zip';
}

const downloadingStr = new Spinner('download nwjs client to local %s');
downloadingStr.setSpinnerString(18);
downloadingStr.start();

download(downloadURL, path.join(process.cwd()), {extract: true, headers: {accept: 'application/zip'}}).then(() => {
	downloadingStr.stop();
console.log(' download finished!');
}).catch(error => {
	console.log('download error: ' + error);
});