/**
 * A common mistake is to asume that events are called asynchronously.
 * It is true that defined events can be called at any time. However, 
 * they are still executed synchronously. Take the following example:
 */
const EventEmitter=require('events')
const events=new EventEmitter()

console.log('Synchronous handler functions')
for(let i=0; i<5; i++){
    events.on('print', ()=>console.log(i))
}

events.emit('print')
/**
 * The preceding code prints the output from each handler attached to
 * the event for the loop. Each handler is executed in the same order
 * in which they are attached. So the output will print the numbers
 * from 0 to 4 in an evident synchronous way
 * 
 * But events can be made asynchronous by simply adding an async 
 * function as event listener. By doing so, every function will 
 * still be called in order from the first listener defined to the
 * last. However the emitter WON'T WAIT for the first listener to 
 * finish its execution to call the next listener.
 */
var wait = ms => new Promise((r, j)=>setTimeout(r, ms))
console.log('Asynchronous handler functions')
for(let i=0; i<4; i++){    
    events.on('asyncPrint', async ()=>{
        await wait((3-i)*1000)
        console.log(i)
    })
}
events.emit('asyncPrint')
/**
 * The preceding code will print the output of the handlers in a
 * reverse order. This ilustrates how the last handlers were 
 * executed even before the first handler finished its execution.
 * 
 * Asynchronous functions allow us to write non-blocking 
 * applications. If implemented correctly, you won't run into 
 * problems like this above.
 */

return this.listeners('logme').reduce(
    (promise, nextEvt) => promise.then(nextEvt),
    Promise.resolve(),
    )
    