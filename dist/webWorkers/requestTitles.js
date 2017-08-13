/**
 * @desc:
 * @var: {Object} e - The message event passed to the worker. 
 * @var: {string} e.data - The search term passe to the worker
 * @returns: {Array} - This will be an array of html objects containing the results 
 *  - each result in array will contain a string of the 
 */

onmessage = function (e) {
    if (e.data) {
        const url = `http://www.omdbapi.com/?apikey=aba065d3&s=${e.data}`;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', url, false);
        xmlHttp.send();
        const results = JSON.parse(xmlHttp.responseText);
        if (results.Response === 'True') {
            let htmlOutput = results.Search.map(result => {

                let program = `<div class='title-container' id='${result.imdbID}'>
                    ${result.Poster !== 'N/A' ? `<img class='poster' src='${result.Poster}' alt='${result.Title} Poster'>` : `<div class='no-poster'>No poster available</div>`}
                    <p class='title'>${result.Title}</p>
                </div>`

                return program;
            });

            postMessage(htmlOutput);
        }
    }
    close();
};

