const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.info.part} {props.info.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part info={props.part1} />
      <Part info={props.part2} />
      <Part info={props.part3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.part1.exercises + props.part2.exercises + props.part3.exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    part: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    part: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    part: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  )
}

export default App
