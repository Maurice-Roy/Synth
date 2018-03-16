const FETCH_ALL_PATCHES = 'FETCH_ALL_PATCHES'
const LOAD_PATCH = 'LOAD_PATCH'
const UPDATE_PATCH = 'UPDATE_PATCH'
const CREATE_NEW_PATCH = 'CREATE_NEW_PATCH'
const DELETE_PATCH = 'DELETE_PATCH'

const ADD_ACTIVE_OSCILLATOR = 'ADD_ACTIVE_OSCILLATOR'
const REMOVE_ACTIVE_OSCILLATOR = 'REMOVE_ACTIVE_OSCILLATOR'

export const fetchAllPatches = () => {
  return function(dispatch){
    fetch('http://localhost:3000/patches')
    .then(res => res.json())
    .then(patches => {
      dispatch({type: FETCH_ALL_PATCHES, payload: patches})
    })
  }
}

export const loadPatch = (patch) => {
  return {
    type: LOAD_PATCH,
    payload: patch
  }
}

export const updatePatch = (data) => {
  return {
    type: UPDATE_PATCH,
    payload: data
  }
}

export const createNewPatch = (currentPatchState) => {
  return {
    type: CREATE_NEW_PATCH,
    payload: currentPatchState
  }
}

export const deletePatch = (patch) => {
  return {
    type: DELETE_PATCH,
    payload: patch
  }
}

export const addActiveOscillator = (frequency, oscillator) => {
  console.log("add actice osc", frequency, oscillator)
  return {
    type: ADD_ACTIVE_OSCILLATOR,
    payload: {frequency, oscillator}
  }
}

export const removeActiveOscillator = (frequency) => {
  console.log("remove actice osc", frequency)
  return {
    type: REMOVE_ACTIVE_OSCILLATOR,
    payload: {frequency}
  }
}
