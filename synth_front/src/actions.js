// import React from 'react';
// import { connect } from 'react-redux'


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
  console.log('patch in loadPatch action: ', patch);
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
    selected_waveform: currentPatchSettings.selectedWaveform,
    master_gain: currentPatchSettings.masterGain,
    current_octave: currentPatchSettings.currentOctave
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
    // .then(() => this.props.fetchAllPatches())
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

// const mapStateToProps = (state) => {
//   return {...state}
// }
//
// connect(mapStateToProps)
