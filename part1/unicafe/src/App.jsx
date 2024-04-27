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

const StatisticLine = ({ text, value, suffix="" }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}{suffix}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const [good, neutral, bad] = props.feedback
  const total = good + neutral + bad
  const average = total ? (good + bad * -1) / total : 0
  const positive = total ? good * 100 / total : 0

  if (total) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positive} suffix="%" />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const handleClick = (state, setter) =>
        () => setter(state + 1)

  const handleRandomClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
   
  return (
    <div>
      <Header title="Give feedback" />
      <Button onClick={handleClick(good, setGood)} text="Good" />
      <Button onClick={handleClick(neutral, setNeutral)} text="Neutral" />
      <Button onClick={handleClick(bad, setBad)} text="Bad" />
      <Header title="Statistics" />
      <Statistics feedback={[good, neutral, bad]} />
      {anecdotes[selected]}<br />
      <Button onClick={handleRandomClick} text="Next anecdote" />
    </div>
  )
}

export default App
