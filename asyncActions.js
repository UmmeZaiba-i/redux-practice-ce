const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default; 
const axios = require('axios');

// state with 3 properties
const initialState = {
    loading: false,
    users: [],
    errors: '',
};

// Action constants
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// actions - action creators
const fetchUserRequests = () => {
    return {
        type: FETCH_USERS_REQUEST,
    };
};
const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
    };
};
const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error,
    };
};

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: '',
            };
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            };
    }
};

// action creators - ability for an ac to return function instead of action object - thunk middleware
// doesnt have to be pure -can have side effect and async api calls - can dispatch method
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUserRequests())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map(user => user.id);
                dispatch(fetchUsersSuccess(users));
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message));
            });
    };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
// console.log(thunkMiddleware)
store.subscribe(() => {console.log(store.getState())});
store.dispatch(fetchUsers());
