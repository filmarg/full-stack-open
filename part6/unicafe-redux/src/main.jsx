import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const handleClick = (action) =>
    () => store.dispatch({ type: action })

  const state = store.getState()
  
  return (
    <div>
      <button onClick={handleClick('GOOD')}>Good</button> 
      <button onClick={handleClick('OK')}>OK</button> 
      <button onClick={handleClick('BAD')}>Bad</button>
      <button onClick={handleClick('ZERO')}>Reset stats</button>
      <div>Good: {state.good}</div>
      <div>OK: {state.ok}</div>
      <div>Bad: {state.bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
