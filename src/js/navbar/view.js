class Navbar {
  constructor() {
    this.parent = document.getElementById('navabarId');

    this.logo = `<div class="col justify-content-md-start d-flex">
      <a href="#" id="brandid">
      <img src="img/logo.png" alt="logo" id="logo" class="img-responsive"></a>
    </div>`;

    this.header = '<div class="justify-content-md-end col d-flex"></div>';

    this.addBoardBtn = `<form class="form-inline" id="createBoard">
      <button class="btn btn-primary my-2 my-sm-0" type="button" data-toggle="modal" data-target="#boardModal">
      <i class="em em-heavy_plus_sign"></i> Board</button>
    </form>`;
    this.boardModal = `<div class="modal fade" id="boardModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create New Board</h5>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
               <input type="text" class="form-control" id="boardInputId" placeholder="Boad Name?" name="boardname"></input>
              </div>
              <button type="button" id="boardBtnId" class="btn btn-success">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>`;
    this.addListBtn = `<form class="form-inline" id="createList">
      <button class="btn btn-primary my-2 my-sm-0" type="button" data-toggle="modal" data-target="#listModal"><i class="em em-heavy_plus_sign"></i> List</button>
    </form>`;
    this.listModal = `<div class="modal fade" id="listModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create New List</h5>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <input type="text" class="form-control" id="listInputId" placeholder="List Name?" name="boardname"></input>
                </div>
                <button type="button" id="listBtnId" class="btn btn-success">Save</button>
              </form>
          </div>
        </div>
      </div>
    </div>`;
  }

  // Board as header at List
  createBoardHeader(boardName) {
    var board = Navbar.createNewDOMElement(this.boardHeader = `<div class="col justify-content-center" id="boardHeaderLabel">
    <h4 id="boardHeaderName">${boardName}</h4>
    </div>`);
    return board;
  }

  // For Board
  showNavForBoardList() {
    this.parent.innerHTML = '';
    this.parent.appendChild(Navbar.createNewDOMElement(this.logo));
    var header = Navbar.createNewDOMElement(this.header).appendChild(Navbar.createNewDOMElement(this.addBoardBtn));
    this.parent.appendChild(Navbar.createNewDOMElement(this.boardModal));
    this.parent.appendChild(header);
  }

  // After click on +Board button for List
  showNavForBoardDetails(boardName) {
    this.parent.innerHTML = '';
    this.parent.appendChild(Navbar.createNewDOMElement(this.logo));
    this.parent.appendChild(this.createBoardHeader(boardName));
    var header = Navbar.createNewDOMElement(this.header).appendChild(Navbar.createNewDOMElement(this.addListBtn));
    this.parent.appendChild(Navbar.createNewDOMElement(this.listModal));
    this.parent.appendChild(header);
  }

  // Creating new HTML DOM Element
  static createNewDOMElement(htmlElement) {
    var template = document.createElement('template');
    template.innerHTML = htmlElement;
    return template.content.firstElementChild;
  }
  
}

const navbar = new Navbar();
export default navbar;
