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

  const handleClick = (state, setter) =>
        () => setter(state + 1)
   
  return (
    <div>
      <Header title="Give feedback" />
      <Button onClick={handleClick(good, setGood)} text="Good" />
      <Button onClick={handleClick(neutral, setNeutral)} text="Neutral" />
      <Button onClick={handleClick(bad, setBad)} text="Bad" />
      <Header title="Statistics" />
      <Statistics feedback={[good, neutral, bad]} />
    </div>
  )
}

export default App
