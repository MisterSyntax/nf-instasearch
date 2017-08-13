import createInfoBox from './createInfoBox.js'

/**
 * @desc: Sets up info on hover or click for each suggestion
 * - Either makes a request to get the info using a web worker
 * - or shows the existing info
 * - determines the current position of the parent container and places the overlay to right unless it would go off screen
 * @var {Element} node - the Element we want to enable or create the info box for
 */
const enableInfoHandlers = function (node) {

    const imdbID = node.querySelector('.title-container').id;

    function createOpenInfoBox() {
        const titleInfoContainer = node.querySelector('.title-info-container');

        //if we have already created the title info container show it, otherwise create it
        if (titleInfoContainer) {
            //make sure not placing info box off screen
            const className = (window.innerWidth < 639) ?
                'title-info-container open center'
                : (window.innerWidth - node.offsetLeft > 600) ?
                    'title-info-container open right'
                    : 'title-info-container open left';
            titleInfoContainer.setAttribute('class', className);
        }
        //if we're creating a new container add a loading message, launch the worker, and when completed create container
        else {
            const div = document.createElement('div');
            div.setAttribute('class','info-loading-message');
            div.innerHTML = "Loading Info...";
            node.appendChild(div);
            const worker = new Worker('./webWorkers/requestInfo.js');
            worker.postMessage(imdbID);
            worker.onmessage = function (event) {
                createInfoBox(event.data, imdbID, node);
            }

        }
    }

    node.addEventListener('mouseenter', function () {
        if (window.innerWidth > 639) {
            createOpenInfoBox()
        }
    });
    node.addEventListener('click', function () {
        if (window.innerWidth < 639) {
            createOpenInfoBox();
        }
    });

    //Closes the container on mouseleave
    node.addEventListener('mouseleave', function () {
        if (window.innerWidth > 639) {
            const titleInfoContainer = node.querySelector('.title-info-container');
            if (titleInfoContainer) {
                titleInfoContainer.setAttribute('class', 'title-info-container closed');
            }
        }
    });

}

export default enableInfoHandlers;