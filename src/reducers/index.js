import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import formVisibleReducer from './form-visible-reducer';
import memoryListReducer from './memory-list-reducer';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterMemoryList: memoryListReducer,
  firestore: firestoreReducer
});

export default rootReducer;