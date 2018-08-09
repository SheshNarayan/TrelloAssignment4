import 'jquery';
import 'jquery-ui';

import boardsView from './view';
import trelloStore from '../state';

function showBoardDetails(event) {
  trelloStore.dispatch({
    type: 'BOARDDETAIL',
    boardId: event.target.getAttribute('myBoardId'),
  });
}
//Adding Event listener to BoardName link onclick
$('#boardList').on('click', 'a', showBoardDetails);

function showBoardEdit(event) {
  boardsView.showBoardEditForm(event.target.getAttribute('myBoardId'));
}

//Adding Event listener to Board Edit button onclick
$('#boardList').on('click', '.boardEditIcon', showBoardEdit);

function deleteBoard(event) {
  trelloStore.dispatch({
    type: 'DELETEBOARD',
    boardId: event.target.getAttribute('myBoardId'),
  });
}
//Adding Event listener to Board Delete button onclick
$('#boardList').on('click', '.boardDeleteIcon', deleteBoard);

function updateBoardDetail(event) {
  if (event.keyCode === 13) { //For Enter KEY
    event.preventDefault();
    trelloStore.dispatch({
      type: 'UPDATEBOARD',
      name: event.target.value,
      boardId: event.target.getAttribute('myBoardId'),
    });
    return false;
  } 
  if (event.keyCode === 27) //For Ecs Key
    boardsView.hideBoardEditForm(event.target.getAttribute('myBoardId'));
  return true;
}
//Adding Event listener keyup/keypress is not working to Input textbox after clicking Edit button 
$('#boardList').on('keyup', 'input.form-control', updateBoardDetail);

function hideBoardEditForm(event) {
  boardsView.hideBoardEditForm(event.target.getAttribute('myBoardId'));
}
//Adding Event listener List textbox after focusout 
$('#boardList').on('focusout', 'input.form-control', hideBoardEditForm);
//$('#boardList input.form-control').focusout(hideBoardEditForm);

trelloStore.subscribe(() => {
  var state = trelloStore.getState();
  state.selectedBid >= 0 ?  boardsView.hideBoards() : boardsView.showBoards(state.boards);
});
