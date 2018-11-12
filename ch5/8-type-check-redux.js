/**
 * Understanding Redux middleware  
 */

const {createStore, applyMiddleware}=require('redux')
// Defining the action types
const TYPE = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    SET_TIME: 'SET_TIME',
}
// Creating a dummy reducer function that returns its original state
// whichever action type is called
const reducer=(state=null, action)=>state
/**
 * Defining a middleware that will intercept every action that is being 
 * dispatched and checks whether the action type exists in the TYPE object
 */ 
const typeCheckMiddleware = api => next => action => {
    if(Reflect.has(TYPE, action.type)){
        next(action)
    } else{
        throw  new Error(`Type "${action.type}" is not a valid action type. ` +
                        `Did you mean to use one of the following valid types? ` +
                        `"${Reflect.ownKeys(TYPE).join('"|"')}"n`);
    }
}
// Creating a store and applying the defined middleware function
const store=createStore(reducer, applyMiddleware(typeCheckMiddleware))

store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'MISTAKE'})