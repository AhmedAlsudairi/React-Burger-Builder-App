import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware,compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/orders';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    orders: orderReducer,
    auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store= createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));
ReactDOM.render(<Provider store={store}><App /></Provider> , document.getElementById('root'));
registerServiceWorker();
