const critical = require('critical').stream;
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const defaults = {
	penthouse: {
		puppeteer: {
			getBrowser: async () =>
				puppeteer.launch({
					args: chrome.args,
					defaultViewport: {
						width: 1300,
						height: 900,
					},
					executablePath: await chrome.executablePath,
					ignoreHTTPSErrors: true,
					headless: chrome.headless,
				}),
		},
	},
};

module.exports = config => critical(config);

// module.exports = config =>
// 	critical({
// 		...defaults,
// 		...config,
// 	});
