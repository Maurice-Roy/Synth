// const oldState = {
//   currentPatchSettings: {
//     id: null,
//     name: 'Default',
//     selectedWaveform: 'square',
//     masterGain: 0.5,
//     currentOctave: 4
//   },
//   activeOscillators: {},
//   allPatches: [],
//   allSynthrooms: [],
//   currentSynthroom: null,
//   username: 'Anonymous',
//   allCurrentUsers: {}
// }
const defaultState = {
  activeOscillators: {},
  allPatches: [],
  allSynthrooms: [],
  currentSynthroom: null,
  username: 'Anonymous',
  allCurrentUsers: {
    Anonymous: {
      currentPatchSettings: {
        id: null,
        name: 'Default',
        selectedWaveform: 'square',
        masterGain: 0.5,
        currentOctave: 4,
        oscillatorGainNodeValue: 0.5
      },
      signalProcessing: {
        oscillatorGainNode: null,
      }
    }
  }
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
      return {
        ...state,
        currentPatchSettings: {
          id: action.payload.id,
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
      return {
        ...state,
        currentPatchSettings: {
          id: action.payload.id,
          name: action.payload.name,
          selectedWaveform: action.payload.selected_waveform,
          masterGain: action.payload.master_gain,
          currentOctave: action.payload.current_octave
        }
      }
      break;
    case 'DELETE_PATCH':
      return defaultState
      break;
    case 'ADD_ACTIVE_OSCILLATOR':
      return {
        ...state,
        activeOscillators: {
          ...state.activeOscillators,
          [action.payload.username]: {
            ...state.activeOscillators[action.payload.username],
            [action.payload.key]: action.payload.oscillator
          }
        }
      }
      break;
    case 'REMOVE_ACTIVE_OSCILLATOR':
      var newState = {...state}
      delete newState.activeOscillators[action.payload.username][action.payload.key]
      return newState
      break;
    case 'FETCH_ALL_SYNTHROOMS':
      return {
        ...state,
        allSynthrooms: action.payload
      }
      break;
    case 'LOAD_SYNTHROOM':
      return {
        ...state,
        currentSynthroom: action.payload,
      }
      break;
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload,
        allCurrentUsers: {
          ...state.allCurrentUsers,
          [action.payload]: {
            currentPatchSettings: {
              id: null,
              name: 'Default',
              selectedWaveform: 'square',
              masterGain: 0.5,
              currentOctave: 4,
              oscillatorGainNodeValue: 0.5
            },
            signalProcessing: {
              oscillatorGainNode: null,
            }
          }
        }
      }
      break;
    case 'ADD_NEW_MESSAGE':
      return {
        ...state,
        currentSynthroom: {
          ...state.currentSynthroom,
          messages: [
            ...state.currentSynthroom.messages,
            action.payload
          ]
        }
      }
      break;
    case 'ADD_USER':
      return {
        ...state,
        activeOscillators: {
          ...state.activeOscillators,
          [action.payload.username]: {}
        },
        allCurrentUsers: {
          ...state.allCurrentUsers,
          [action.payload.username]: action.payload.newUser
        }
      }
      break;
    case 'REMOVE_USER':
      var newState = {...state}
      delete newState.allCurrentUsers[action.payload]
      return newState
      break;
    default:
      return state
      break;
  }
}
