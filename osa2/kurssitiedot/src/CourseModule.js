import React from 'react'

const Course = (props) => {
    console.log(props);
    return (
        <div>
            <Header course={props.name} />
            <Content parts={props.parts} />
            <Total parts={props.parts} />
        </div>
    )
}

const Header = (props) => {
    console.log("Header component", props);
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    console.log("Content component", props);
    return (
        props.parts.map(part => <Part key={part.id} {...part} />)
    )
}

const Total = (props) => {
    console.log("Total calculation componen", props)
    let numberExercises = 0
    // earlier try with map function 
    // props.parts.map(part => { numberExercises = numberExercises + part.exercises });
    numberExercises = props.parts.reduce((sum, part) => { return sum + part.exercises }, 0)
    console.log("Total result", numberExercises)
    return (
        <div>
            <p><strong>Total of {numberExercises} exercises</strong></p>
        </div>
    )
}

const Part = (props) => {
    console.log("Part component ", props);
    let { name, exercises } = props
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

export default Course