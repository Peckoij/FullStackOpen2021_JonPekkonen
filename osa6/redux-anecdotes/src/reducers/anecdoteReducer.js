const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// Action creator for voting anecdote
export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    id
  }
}

export const newAnecdote = (text) => {
  console.log(text);
  const newObj = asObject(text);
  return {
    type: 'NEW_ANECDOTE',
    newObj
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'ADD_VOTE':
      return state.map(obj => {
        if (obj.id === action.id) {
          obj.votes += 1;
        }
        return obj
      });
    case 'NEW_ANECDOTE':
      return state.concat(action.newObj)
    default: return state
  }
}

export default reducer