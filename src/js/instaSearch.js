import createSearchResults from './createSearchResults';

/**
 * @desc: Sets up eventlisteners for search box
 * - on input, we'll create a web worker that will request the titles with the current search value
 * -the results of that will be sent to createSearchResults
 */
const instaSearch = function () {
    const search = document.getElementById('search-term');
    const suggestionBox = document.getElementById('search-suggestions');
    let currentWorker;

    search.addEventListener('input', (e) => {
        //append loading overlay
        if (!document.querySelector('.loading-results')) {
            const loadingOverlay = document.createElement('div');
            loadingOverlay.setAttribute('class', 'loading-container');
            loadingOverlay.innerHTML = `<div class='loading-results'></div><div class='info-loading-message'>Loading...</div>`
            suggestionBox.appendChild(loadingOverlay);
        }


        //if there is a webworker currently requesting titles, terminate it
        if (currentWorker) {
            currentWorker.terminate();
        }

        //delay launching web worker to minimize requests until user is done typing
        setTimeout(function () {

            //launch a web worker to get the appropriate titles and set this worker to be the current worker
            const worker = new Worker('./webWorkers/requestTitles.js');
            currentWorker = worker;
            worker.postMessage(e.target.value);

            worker.onmessage = function (event) {
                //save last results for refresh
                localStorage.history = JSON.stringify({ data: event.data });
                createSearchResults({ data: event.data });
            };


        }, 500);
    });
};

export default instaSearch;