import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(fillArray(anecdotes.length))


  console.log(points) 
  //console.log(selected);
  //console.log(points[selected])

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div> {anecdotes[selected]} </div>
      <div>has {points[selected]} votes</div>
      <Button handleClick={() => setPoints(handleVote(points, selected))} text="vote" />
      <Button handleClick={() => setSelected(rndNumber(anecdotes.length))} text="next anecdote" />
      <div>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[indexOfMax(points)]}</div>
      <div>has {points[indexOfMax(points)]}</div>
      </div>
    </div>

  )
}



// return random number between zero and length of array
const rndNumber = (props) => {
  //console.log(props);
  let nmr = Math.floor(Math.random() * props);
  //console.log(nmr);
  return nmr;
}

// button thingy
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

// create array with given length and fill it with zeroes, return zeroed array
const fillArray = (props) => {
  const array = Array(props).fill(0)
  //console.log(array);
  return array
}

// add 1 to given index in the array
const handleVote = (array, index) => {
  //console.log(array);
  //console.log(index);
  const copy = [...array]
  copy[index] += 1
  return copy
}

// find and return index of highest value in given array
const indexOfMax = (arr) => {
  let max = arr[0]
  let maxIndex  =0
  for (let i = 1; i < arr.length; i++){
    if (arr[i]>max){
      maxIndex = i
      max = arr[i]
    }
  }
  return maxIndex
}

export default App