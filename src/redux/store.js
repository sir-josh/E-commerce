import { createStore, applyMiddleware } from "redux";
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

import rootReducer from './root-reducer';

if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

 const store = createStore(rootReducer, applyMiddleware(...middlewares));

 const persistor = persistStore(store);

export { store, persistor };