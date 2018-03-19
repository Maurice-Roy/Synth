const FETCH_ALL_PATCHES = 'FETCH_ALL_PATCHES'
const LOAD_PATCH = 'LOAD_PATCH'
const UPDATE_PATCH = 'UPDATE_PATCH'
const CREATE_NEW_PATCH = 'CREATE_NEW_PATCH'
const DELETE_PATCH = 'DELETE_PATCH'

const ADD_ACTIVE_OSCILLATOR = 'ADD_ACTIVE_OSCILLATOR'
const REMOVE_ACTIVE_OSCILLATOR = 'REMOVE_ACTIVE_OSCILLATOR'

const FETCH_ALL_SYNTHROOMS = 'FETCH_ALL_SYNTHROOMS'
const LOAD_SYNTHROOM = 'LOAD_SYNTHROOM'

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

export const updatePatch = (synthParameter, data) => {
  return {
    type: UPDATE_PATCH,
    payload: {synthParameter, data}
  }
}

export const createNewPatch = (currentPatchSettings) => {
  let newPatchSettings = {
    name: currentPatchSettings.name,
    selectedWaveform: currentPatchSettings.selectedWaveform,
    masterGain: currentPatchSettings.masterGain,
    currentOctave: currentPatchSettings.currentOctave
  }

  return function(dispatch){
    fetch('http://localhost:3000/patches',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPatchSettings)
    })
    .then(res => res.json())
    .then(patch => {
      dispatch({type: CREATE_NEW_PATCH, payload: patch})
    })
  }
}

export const deletePatch = (patchID) => {
  return function(dispatch){
    fetch(`http://localhost:3000/patches/${patchID}`,{
      method: "DELETE",
    })
    .then(() => {
      dispatch({type: DELETE_PATCH})
    })
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

export const fetchAllSynthrooms = () => {
  return function(dispatch){
    fetch('http://localhost:3000/synthrooms')
    .then(res => res.json())
    .then(synthrooms => {
      dispatch({type: FETCH_ALL_SYNTHROOMS, payload: synthrooms})
    })
  }
}

export const loadSynthroom = (synthroomID) => {
  console.log(synthroomID);
  return function(dispatch){
    fetch(`http://localhost:3000/synthrooms/${synthroomID}`)
		.then(res => res.json())
		.then(synthroom => {
      dispatch({
        type: LOAD_SYNTHROOM,
        payload: synthroom
      })
    })
  }
}
