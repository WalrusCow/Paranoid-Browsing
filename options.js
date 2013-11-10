/*
 * Handles loading/saving options for PB
*/
function saveData(){
	var pageList = [];
	var inputElems = document.getElementsByName('startPage');
	for(var idx = 0; idx < 10; idx++) {
		var page = inputElems[idx];
		if(page.value) {
			pageList.push(page.value);
		}
	}

	localStorage['pbPageList'] = JSON.stringify(pageList);

	// Reload to move up any missing lines etc.
	loadData();
}

function loadData(){
	// Very first time loading PB
	if(!localStorage['pbPageList']) {
		restoreDefaults();
		return;
	}

	var pageList = JSON.parse(localStorage['pbPageList']);
	var inputElems = document.getElementsByName('startPage');
	for(var idx = 0; idx < 10; idx++) {
		inputElems[idx].value = pageList[idx] ? pageList[idx] : '';
	}
}

function restoreDefaults() {
	// List of top-level news-type sites to start browsing from. Taken from http://www.alexa.com/topsites/countries/US
	// In some cases modified away from the splash page so that randomly selected links are better
	var topSites = ['http://www.cnn.com/',
					'http://news.yahoo.com',
					'http://en.wikipedia.org/wiki/Main_Page',
					'http://www.craigslist.org/',
					'http://www.go.com',
					'http://www.msn.com',
					'http://www.aol.com'];

	var inputElems = document.getElementsByName('startPage');
	for(var idx = 0; idx < 10; idx++) {
		inputElems[idx].value = topSites[idx] ? topSites[idx] : '';
	}

	saveData();
}

document.addEventListener('DOMContentLoaded', loadData);
document.querySelector('#save').addEventListener('click', saveData);
document.querySelector('#restoreDefaults').addEventListener('click', restoreDefaults);
