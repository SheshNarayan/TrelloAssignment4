// Reducer function starts
function reducer(currentState = { selectedBid: -1, boards: [] }, action) {
  console.log("reducer.js -- reducer()")
  var nextState = getCurrentState(currentState);
  var boardId;
  var name;
  switch (action.type) {
    case 'LOADBOARDDATA':
      console.log("reducer LOADBOARDDATA");
      nextState.selectedBid = -1;
      nextState.boards = action.board;
      break;

    case 'SHOWBOARDDATA':
      console.log("reducer SHOWBOARDDATA");
      nextState.selectedBid = -1;
      break;

    case 'BOARDDETAIL':
      console.log("reducer BOARDDETAIL");
      nextState.selectedBid = action.boardId;
      break;

    case 'CREATEBOARD':
      console.log("reducer CREATEBOARD");
      name = action.name;
      var boardLength = nextState.boards.length;
      nextState.boards[boardLength] = {
        name, lists: []
      };
      break;

    case 'DELETEBOARD':
      console.log("reducer DELETEBOARD");
      boardId = action.boardId;
      //splice(indexNumber, NumberOfItem to delete)
      nextState.boards.splice(boardId, 1);
      break;

    case 'UPDATEBOARD':
      console.log("reducer UPDATEBOARD");
      boardId = action.boardId;
      name = action.name;
      nextState.boards[boardId].name = name;
      break;

    case 'CREATELISTONBOARD':
      console.log("reducer CREATELISTONBOARD");
      name = action.name;
      boardId = currentState.selectedBid;
      nextState.boards[boardId].lists[nextState.boards[boardId].lists.length] = {
        name, cards: []
      };
      break;

    case 'UPDATELISTONBOARD':
      console.log("reducer UPDATELISTONBOARD");
      name = action.name;
      var listId = action.listId;
      boardId = currentState.selectedBid;
      nextState.boards[boardId].lists[listId].name = name;
      break;

    case 'DELETELISTONBOARD':
      console.log("reducer DELETELISTONBOARD");
      var listId = action.listId;
      boardId = currentState.selectedBid;
      nextState.boards[boardId].lists.splice(listId, 1);
      break;

    case 'ADDCARDINLIST':
      console.log("reducer ADDCARDINLIST");
      boardId = currentState.selectedBid;
      name = action.name;
      var listId = action.listId;
      var cardlength = nextState.boards[boardId].lists[listId].cards.length;
      nextState.boards[boardId].lists[listId].cards[cardlength] = { name };
      nextState.selectedListId = listId;
      break;

    case 'DELETECARDFROMLIST':
      console.log("reducer DELETECARDFROMLIST");
      boardId = currentState.selectedBid;
      var listId = action.listId;
      var cardId = action.cardId;
      nextState.boards[boardId].lists[listId].cards.splice(cardId, 1);
      break;

    case 'UPDATECARDONLIST':
      console.log("reducer UPDATECARDONLIST");
      boardId = currentState.selectedBid;
      var listId = action.listId;
      var cardId = action.cardId;
      name = action.name;
      nextState.boards[boardId].lists[listId].cards[cardId].name = name;
      break;

    default:
      console.log("reducer Default Case");
  }
  return nextState;
}

// Return Next State
function getCurrentState(currentState) {
  var nextState = {};
  'selectedBid' in currentState ? nextState.selectedBid = currentState.selectedBid:nextState.selectedBid = -1;
  nextState.boards = [];
  currentState.boards.forEach((board) => {
    var currIndex = nextState.boards.length;
    nextState.boards[currIndex] = {
      name: board.name, lists: []
    };

    var tempList = [];
    board.lists.forEach((list) => {
      var currListIndex = tempList.length;
      tempList[currListIndex] = {
        name: list.name, cards: []
      };

      var cardsList = [];
      list.cards.forEach((card) => {
        cardsList[cardsList.length] = { name: card.name };
      });

      tempList[currListIndex].cards = cardsList;
    });
    nextState.boards[currIndex].lists = tempList;
  });
  return nextState;
}

export default reducer;
