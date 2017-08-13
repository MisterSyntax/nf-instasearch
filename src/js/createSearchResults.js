import enableInfoHandlers from './enableInfoHandlers';
/**
 * @description: Takes an object which contains the data of the suggestions and displays them
 * - Also calls enableInfo on each result to 
 * @var: {object} resultData - An object that has a key data which contains the data for the last
 */
const createSearchResults = function(resultData){
    const suggestionBox = document.getElementById('search-suggestions');
    suggestionBox.innerHTML = '';
    resultData.data.forEach(result => {
        let div = document.createElement('div');
        div.setAttribute('class', 'result-container')
        div.innerHTML = result;
        suggestionBox.appendChild(div);
        enableInfoHandlers(div);
    });
    
}

export default createSearchResults;