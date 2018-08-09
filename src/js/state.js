import { createStore } from 'redux';
import reducer from './reducer';

const trelloStore = createStore(reducer,{ selectedBid: -1, boards: [] });

export default trelloStore;
