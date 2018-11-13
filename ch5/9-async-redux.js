const fetch=require('node-fetch')
const {createStore, applyMiddleware, combineReducers, bindActionCreators}=require('redux')

/**
 * Defining three kind of status. Each status represents 
 * the state of an asynchronous operation
 */
const STATUS={
    PENDING: 'PENDING',
    RESOLVED: 'RESOLVED',
    REJECTED:  'REJECTED'
}

// Defining the initial state of your application
const iniState = {
    time: {
        value: null,
        error: null,
        status: STATUS.RESOLVED
    },
    date: {
        value: null,
        error: null,
        status: STATUS.RESOLVED
    }
}

// Defining two action types
const TYPE={
    FETCH_TIME: 'FETCH_TIME',
    FETCH_DATE: 'FETCH_DATE'
}
// Defining action creators
const actions={
    fetchTime: ()=>({
        type: TYPE.FETCH_TIME,
        value: async()=>{
                const time=await fetch('http://localhost:1337/time').then((res)=>res.text())
                return time
            }
    }),
    fetchDate: ()=>({
        type: TYPE.FETCH_DATE,
        value: async()=>{
                const date=await fetch('http://localhost:1337/date').then((res)=>res.text())
                return date
            }
    }),
    setTime: time=>({
        type: TYPE.FETCH_TIME,
        value: time
    })
}
// Defining a common function for setting values from an action object
const setValue=(prevState, action)=>({
    ...prevState,
    value: action.value || null,
    error: action.error || null,
    status: action.status || STATUS.RESOLVED
})
/** 
 * Defining a reducer function. Notice that it is only  one reducer that
 * handles two slices of the state, the time and the date
*/ 
const timeReducer=(state=iniState, action)=>{
    switch (action.type) {
        case TYPE.FETCH_TIME:
            return {
                ...state,
                time: setValue(state.time, action)
            }            
        case  TYPE.FETCH_DATE:
            return {
                ...state,
                date: setValue(state.date, action)
            }    
        default:
            return state
    }
}
/**
 * Defining a middleware function that will check whether a dispatched
 * action type has a function as the value property. First, we dispatch
 * an action to set the status as PENDING. Then, when the async function 
 * is resolved, we dispatch another action to set the status as RESOLVED
 * or in case of an error as REJECTED
 */
const allowAsync=({dispatch})=>next=>action=>{
    if(typeof action.value ==='function'){
        dispatch({
            type: action.type,
            status: STATUS.PENDING
        })
        const promise=Promise
                            .resolve(action.value())
                            .then((value)=>dispatch({
                                type: action.type,
                                status: STATUS.RESOLVED,
                                value
                            }))
                            .catch((err)=>dispatch({
                                type: action.type,
                                status: STATUS.REJECTED,
                                error: err.message
                            }))
        return promise
    }
    return next(action)
}
/**
 * Creating a new store and apply your defined middleware function
 * to extend the functionality of the dispatch method
 */
const store=createStore(timeReducer, applyMiddleware(allowAsync))
// Binding action creators to the dispatch method of the store
const {setTime, fetchTime, fetchDate}=bindActionCreators(actions, store.dispatch)

// Subscribing a function listener to the store and display in terminal 
// the state tree every time there is a change in the state
store.subscribe(()=>{
    console.log('State has changed')
    console.dir(store.getState(), {colors: true, compact: false})
})

// Dispatching a SYNCHRONOUS action to set the time
setTime(new Date().toTimeString())

// Dispatching an ASYNCHRONOUS action to fetch and set the time
fetchTime()

// Dispatching an ASYNCHRONOUS action to fetch and set the date.
// Remember that this operation is supposed to fail and it's intentional
fetchDate()