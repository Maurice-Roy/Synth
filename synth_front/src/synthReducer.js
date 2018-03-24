let newState
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
        oscillatorGainNodeValue: 0.5,
        filterFrequency: 10000.0,
        filterQ: 1.0,
        filterType: 'lowpass'
      },
      signalProcessing: {
        oscillatorGainNode: null,
        filterNode: null
      }
    }
  },
  newYork: 'mind'
}

export default function synthReducer (state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_ALL_PATCHES':
      return {
        ...state,
        allPatches: action.payload
      }
    case 'LOAD_PATCH':
      return {
        ...state,
        allCurrentUsers: {
          ...state.allCurrentUsers,
          [action.payload.username]: {
            ...state.allCurrentUsers[action.payload.username],
            currentPatchSettings: {
              id: action.payload.patch.id,
              name: action.payload.patch.name,
              selectedWaveform: action.payload.patch.selected_waveform,
              masterGain: action.payload.patch.master_gain,
              currentOctave: action.payload.patch.current_octave,
              oscillatorGainNodeValue: action.payload.patch.oscillator_gain_node_value,
              filterFrequency: action.payload.patch.filter_frequency,
              filterQ: action.payload.patch.filter_q,
              filterType: action.payload.patch.filter_type
            }
          }
        }
      }
    case 'UPDATE_PATCH':
      console.log('action in UPDATE_PATCH:', action);
      return {
        ...state,
        allCurrentUsers: {
          ...state.allCurrentUsers,
          [action.payload.username]: {
            ...state.allCurrentUsers[action.payload.username],
            currentPatchSettings: {
              ...state.allCurrentUsers[action.payload.username].currentPatchSettings,
              [action.payload.synthParameter]: action.payload.value
            }
          }
        }
      }
    case 'CREATE_NEW_PATCH':
      return {
        ...state,
        allCurrentUsers: {
          ...state.allCurrentUsers,
          [action.payload.username]: {
            ...state.allCurrentUsers[action.payload.username],
            currentPatchSettings: {
              id: action.payload.patch.id,
              name: action.payload.patch.name,
              selectedWaveform: action.payload.patch.selected_waveform,
              masterGain: action.payload.patch.master_gain,
              currentOctave: action.payload.patch.current_octave,
              oscillatorGainNodeValue: action.payload.patch.oscillator_gain_node_value,
              filterFrequency: action.payload.patch.filter_frequency,
              filterQ: action.payload.patch.filter_q,
              filterType: action.payload.patch.filter_type
            }
          }
        }
      }
    case 'DELETE_PATCH':
      return defaultState
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
    case 'REMOVE_ACTIVE_OSCILLATOR':
      newState = {...state}
      delete newState.activeOscillators[action.payload.username][action.payload.key]
      return newState
    case 'FETCH_ALL_SYNTHROOMS':
      return {
        ...state,
        allSynthrooms: action.payload
      }
    case 'LOAD_SYNTHROOM':
      return {
        ...state,
        currentSynthroom: action.payload,
      }
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
              oscillatorGainNodeValue: 0.5,
              filterFrequency: 10000.0,
              filterQ: 1.0,
              filterType: 'lowpass'
            },
            signalProcessing: {
              oscillatorGainNode: null,
              filterNode: null
            }
          }
        }
      }
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
    case 'REMOVE_USER':
      newState = {...state}
      delete newState.allCurrentUsers[action.payload]
      return newState
    default:
      return state
  }
}
