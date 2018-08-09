
import $ from 'jquery';
import trelloStore from './state';

//Invoked on load
loadBoardFromJSONDB();

function loadBoardFromJSONDB() {
  console.log("service.js - loadBoardFromJSONDB()");
  $.ajax('http://localhost:5000/boards/1',{
      dataType: 'json',
     success: function(boarddata) {
        trelloStore.dispatch({
          type: 'LOADBOARDDATA',
          board: JSON.parse(boarddata.board)
        });
      }
    });
}

function saveBoardsData(boarddata) {
  $.ajax('http://localhost:5000/boards/', {
    type: 'POST',
    data: { board: JSON.stringify(boarddata) }
  });
}
function saveBoard(boarddata) {
  $.ajax('http://localhost:5000/boards/1', {
    type: 'DELETE',
    board: JSON.stringify(boarddata),
    success:function() {
      saveBoardsData(boarddata);
    }
  });
}
function saveDataOnJSONDB() {
  var currState = trelloStore.getState();
  saveBoard(currState.boards);
}

trelloStore.subscribe(saveDataOnJSONDB);
export { loadBoardFromJSONDB, saveBoard };