import { useState } from 'react'

const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total ? (good + bad * -1) / total : 0
  const positive = total ? good * 100 / total : 0

  const handleClick = (state, setter) =>
        () => setter(state + 1)
  
  return (
    <div>
      <Header title="Give feedback" />
      <Button onClick={handleClick(good, setGood)} text="Good" />
      <Button onClick={handleClick(neutral, setNeutral)} text="Neutral" />
      <Button onClick={handleClick(bad, setBad)} text="Bad" />
      <Header title="Statistics" />
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive}%</p>
    </div>
  )
}

export default App
