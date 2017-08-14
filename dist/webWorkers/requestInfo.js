/**
 * @desc:
 * @var: {Object} e - The message event passed to the worker. 
 * @var: {string} e.data - The imdbID to use
 * @returns: {Array} - This will be an array of html objects containing the results 
 *  - each result in array will contain a string of the 
 */

onmessage = function (e) {
    try {
        if (e.data) {
            const url = `http://www.omdbapi.com/?apikey=aba065d3&i=${e.data}`;
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open('GET', url, false);
            xmlHttp.send();
            const results = JSON.parse(xmlHttp.responseText);
            if (results.Response === 'True') {
                let htmlOutput = `
                <div class='title-info'>
                    <div class='close-info'>
                    <svg viewbox='0 0 40 40'>
                        <path class='close-x' d='M 10,10 L 30,30 M 30,10 L 10,30' />
                    </svg>
                    </div>
                    <div class='title'>${results.Title}</div>
                    <div class='year-director'><span class='year'>(${results.Year})</span> <span class='director'>${results.Director}</span></div>
                    <div class='-ratings'>
                        <h4>Ratings:</h4>${
                    results.Ratings.length ?
                        results.Ratings.map(curr => `<div>${curr.Source}: ${curr.Value}</div>`).join('')
                        : 'No Ratings Yet'
                    }
                    </div>
                </div>`;
                postMessage(htmlOutput);
            };
        }
    }
    catch(err){
        postMessage('No info');
        console.error(err);
    }
    close();
};

