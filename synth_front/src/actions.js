const UPDATE_PATCH = 'UPDATE_PATCH'
const FETCH_PATCHES = 'FETCH_PATCHES'

export const updatePatch = (data) => {
  return {
    type: UPDATE_PATCH,
    payload: data
  }
}

export const fetchPatches = () => {
  return function(dispatch){
    fetch('http://localhost:3000/patches')
      .then(res => res.json())
      .then(patches => {
        dispatch({type: FETCH_PATCHES, payload: patches})
      })
  }
}
