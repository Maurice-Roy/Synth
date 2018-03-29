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
        filterFrequency: 20.0,
        filterQ: 1.0,
        filterType: 'highpass',
        gainEnvelopeAttackTime: 0.2,
        gainEnvelopeDecayTime: 0.25,
        gainEnvelopeSustainLevel: 0.8,
        gainEnvelopeReleaseTime: 0.5,
        gainEnvelopeGateTime: Infinity,
        gainEnvelopeReleaseCurve: "exp",
        adsrFilterFrequency: 10000.0,
        adsrFilterQ: 1.0,
        adsrFilterType: 'lowpass',
        filterEnvelopeAttackTime: 0.2,
        filterEnvelopeDecayTime: 0.25,
        filterEnvelopeSustainLevel: 0.8,
        filterEnvelopePeakLevel: 10000.0,
        filterEnvelopeReleaseTime: 0.5,
        filterEnvelopeGateTime: Infinity,
        filterEnvelopeReleaseCurve: "exp"
      },
      signalProcessing: {
        oscillatorGainNode: null,
        filterNode: null,
        gainEnvelope: null,
        filterEnvelope: null
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
              filterType: action.payload.patch.filter_type,
              gainEnvelopeAttackTime: action.payload.patch.gain_envelope_attack_time,
              gainEnvelopeDecayTime: action.payload.patch.gain_envelope_decay_time,
              gainEnvelopeSustainLevel: action.payload.patch.gain_envelope_sustain_level,
              gainEnvelopeReleaseTime: action.payload.patch.gain_envelope_release_time,
              gainEnvelopeGateTime: action.payload.patch.gain_envelope_gate_time,
              gainEnvelopeReleaseCurve: action.payload.patch.gain_envelope_release_curve,
              adsrFilterFrequency: action.payload.patch.adsr_filter_frequency,
              adsrFilterQ: action.payload.patch.adsr_filter_q,
              adsrFilterType: action.payload.patch.adsr_filter_type,
              filterEnvelopeAttackTime: action.payload.patch.filter_envelope_attack_time,
              filterEnvelopeDecayTime: action.payload.patch.filter_envelope_decay_time,
              filterEnvelopeSustainLevel: action.payload.patch.filter_envelope_sustain_level,
              filterEnvelopePeakLevel: action.payload.patch.filter_envelope_peak_level,
              filterEnvelopeReleaseTime: action.payload.patch.filter_envelope_release_time,
              filterEnvelopeGateTime: action.payload.patch.filter_envelope_gate_time,
              filterEnvelopeReleaseCurve: action.payload.patch.filter_envelope_release_curve
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
              filterType: action.payload.patch.filter_type,
              gainEnvelopeAttackTime: action.payload.patch.gain_envelope_attack_time,
              gainEnvelopeDecayTime: action.payload.patch.gain_envelope_decay_time,
              gainEnvelopeSustainLevel: action.payload.patch.gain_envelope_sustain_level,
              gainEnvelopeReleaseTime: action.payload.patch.gain_envelope_release_time,
              gainEnvelopeGateTime: action.payload.patch.gain_envelope_gate_time,
              gainEnvelopeReleaseCurve: action.payload.patch.gain_envelope_release_curve,
              adsrFilterFrequency: action.payload.patch.adsr_filter_frequency,
              adsrFilterQ: action.payload.patch.adsr_filter_q,
              adsrFilterType: action.payload.patch.adsr_filter_type,
              filterEnvelopeAttackTime: action.payload.patch.filter_envelope_attack_time,
              filterEnvelopeDecayTime: action.payload.patch.filter_envelope_decay_time,
              filterEnvelopeSustainLevel: action.payload.patch.filter_envelope_sustain_level,
              filterEnvelopePeakLevel: action.payload.patch.filter_envelope_peak_level,
              filterEnvelopeReleaseTime: action.payload.patch.filter_envelope_release_time,
              filterEnvelopeGateTime: action.payload.patch.filter_envelope_gate_time,
              filterEnvelopeReleaseCurve: action.payload.patch.filter_envelope_release_curve
            }
          }
        }
      }
    case 'DELETE_PATCH':
      return defaultState
    case 'ADD_ACTIVE_OSCILLATOR':
      console.log('inside ADD_ACTIVE_OSC');
      console.log('action',action);
      return {
        ...state,
        activeOscillators: {
          ...state.activeOscillators,
          [action.payload.username]: {
            ...state.activeOscillators[action.payload.username],
            [action.payload.key]: {
              oscillatorNode: action.payload.oscillatorNode,
              adsrGainNode: action.payload.adsrGainNode,
              adsrFilterNode: action.payload.adsrFilterNode,
              startTime: action.payload.startTime
            }
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
      localStorage.setItem("username", action.payload)
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
              filterFrequency: 20.0,
              filterQ: 1.0,
              filterType: 'highpass',
              gainEnvelopeAttackTime: 0.2,
              gainEnvelopeDecayTime: 0.25,
              gainEnvelopeSustainLevel: 0.8,
              gainEnvelopeReleaseTime: 0.5,
              gainEnvelopeGateTime: Infinity,
              gainEnvelopeReleaseCurve: "exp",
              adsrFilterFrequency: 10000.0,
              adsrFilterQ: 1.0,
              adsrFilterType: 'lowpass',
              filterEnvelopeAttackTime: 0.2,
              filterEnvelopeDecayTime: 0.25,
              filterEnvelopeSustainLevel: 0.8,
              filterEnvelopePeakLevel: 10000.0,
              filterEnvelopeReleaseTime: 0.5,
              filterEnvelopeGateTime: Infinity,
              filterEnvelopeReleaseCurve: "exp"
            },
            signalProcessing: {
              oscillatorGainNode: null,
              filterNode: null,
              gainEnvelope: null,
              filterEnvelope: null
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
