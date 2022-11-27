import interact from 'interactjs';

function createDragDropFunctionality(knightIcon) {
  interact('.draggable').draggable({

  });
  interact('.square_div')
    .dropzone({
      ondrop(event) {
        event.target.appendChild(knightIcon);
        // eslint-disable-next-line no-param-reassign
        knightIcon.dataset.index = event.target.dataset.index;
      },
      ondragenter(event) {
        event.target.appendChild(knightIcon);
      },
    });
}

export default createDragDropFunctionality;
