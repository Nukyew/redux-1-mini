import {createStore} from 'redux'

// INITIAL STATE
const initialState = {
    currentValue: 0,
    futureValues: [],
    previousValues: [],
}

// ACTION CONSTS
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const UNDO = 'UNDO'
export const REDO = 'REDO'

// REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UNDO:
            return {...state,
                currentValue: state.previousValues[0],
                futureValues: [state.currentValue, ...state.futureValues],
                previousValues: state.previousValues.slice(1)}
        case REDO:
            let newFutureValues = [...state.futureValues]
            newFutureValues.splice(0, 1)
            return {...state,
                currentValue: state.futureValues[0],
                futureValues: newFutureValues,
                previousValues: [state.currentValue, ...state.previousValues]}
        case INCREMENT:
            /* We're returning a new object by wrapping it in curly braces */
            return{...state, currentValue: state.currentValue + action.amount,
                futureValues: [],
                previousValues: [state.currentValue, ...state.previousValues]}
        case DECREMENT:
            return {...state,
                currentValue: state.currentValue - action.amount,
                futureValues: [],
                previousValues: [state.currentValue, ...state.previousValues]}
        default:
            return state
    }
}

// EXPORT THE STORE BY DEFAULT
export default createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )