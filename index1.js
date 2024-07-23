const redux = require('redux')
const createStore = redux.createStore


// first we define the string constant which defines the type of the action

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

// action function
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

const initialState = {
    numberOfCakes :10,
    numberOfIceCreams:20,
}

// reducer - pure function

const reducer =(state=initialState, action)=>{
    switch(action.type){
        case BUY_CAKE: return{
            ...state, //makes a copy of the state
            numberOfCakes: state.numberOfCakes -1 //not mutating the state
        }
        case BUY_ICECREAM: return{
            ...state, //makes a copy of the state
            numberOfIceCreams: state.numberOfIceCreams -1 //not mutating the state
        }

        default: return state;
    }
}

const store = createStore(reducer)
// getState to get the state form the store
console.log('Initial-State', store.getState())
// subscribe to get the latest updates of state from the store
const unsubscribe = store.subscribe(()=> console.log('Updated state', store.getState()))
// dispatch - to initiate an action to the store to change the state(copy)
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()
console.log(store.getState())