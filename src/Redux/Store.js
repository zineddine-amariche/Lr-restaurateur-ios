import {createStore} from 'redux';
import rootReducer from './Reducers/index';

const configureStore = () => createStore(rootReducer);

export default configureStore;
