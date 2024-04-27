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

const Anecdote = ({ anecdote, points }) => {
  return (
    <div>
      {anecdote}<br />
      Votes: {points}<br />
    </div>
  )
}

const App = () => {
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
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [winner, setWinner] = useState(0)

  const handleRandomClick = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length))

  const handleVoteClick = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)

    if (newPoints[selected] > newPoints[winner])
      setWinner(selected)
  }
  
  return (
    <div>
      <Header title="Anecdote of the day"/>
      <Anecdote anecdote={anecdotes[selected]} points={points[selected]} />
      <Button onClick={handleVoteClick} text="Vote" />
      <Button onClick={handleRandomClick} text="Next anecdote" />
      <Header title="Anecdote with most votes"/>
      <Anecdote anecdote={anecdotes[winner]} points={points[winner]} />
    </div>
  )
}

export default App
