import navbar from './view';
import trelloStore from '../state';

//$('ParentID').on('event','#ChildId',methodName);
function showBoardList() {
  //Dispatch to reducer 
  trelloStore.dispatch({ type: 'SHOWBOARDDATA' });
}
// Adding Event listener onclick on LOGO
$('#navabarId').on('click', '#brandid', showBoardList);

function createBoard() {
  var boardInput = document.getElementById('boardInputId').value;
  $('#boardModal').modal('hide');
  if (boardInput) 
    trelloStore.dispatch({ type: 'CREATEBOARD', name: boardInput });
}
// Adding Event listener onclick on Modal Save Button
$('#navabarId').on('click', '#boardBtnId', createBoard);

function createBoardFromInput(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    createBoard();
    return false;
  }
  return true;
}
// Adding Event keypress listener on Modal Input Textbox CreateBoard
$('#navabarId').on('keypress', '#boardInputId', createBoardFromInput);

function createList() {
  var listInput = document.getElementById('listInputId');
  $('#listModal').modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
  if (listInput.value)
    trelloStore.dispatch({ type: 'CREATELISTONBOARD', name: listInput.value });
}
// Adding Event listener onclick on Modal CreateList Save Button
$('#navabarId').on('click', '#listBtnId', createList);

function createListFromInput(event) {
  if (event.keyCode === 13) { // For Enter Key
    event.preventDefault();
    createList();
    return false;
  }
  return true;
}
// Adding Event listener keypress on Modal Input Textbox for CreateList
$('#navabarId').on('keypress', '#listInputId', createListFromInput);

trelloStore.subscribe(() => {
  var state = trelloStore.getState();
 state.selectedBid >= 0 ? navbar.showNavForBoardDetails(state.boards[state.selectedBid].name): navbar.showNavForBoardList();
});
