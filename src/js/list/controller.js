import 'jquery';
import 'jquery-ui';

import listBox from './view';
import trelloStore from '../state';

function showListEdit(event) {
  listBox.showListEditForm(event.target.getAttribute('boardlistId'));
}
// Adding Event onclick listener on List Edit icon button
$('#boardDetails').on('click', '.listEditIcon', showListEdit);

function DELETELISTONBOARD(event) {
  trelloStore.dispatch({
    type: 'DELETELISTONBOARD',
    listId: event.target.getAttribute('boardlistId'),
  });
}
// Adding Event onclick listener on List Delete icon button
$('#boardDetails').on('click', '.listDeleteIcon', DELETELISTONBOARD);

function updateListDetails(event) {
  if (event.keyCode === 13) { // Enter Key
    event.preventDefault();
    trelloStore.dispatch({
      type: 'UPDATELISTONBOARD',
      name: event.target.value,
      listId: event.target.getAttribute('boardlistId'),
    });
    return false;
  } 
  if (event.keyCode === 27) { //Esc Key
    listBox.hideListEditForm(event.target.getAttribute('boardlistId'));
  }
  return true;
}
// Adding Event keypress listener on Edit List after Edit icon button
$('#boardDetails').on('keypress', 'input.listInput', updateListDetails);

function hideListEdit(event) {
  listBox.hideListEditForm(event.target.getAttribute('boardlistId'));
}
$('#boardDetails').on('focusout', 'input.listInput', hideListEdit);

function addNewCard(event) {
  if (event.keyCode === 13) { // Enter Key
    event.preventDefault();
    trelloStore.dispatch({
      type: 'ADDCARDINLIST',
      name: event.target.value,
      listId: event.target.getAttribute('boardlistId'),
    });
    return false;
  } 
  if (event.keyCode === 27) { // Esc Key
    listBox.hideAddCards(event.target.getAttribute('boardlistId'));
  }
  return true;
}
// Adding Event keypress listener on input textbox after click on add new card link
$('#boardDetails').on('keypress', 'input.newCard', addNewCard);

function showEditCard(event) {
  var listId = event.target.getAttribute('boardlistId');
  var cardId = event.target.getAttribute('cardViewId');
  listBox.showEditCard(listId, cardId);
}
// Adding Event onclick listener on Edit icon button on card
$('#boardDetails').on('click', '.cardEditIcon', showEditCard);

function hideEditCard(event) {
  var listId = event.target.getAttribute('boardlistId');
  var cardId = event.target.getAttribute('cardViewId');
  listBox.hideEditCard(listId, cardId);
}
$('#boardDetails').on('focusout', 'input.cardInput', hideEditCard);

function updateCard(event) {
  if (event.keyCode === 13) { // Enter Key
    event.preventDefault();
    var listId = event.target.getAttribute('boardlistId');
    var cardId = event.target.getAttribute('cardViewId');
    trelloStore.dispatch({
      type: 'UPDATECARDONLIST',
      name: event.target.value,
      listId,
      cardId,
    });
    return false;
  } 
  if (event.keyCode === 27) { // Esc Key
    var listId = event.target.getAttribute('boardlistId');
    var cardId = event.target.getAttribute('cardViewId');
    listBox.hideEditCard(listId, cardId);
  }
  return true;
}
// Adding Event keypress listener on Card Edit Input Textbox
$('#boardDetails').on('keypress', 'input.cardInput', updateCard);

function DELETECARDFROMLIST(event) {
  var listId = event.target.getAttribute('boardlistId');
  var cardId = event.target.getAttribute('cardViewId');
  trelloStore.dispatch({
    type: 'DELETECARDFROMLIST',
    listId,
    cardId,
  });
}
// Adding Event onclick listener on Delete icon button on card
$('#boardDetails').on('click', '.cardDeleteIcon', DELETECARDFROMLIST);

function showAddCards(event) {
  listBox.showAddCards(event.target.getAttribute('boardlistId'));
}
$('#boardDetails').on('click', 'div.card-footer a', showAddCards);

function hideAddCards(event) {
  listBox.hideAddCards(event.target.getAttribute('boardlistId'));
}
$('#boardDetails').on('focusout', 'input.newCard', hideAddCards);

trelloStore.subscribe(() => {
  var state = trelloStore.getState();
  if (state.selectedBid >= 0) {
    var listItems = state.boards[state.selectedBid].lists;
    listBox.showLists(listItems);
    if (state.selectedListId) {
      listBox.showAddCards(state.selectedListId);
    }
  } else {
    listBox.hideLists();
  }
});
