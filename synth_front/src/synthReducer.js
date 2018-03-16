const defaultState = {
  currentPatchSettings: {
    name: 'Default Patch',
    selectedWaveform: 'square',
    masterGain: 0.5,
    currentOctave: 4
  },
  allPatches: [],
  activeOscillators: {}
}

export default function synthReducer (state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_ALL_PATCHES':
      return {
        ...state,
        allPatches: action.payload
      }
      break;
    case 'LOAD_PATCH':
      console.log('LOAD_PATCH: ', action.payload);
      return {
        ...state,
        currentPatchSettings: {
          name: action.payload.name,
          selectedWaveform: action.payload.selected_waveform,
          masterGain: action.payload.master_gain,
          currentOctave: action.payload.current_octave
        }
      }
      break;
    case 'UPDATE_PATCH':
      let newPatchSettings = {...state.currentPatchSettings}
      newPatchSettings[action.payload.synthParameter] = action.payload.data
      return {
        ...state,
        currentPatchSettings: newPatchSettings
      }
      break;
    case 'CREATE_NEW_PATCH':
      //FIXME return the updated state here
      console.log('CREATE_NEW_PATCH: ', action.payload);
      return state
      break;
    case 'DELETE_PATCH':
      //FIXME return the updated state here
      console.log('DELETE_PATCH: ', action.payload);
      return state
      break;
    case 'ADD_ACTIVE_OSCILLATOR':
      return {
        ...state,
        activeOscillators: {
          ...state.activeOscillators,
          [action.payload.frequency]: action.payload.oscillator
        }
      }
      break;
    case 'REMOVE_ACTIVE_OSCILLATOR':
      let newState = {...state}
      delete newState.activeOscillators[action.payload.frequency]
      return newState
      break;
    default:
      return state
      break;
  }
}
