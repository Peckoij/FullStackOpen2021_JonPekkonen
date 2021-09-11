import React from 'react'

const App = () => {
  /*
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
*/
const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log(props);
  return (
    <h1>{props.course}</h1>
  )
}
const Content = (props) => {
  console.log(props);
  console.log(props.parts[1]);
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}
const Total = (props) => {
  console.log(props)
  console.log(props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises)
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}
const Part = (props) => {
  console.log("Part function");
  console.log(props);
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}
export default App