const filterReducer = (state = '', action) => {
  // console.log('state now: ', state)
  switch (action.type) {
  case 'SET_FILTER':
    return action.payload
  default:
    return state
  }
}

const filterChange = (query) => {
  return {
    type: 'SET_FILTER',
    payload: query,
  }
}

export {
  filterChange,
}
export default filterReducer
