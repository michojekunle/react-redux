const redux =  require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake() {
    return {
        type: BUY_CAKE,
        info: "FIRST REDUX ACTION"
    }
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM
  }
}

const initialCakeStates = {
  numberOfCakes: 10
}

const initialIceCreamStates = {
  numberOfIceCreams: 20
}

////Single Reducers for multiple shopkeepers
// (previousState, action) => newState 
//const initialState = {
//    numberOfCakes: 10, 
//    numberOfIceCreams: 20
//}

//const reducer = (state = initialState, action) => //{
//  switch (action.type) {
     //   case BUY_CAKE: return {
         //   ...state,
      //      numberOfCakes: state.numberOfCakes - 1
      //  }
        //case BUY_ICECREAM: return {
         //   ...state,
           // numberOfIceCreams: state.numberOfIceCreams - 1
       // }
        //default: return state
   // }
//}


const cakeReducer = (state = initialCakeStates, action) => {
  switch(action.type){
    case BUY_CAKE: return {
      ...state, 
      numberOfCakes: state.numberOfCakes - 1
    }
    default: return state 
  }
}

const iceCreamReducer = (state = initialIceCreamStates, action) => {
  switch(action.type){
    case BUY_ICECREAM: return {
      ...state, 
      numberOfIceCreams: state.numberOfIceCreams - 1
    }
    default: return state 
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger));

console.log('Initial State: ', store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();
