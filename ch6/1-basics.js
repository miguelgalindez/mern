import * as React from 'react'
import * as ReactDOM from 'react-dom'

// Defining functional components
const RedText=({text})=>(
    <span style={{color: 'red'}}>
        {text}
    </span>
)
const Welcome=({to})=>(
    <h1>Hello, <RedText text={to} /></h1>
)

// Defining an expression that will contain a reference to a React element
const TodoList=(
    <ul>
        <li>Lunch at 14:300 with Jenny</li>
        <li>Shower</li>
    </ul>
)

// Defininga class component named footer that will display the current date
class Footer extends React.Component{
    render(){
        return (
            <footer>
                {new Date().toDateString()}
            </footer>
        )
    }
}

// Rendering the application to the DOM
ReactDOM.render(
    <div>
        <Welcome to="John" />
        {TodoList}
        <Footer />
    </div>,
    document.querySelector('[role="main"]')
)