var assert = require('assert');

describe('Request Titles', function () {
    describe('gets titles', function () {
        it('retrieves information about movies', function () {
            const worker = new Worker('./webWorkers/requestTitles.js');
            worker.postMessage('a few good men');
            worker.onmessage = function (event) {
                console.log(event.data)
            };
            assert.deepEqual(1, 0);
        });
    });
});