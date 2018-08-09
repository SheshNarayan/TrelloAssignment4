class Boards {
  constructor() {
    this.parent = document.getElementById('boardList');
  }

  static createNewDOMElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
  }

  static createBoard(boardName, boardId) {
    return Boards.createNewDOMElement(`<div class="card boardsBox" myBoardId="${boardId}">
      <div class="justify-content-end mt-1 mr-1 d-flex">
        <button class="boardEditIcon" myBoardId="${boardId}">
          <img class="icon" alt="Edit" src="img/edit.png" data-toggle="tooltip" data-placement="bottom" title=" Edit Board?" myBoardId="${boardId}">
        </button>  
        <button class="boardDeleteIcon" myBoardId="${boardId}">
         <img class="icon" alt="Delete" src="img/delete.png" data-toggle="tooltip" data-placement="bottom" title="Delete This Board?" myBoardId="${boardId}">
        </button>
      </div>
      <div class="card-body pt-1" myBoardId="${boardId}">
        <a href="#" myBoardId="${boardId}">
         <h5 class="centered" myBoardId="${boardId}">${boardName}</h5>
        </a>
        <form class="form-inline d-none"><input class="form-control" data-toggle="tooltip" data-placement="bottom" title="Press Enter/Esc Key!" myBoardId="${boardId}" value="${boardName}"></form>
      </div>
    </div>`);
  }

  showBoards(boards) {
    console.log("boards view.js - showBoards()");
    this.parent.innerHTML = '';
    this.parent.className = 'container flex-wrap flex-column flex-md-row d-flex';
    boards.forEach((board, index) => {
      this.parent.appendChild(Boards.createBoard(board.name, index));
    });
  }

  hideBoards() {
    this.parent.className = 'd-none';
  }

  showBoardEditForm(boardId) {
    var edit = this.parent.querySelector(`div[myBoardId="${boardId}"].card-body a`);
    edit.classList.add('d-none');
    var form = this.parent.querySelector(`div[myBoardId="${boardId}"].card-body form`);
    form.classList.remove('d-none');
    var formInput = this.parent.querySelector(`div[myBoardId="${boardId}"].card-body input`);
    formInput.focus();
  }

  hideBoardEditForm(boardId) {
    var edit = this.parent.querySelector(`div[myBoardId="${boardId}"].card-body a`);
    edit.classList.remove('d-none');
    var form = this.parent.querySelector(`div[myBoardId="${boardId}"].card-body form`);
    form.classList.add('d-none');
  }
}

//For Tooptop Text Copy-Paste
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


const boardsView = new Boards();

export default boardsView;
