/**
 * @desc: Creates the info container for the element with the imdId and the received data, and appends it to parent
 * @var: data {String} - the html that we'll add to the child node
 * @var: imdbID {String} - the imdbd identifier dor this element
 */

const createInfoBox = function (data, imdbID, parent) {
    const div = document.createElement('div');

    //sets the new info box to either be closed or appear on whichever side has more room
    const className = document.querySelectorAll('.open').length > 0 ?
        'title-info-container closed'
        : (window.innerWidth < 639) ?
            'title-info-container open center' 
            : (window.innerWidth - parent.offsetLeft > 600) ?
                'title-info-container open right'
                : 'title-info-container open left';

    div.setAttribute('class', className);
    div.setAttribute('id', `info-${imdbID}`)

    div.innerHTML = data;
    parent.appendChild(div);

    //set up handlers for closing info box
    const closeButton = parent.querySelector('.close-info');
    window.closeButton = closeButton;
    closeButton.addEventListener('click', function (event) {
        const titleInfoContainer = parent.querySelector('.title-info-container');
        titleInfoContainer.setAttribute('class', 'title-info-container closed');
        event.stopPropagation();
        parent.blur();
    });
}

export default createInfoBox;