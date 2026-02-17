const fs = require('fs');
const fse = require('fs-extra');

const CURRENT_DIRECTORY = __dirname;

const colors = {
	reset: '\x1b[0m',
	fg: {
		black: '\x1b[30m',
	},
	bg: {
		green: '\x1b[42m',
		red: '\x1b[41m',
		yellow: '\x1b[43m',
		blue: '\x1b[44m',
	},
};

/**
 * Print message to console
 * @param {string} text console text
 * @param {string} type - success [success, warning, error]
 */
function print(text, type = 'success') {
	let bg = colors.bg.green;
	let fg = colors.fg.black;

	if (type === 'info') bg = colors.bg.blue;
	if (type === 'warning') bg = colors.bg.yellow;
	if (type === 'error') bg = colors.bg.red;

	console.log(bg, fg, text, colors.reset);
	console.log('');
}

print('updating files, please wait ...', 'info');

/**
 * Get build folder
 */
if (!fs.existsSync(CURRENT_DIRECTORY + '/dist')) {
	print(
		'/dist directory not found. First build with npm run build, then run this command',
		'error'
	);
	process.exit(1);
}

/**
 * Keep index.php template intact.
 *
 * index.php contains runtime logic that resolves the current hashed bundles
 * from /public/assets. Overwriting it with dist/index.html would re-introduce
 * hardcoded asset filenames and break installs that do not commit built assets.
 */
print('skipping /index.php overwrite (template kept as source of truth)', 'info');

/**
 * Delete previous file
 */
fs.rmSync(CURRENT_DIRECTORY + '/public/assets/', {
	recursive: true,
	force: true,
});
print('deleting previous files in /public/assets/ done');

/**
 * Copy assets folder
 */
fse.copySync(
	CURRENT_DIRECTORY + '/dist/assets',
	CURRENT_DIRECTORY + '/public/assets/',
	{ overwrite: true }
);
print('copy new files in /public/assets/ done');

print('updating files, please wait ...', 'info');

/**
 * Get build folder
 */
if (!fs.existsSync(CURRENT_DIRECTORY + '/dist')) {
	print(
		'/dist directory not found. First build with npm run build, then run this command',
		'error'
	);
	process.exit(1);
}

// Delete previous dir
if (fs.existsSync(CURRENT_DIRECTORY + '/bundle')) {
	fs.rmdirSync(CURRENT_DIRECTORY + '/bundle', {
		force: true,
		recursive: true,
	});
}

// Create a new folder
fs.mkdirSync(CURRENT_DIRECTORY + '/bundle');

// Copy ness content

/**
 * Copy assets folder
 */
fse.copySync(
	CURRENT_DIRECTORY + '/public/',
	CURRENT_DIRECTORY + '/bundle/public/',
	{
		overwrite: true,
	}
);
print('copying files in /bundle from /public done');

/**
 * Copy api folder
 */
fse.copySync(CURRENT_DIRECTORY + '/api/', CURRENT_DIRECTORY + '/bundle/api/', {
	overwrite: true,
});
print('copying files in /bundle from /api done');

/**
 * Copy inc folder
 */
fse.copySync(CURRENT_DIRECTORY + '/inc/', CURRENT_DIRECTORY + '/bundle/inc/', {
	overwrite: true,
});
print('copying files in /bundle from /inc done');

/**
 * Copy index.php
 */
fse.copySync(
	CURRENT_DIRECTORY + '/index.php',
	CURRENT_DIRECTORY + '/bundle/index.php',
	{
		overwrite: true,
	}
);
print('copying files in /bundle from /index.php done');

/**
 * Copy config.php
 */
fse.copySync(
	CURRENT_DIRECTORY + '/template.config.php',
	CURRENT_DIRECTORY + '/bundle/config.php',
	{
		overwrite: true,
	}
);
print('copying files in /bundle from /template.config.php done');

/**
 * Copy setup.php
 */
fse.copySync(
	CURRENT_DIRECTORY + '/setup.php',
	CURRENT_DIRECTORY + '/bundle/setup.php',
	{
		overwrite: true,
	}
);
print('copying files in /bundle from /setup.php done');

/**
 * Copy install.php
 */
fse.copySync(
	CURRENT_DIRECTORY + '/install.php',
	CURRENT_DIRECTORY + '/bundle/install.php',
	{
		overwrite: true,
	}
);
print('copying files in /bundle from /install.php done');

/**
 * Copy .htaccess
 */
fse.copySync(
	CURRENT_DIRECTORY + '/.htaccess',
	CURRENT_DIRECTORY + '/bundle/.htaccess',
	{
		overwrite: true,
	}
);
print('copying files in /bundle from /.htaccess done');

/**
 * Copy LICENSE
 */
fse.copySync(
	CURRENT_DIRECTORY + '/LICENSE',
	CURRENT_DIRECTORY + '/bundle/LICENSE',
	{
		overwrite: true,
	}
);
print('copying files in /bundle from /LICENSE done');
