class ListBox {
  constructor() {
    this.parent = document.getElementById('boardDetails');
  }

  static createNewDOMElement(htmlElement) {
    var template = document.createElement('template');
    template.innerHTML = htmlElement;
    return template.content.firstElementChild;
  }

  static creatList(listName, listId) {
    return ListBox.createNewDOMElement(`<div class="card listBox" boardlistId="${listId}">
        <div class="card-header justify-content-between d-flex" boardlistId="${listId}">
        <h5>${listName}</h5>
        <form class="form-inline d-none" boardlistId="${listId}">
          <input class="form-control listInput " data-toggle="tooltip" data-placement="bottom" title="Press Enter/Esc Key!" boardlistId="${listId}" value="${listName}">
        </form>
        <span class="card_icon_span">
          <button class="listIcon listEditIcon" boardlistId="${listId}">
           <img class="icon" alt="Edit ${listName}" src="img/edit.png" data-toggle="tooltip" data-placement="bottom" title="Edit List?" boardlistId="${listId}">
          </button>
          <button class="listIcon listDeleteIcon" boardlistId="${listId}">
            <img class="icon" src="img/delete.png" data-toggle="tooltip" data-placement="bottom" title="Delete This List?" alt="Delete ${listName}" boardlistId="${listId}">
          </button>
        </span> 
        </div>
        <div class="card-body px-0 py-0 card_list">
          <ul boardlistId="${listId}" class="list-group card_list list-group-flush ui-sortable" style="min-height: 60px;">
          </ul>
        </div>
        <div class="card-footer" boardlistId="${listId}">
          <a href="#" boardlistId="${listId}">Add a Card</a>
          <form class="d-none form-inline" boardlistId="${listId}">
            <input class="form-control newCard " data-toggle="tooltip" data-placement="right" title="Input Card Name Then Press Enter Key!" placeholder="Card Name?" boardlistId="${listId}">
          </form>
        </div>
    </div>`);
  }

  static createCard(cardName, cardId, listId) {
    return ListBox.createNewDOMElement(`<li class="mycard card-detail justify-content-between d-flex flex-row" cardViewId="${cardId}" boardlistId="${listId}">
        <p class="mb-0">${cardName}</p>
        <form class="form-inline d-none">
         <input class="form-control cardInput " data-toggle="tooltip" data-placement="bottom" title="Press Enter/Esc Key!"  cardViewId="${cardId}" boardlistId="${listId}" value="${cardName}">
        </form>
        <span class="card_icon_span">
          <button class="listIcon cardEditIcon" cardViewId="${cardId}" boardlistId="${listId}">
           <img class="icon" alt="Edit ${cardName}" src="img/edit.png" data-toggle="tooltip" data-placement="right" title="Edit Card Name?" cardViewId="${cardId}" boardlistId="${listId}">
          </button>
          <button class="listIcon cardDeleteIcon" cardViewId="${cardId}" boardlistId="${listId}">
            <img class="icon" src="img/delete.png" alt="Delete ${cardName}" data-toggle="tooltip" data-placement="right" title="Delete This Card?" cardViewId="${cardId}" boardlistId="${listId}">
          </button>
        </span>
      </li>`);
  }


  showLists(lists) {
    this.parent.className = 'flex-column flex-md-row d-flex';
    this.parent.innerHTML = '';
    lists.forEach((listItem, listIndex) => {
      var listDOMElement = ListBox.creatList(listItem.name, listIndex);
      this.parent.appendChild(listDOMElement);
      listItem.cards.forEach((cardItem, cardIndex) => {
        var cardDom = ListBox.createCard(cardItem.name, cardIndex, listIndex);
        listDOMElement.getElementsByTagName('ul')[0].appendChild(cardDom);
      });
    });
  }

  hideLists() {
    this.parent.className = 'd-none';
  }

  showListEditForm(listId) {
    var edit = this.parent.querySelector(`div[boardlistId="${listId}"].card-header h5`);
    edit.classList.add('d-none');
    var form = this.parent.querySelector(`div[boardlistId="${listId}"].card-header form`);
    form.classList.remove('d-none');
    var formInput = this.parent.querySelector(`div[boardlistId="${listId}"].card-header input`);
    formInput.focus();
  }

  hideListEditForm(listId) {
    var edit = this.parent.querySelector(`div[boardlistId="${listId}"].card-header h5`);
    edit.classList.remove('d-none');
    var form = this.parent.querySelector(`div[boardlistId="${listId}"].card-header form`);
    form.classList.add('d-none');
  }

  showAddCards(listId) {
    var edit = this.parent.querySelector(`div[boardlistId="${listId}"].card-footer a`);
    edit.classList.add('d-none');
    var form = this.parent.querySelector(`div[boardlistId="${listId}"].card-footer form`);
    form.classList.remove('d-none');
    var formInput = this.parent.querySelector(`div[boardlistId="${listId}"].card-footer input`);
    formInput.value = '';
    formInput.focus();
  }

  hideAddCards(listId) {
    console.log('In list view hideAddCards');
    var edit = this.parent.querySelector(`div[boardlistId="${listId}"].card-footer a`);
    edit.classList.remove('d-none');
    var form = this.parent.querySelector(`div[boardlistId="${listId}"].card-footer form`);
    form.classList.add('d-none');
  }

  showEditCard(listId, cardId) {
    console.log('In list view showEditCards');
    var edit = this.parent.querySelector(`li[boardlistId="${listId}"][cardViewId="${cardId}"].card-detail p`);
    edit.classList.add('d-none');
    var form = this.parent.querySelector(`li[boardlistId="${listId}"][cardViewId="${cardId}"].card-detail form`);
    form.classList.remove('d-none');
    var formInput = this.parent.querySelector(`li[boardlistId="${listId}"][cardViewId="${cardId}"].card-detail input`);
    formInput.focus();
  }

  hideEditCard(listId, cardId) {
    var edit = this.parent.querySelector(`li[boardlistId="${listId}"][cardViewId="${cardId}"].card-detail p`);
    edit.classList.remove('d-none');
    var form = this.parent.querySelector(`li[boardlistId="${listId}"][cardViewId="${cardId}"].card-detail form`);
    form.classList.add('d-none');
  }
}

// For tooltip text - Copy paste
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

var listBox = new ListBox();

export default listBox;
