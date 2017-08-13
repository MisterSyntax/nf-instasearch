import createSearchResults from './createSearchResults.js';

const initialLoad = function(){ 
    if(localStorage.history){
        createSearchResults(JSON.parse(localStorage.history));
    }

}

export default initialLoad;