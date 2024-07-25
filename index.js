const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers

const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()


// first we define the string constant which defines the type of the action

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

// action function - synchronous actions
function buyCake(){
    return{
        type: BUY_CAKE,
    info: 'First redux action'
    }
}
function buyIceCream(){
    return{
        type: BUY_ICECREAM,
        // info: 
    }
}

// reducer {prevState, action}=> new State

const initialCakeState = {
    numberOfCakes:10,
}

const initialIceCreamState = {
    numberOfIceCreams:20,
}

// reducer - pure function

const cakeReducer =(state=initialCakeState, action)=>{
    switch(action.type){
        case BUY_CAKE: return{
            ...state, //makes a copy of the state
            numberOfCakes: state.numberOfCakes -1 //not mutating the state
        }
        default: return state;
    }
}
const iceCreamReducer =(state=initialIceCreamState, action)=>{
    switch(action.type){
        case BUY_ICECREAM: return{
            ...state, //makes a copy of the state
            numberOfIceCreams: state.numberOfIceCreams -1 //not mutating the state
        }
        default: return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})

const store = createStore(rootReducer, applyMiddleware(logger))
// getState to get the state form the store
console.log('Initial-State', store.getState())
// subscribe to get the latest updates of state from the store - THIS IS DISPLAYED EVERYTIME THE DISPATCH METHOD IS USED
const unsubscribe = store.subscribe(()=>{})
// dispatch - to initiate an action to the store to change the state(copy)
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()
console.log(store.getState())