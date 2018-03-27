import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchAllPatches, loadPatch, updatePatch, createNewPatch, deletePatch, addActiveOscillator, removeActiveOscillator, addNewMessage, addUser, removeUser } from './actions'
import { ActionCable } from 'react-actioncable-provider'
import ADSREnvelope from "adsr-envelope"
// import logo from './scull4.png';
import Spectral from './Spectral'
// import topKeyboard from './top_keyboard.svg'
// import bottomKeyboard from './bottom_keyboard.svg'
import './Synthroom.css';

class Synthroom extends Component {
  constructor(props) {
    super(props)
    //initial variables
    this.AudioContext = window.AudioContext || window.webkitAudioContext
    this.audioContext = new this.AudioContext()
    this.analyser = this.audioContext.createAnalyser();
    console.log('current time in constuctor', this.audioContext.currentTime);
  }

  state = {
    messageInput: ''
  }

  createNoteTable = () => {
    let noteFreq = [];
    for (let i=0; i< 9; i++) {
      noteFreq[i] = [];
    }

    noteFreq[0]["C"] = 16.35;
    noteFreq[0]["C#"] = 17.32;
    noteFreq[0]["D"] = 18.35;
    noteFreq[0]["D#"] = 19.45;
    noteFreq[0]["E"] = 20.60;
    noteFreq[0]["F"] = 21.83;
    noteFreq[0]["F#"] = 23.12;
    noteFreq[0]["G"] = 24.50;
    noteFreq[0]["G#"] = 25.96;
    noteFreq[0]["A"] = 27.50;
    noteFreq[0]["A#"] = 29.14;
    noteFreq[0]["B"] = 30.87;

    noteFreq[1]["C"] = 32.703195662574829;
    noteFreq[1]["C#"] = 34.647828872109012;
    noteFreq[1]["D"] = 36.708095989675945;
    noteFreq[1]["D#"] = 38.890872965260113;
    noteFreq[1]["E"] = 41.203444614108741;
    noteFreq[1]["F"] = 43.653528929125485;
    noteFreq[1]["F#"] = 46.249302838954299;
    noteFreq[1]["G"] = 48.999429497718661;
    noteFreq[1]["G#"] = 51.913087197493142;
    noteFreq[1]["A"] = 55.000000000000000;
    noteFreq[1]["A#"] = 58.270470189761239;
    noteFreq[1]["B"] = 61.735412657015513;

    noteFreq[2]["C"] = 65.406391325149658;
    noteFreq[2]["C#"] = 69.295657744218024;
    noteFreq[2]["D"] = 73.416191979351890;
    noteFreq[2]["D#"] = 77.781745930520227;
    noteFreq[2]["E"] = 82.406889228217482;
    noteFreq[2]["F"] = 87.307057858250971;
    noteFreq[2]["F#"] = 92.498605677908599;
    noteFreq[2]["G"] = 97.998858995437323;
    noteFreq[2]["G#"] = 103.826174394986284;
    noteFreq[2]["A"] = 110.000000000000000;
    noteFreq[2]["A#"] = 116.540940379522479;
    noteFreq[2]["B"] = 123.470825314031027;

    noteFreq[3]["C"] = 130.812782650299317;
    noteFreq[3]["C#"] = 138.591315488436048;
    noteFreq[3]["D"] = 146.832383958703780;
    noteFreq[3]["D#"] = 155.563491861040455;
    noteFreq[3]["E"] = 164.813778456434964;
    noteFreq[3]["F"] = 174.614115716501942;
    noteFreq[3]["F#"] = 184.997211355817199;
    noteFreq[3]["G"] = 195.997717990874647;
    noteFreq[3]["G#"] = 207.652348789972569;
    noteFreq[3]["A"] = 220.000000000000000;
    noteFreq[3]["A#"] = 233.081880759044958;
    noteFreq[3]["B"] = 246.941650628062055;

    noteFreq[4]["C"] = 261.625565300598634;
    noteFreq[4]["C#"] = 277.182630976872096;
    noteFreq[4]["D"] = 293.664767917407560;
    noteFreq[4]["D#"] = 311.126983722080910;
    noteFreq[4]["E"] = 329.627556912869929;
    noteFreq[4]["F"] = 349.228231433003884;
    noteFreq[4]["F#"] = 369.994422711634398;
    noteFreq[4]["G"] = 391.995435981749294;
    noteFreq[4]["G#"] = 415.304697579945138;
    noteFreq[4]["A"] = 440.000000000000000;
    noteFreq[4]["A#"] = 466.163761518089916;
    noteFreq[4]["B"] = 493.883301256124111;

    noteFreq[5]["C"] = 523.251130601197269;
    noteFreq[5]["C#"] = 554.365261953744192;
    noteFreq[5]["D"] = 587.329535834815120;
    noteFreq[5]["D#"] = 622.253967444161821;
    noteFreq[5]["E"] = 659.255113825739859;
    noteFreq[5]["F"] = 698.456462866007768;
    noteFreq[5]["F#"] = 739.988845423268797;
    noteFreq[5]["G"] = 783.990871963498588;
    noteFreq[5]["G#"] = 830.609395159890277;
    noteFreq[5]["A"] = 880.000000000000000;
    noteFreq[5]["A#"] = 932.327523036179832;
    noteFreq[5]["B"] = 987.766602512248223;

    noteFreq[6]["C"] = 1046.502261202394538;
    noteFreq[6]["C#"] = 1108.730523907488384;
    noteFreq[6]["D"] = 1174.659071669630241;
    noteFreq[6]["D#"] = 1244.507934888323642;
    noteFreq[6]["E"] = 1318.510227651479718;
    noteFreq[6]["F"] = 1396.912925732015537;
    noteFreq[6]["F#"] = 1479.977690846537595;
    noteFreq[6]["G"] = 1567.981743926997176;
    noteFreq[6]["G#"] = 1661.218790319780554;
    noteFreq[6]["A"] = 1760.000000000000000;
    noteFreq[6]["A#"] = 1864.655046072359665;
    noteFreq[6]["B"] = 1975.533205024496447;

    noteFreq[7]["C"] = 2093.004522404789077;
    noteFreq[7]["C#"] = 2217.461047814976769;
    noteFreq[7]["D"] = 2349.318143339260482;
    noteFreq[7]["D#"] = 2489.015869776647285;
    noteFreq[7]["E"] = 2637.020455302959437;
    noteFreq[7]["F"] = 2793.825851464031075;
    noteFreq[7]["F#"] = 2959.955381693075191;
    noteFreq[7]["G"] = 3135.963487853994352;
    noteFreq[7]["G#"] = 3322.437580639561108;
    noteFreq[7]["A"] = 3520.000000000000000;
    noteFreq[7]["A#"] = 3729.310092144719331;
    noteFreq[7]["B"] = 3951.066410048992894;

    noteFreq[8]["C"] = 4186.009044809578154;
    noteFreq[8]["C#"] = 4434.92;
    noteFreq[8]["D"] = 4698.63;
    noteFreq[8]["D#"] = 4978.03;
    noteFreq[8]["E"] = 5274.04;
    noteFreq[8]["F"] = 5587.65;
    noteFreq[8]["F#"] = 5919.91;
    noteFreq[8]["G"] = 6271.93;
    noteFreq[8]["G#"] = 6644.88;
    noteFreq[8]["A"] = 7040.00;
    noteFreq[8]["A#"] = 7458.62;
    noteFreq[8]["B"] = 7902.13;
    return noteFreq;
  }

  componentDidMount = () => {
    this.masterGainNode = null;
    this.masterLimiterNode = null;
    this.wavePicker = this.refs.waveformSelect
    this.volumeControl = this.refs.masterGain
    this.noteFreq = null;
    this.defaultPatch = {
      id: null,
      name: 'Default',
      selected_waveform: 'square',
      master_gain: 0.5,
      current_octave: 4,
      oscillator_gain_node_value: 0.5,
      filter_frequency: 10000.0,
      filter_q: 1.0,
      filter_type: 'lowpass',
      gain_envelope_attack_time: 0.2,
      gain_envelope_decay_time: 0.25,
      gain_envelope_sustain_level: 0.8,
      gain_envelope_release_time: 0.5,
      gain_envelope_gate_time: Infinity,
      gain_envelope_release_curve: "exp",
      adsr_filter_frequency: 10000.0,
      adsr_filter_q: 1.0,
      adsr_filter_type: 'lowpass',
      filter_envelope_attack_time: 0.2,
      filter_envelope_decay_time: 0.25,
      filter_envelope_sustain_level: 0.8,
      filter_envelope_peak_level: 10000.0,
      filter_envelope_release_time: 0.5,
      filter_envelope_gate_time: Infinity,
      filter_envelope_release_curve: "exp"
    }

    //initial fetch for patches from the backend
    this.props.fetchAllPatches()

    //keyboard keys => musical notes & controls
    this.controlsArray = ['219', '220', '221']
    this.noteKeyboardAssociations = {
      '90': 'C',  //Z
      '83': 'C#', //S
      '88': 'D',  //X
      '68': 'D#', //D
      '67': 'E',  //C
      '86': 'F',  //V
      '71': 'F#', //G
      '66': 'G',  //B
      '72': 'G#', //H
      '78': 'A',  //N
      '74': 'A#', //J
      '77': 'B',  //M
    }
    this.noteKeyboardAssociations2ndOctave = {
      '81': 'C',  //Q
      '50': 'C#', //2
      '87': 'D',  //W
      '51': 'D#', //3
      '69': 'E',  //E
      '82': 'F',  //R
      '53': 'F#', //5
      '84': 'G',  //T
      '54': 'G#', //6
      '89': 'A',  //Y
      '55': 'A#', //7
      '85': 'B',  //U
    }

    //musical notes => frequencies
    this.noteFreq = this.createNoteTable();

    //event listeners for musical keyboard & controls
    window.addEventListener("keydown", this.keyPressed.bind(this), false)
    window.addEventListener("keyup", this.keyReleased.bind(this), false)

    // create master gain, limiter, and analyser nodes
    this.masterGainNode = this.audioContext.createGain();
    this.masterGainNode.gain.value = this.volumeControl.value;
    this.masterLimiterNode = this.audioContext.createDynamicsCompressor();
    this.masterLimiterNode.threshold.value = -3
    this.masterLimiterNode.knee.value = 0
    this.masterLimiterNode.ratio.value = 20
    this.masterLimiterNode.attack.value = 0
    this.masterLimiterNode.release.value = 0.1

    // connect master gain, limiter, and analyser nodes
    this.masterGainNode.connect(this.masterLimiterNode);
    this.masterLimiterNode.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps);

    //send signal to all users in room to prompt gathering user data
    if(nextProps.allCurrentUsers[nextProps.username] && !nextProps.allCurrentUsers[nextProps.username].signalProcessing.oscillatorGainNode){
      fetch(`http://192.168.4.168:3000/synthrooms/${this.props.currentSynthroom.id}/retrieve_user_data`, {
        method: "POST"
      })
    }

    // link the masterGain Slider value to currentPatchSettings
    this.refs.masterGain.value = nextProps.allCurrentUsers[this.props.username].currentPatchSettings.masterGain

    // link the masterGain Node value to currentPatchSettings
    this.masterGainNode.gain.value = nextProps.allCurrentUsers[this.props.username].currentPatchSettings.masterGain
  }

  keyPressed = (event) => {
    let key = (event.detail || event.which).toString()

    if (this.controlsArray.includes(key)) { //if key is [ or ] or \
      switch (key) {
        case '219': // currentOctave down
          if (this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave > 0) {
            let newOctave = this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave -= 1
            console.log(newOctave);
            this.sendPatchUpdate(this.props.username, 'currentOctave', newOctave)
          }
          break;
        case '221': // currentOctave up
          if (this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave < 7) {
            let newOctave = this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave += 1
            console.log(newOctave);
            this.sendPatchUpdate(this.props.username, 'currentOctave', newOctave)
          }
          break;
        case '220':
          //toggle chord mode
          break;
        default:
          console.log('Hit default case in controls array switch.');
          break;
      }
    } else if (Object.keys(this.noteKeyboardAssociations).includes(key)) { // if key is a note - octave 1
      let note = this.noteKeyboardAssociations[key]
      let frequency = this.noteFreq[this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave][note]
      if (!this.props.activeOscillators[this.props.username] || !this.props.activeOscillators[this.props.username][key]) { //if this note isnt playing, play it
        this.handleSendNotes(key, frequency)
      }
      // else if (this.props.activeOscillators[this.props.username][key]) { // if this oscillator is active then force stop and then play
      //   this.forceRemoveNotes(key)
      //   //then
      //   if (!this.props.activeOscillators[this.props.username] || !this.props.activeOscillators[this.props.username][key]) { //if this note isnt playing, play it
      //     this.handleSendNotes(key, frequency)
      //   }
      // }
    } else if (Object.keys(this.noteKeyboardAssociations2ndOctave).includes(key)) { // if key is a note - octave 2
      let note = this.noteKeyboardAssociations2ndOctave[key]
      let frequency = this.noteFreq[this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave + 1][note]
      if (!this.props.activeOscillators[this.props.username] || !this.props.activeOscillators[this.props.username][key]) { //if this note isnt playing, play it
        this.handleSendNotes(key, frequency)
      }
      // else if (this.props.activeOscillators[this.props.username][key]) { // if this oscillator is active then force stop and then play
      //   this.forceRemoveNotes(key)
      //   //then
      //   if (!this.props.activeOscillators[this.props.username] || !this.props.activeOscillators[this.props.username][key]) { //if this note isnt playing, play it
      //     this.handleSendNotes(key, frequency)
      //   }
      // }
    }
  }

  keyReleased = (event) => {
    console.log(this.props);
    let key = (event.detail || event.which).toString()

    if (Object.keys(this.noteKeyboardAssociations).includes(key)) { // if key is a note - octave 1
      this.handleRemoveNotes(key)
    } else if (Object.keys(this.noteKeyboardAssociations2ndOctave).includes(key)) { // if key is a note - octave 2
      this.handleRemoveNotes(key)
    }
  }

  listPatches = () => {
    return this.props.allPatches.map((patch) => {
      return (<option value={patch.id} key={patch.id} id={patch.id}>{patch.name}</option>)
    })
  }

  savePatch = () => {
    if (this.props.allCurrentUsers[this.props.username].currentPatchSettings.id !== null) {
      fetch(`http://192.168.4.168:3000/patches/${this.props.allCurrentUsers[this.props.username].currentPatchSettings.id}`, {
				method: "PATCH",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.props.allCurrentUsers[this.props.username].currentPatchSettings)
			})
			.then(res => res.json())
      .then(() => this.props.fetchAllPatches())
    }
  }

  displayMessages = () => {
    return this.props.currentSynthroom.messages.map((message) => {
      return (<p>{message.username}: {message.content}</p>)
    })
  }

  handleSocketResponse = (data) => {
    console.log("data from handleSocketResponse", data)
    switch (data.type) {
      //add cases here for keys being held or notes & shit (maybe get other users' patch state for different sounds?)
      case 'RETRIEVE_USER_DATA':
        //collect all other current user's name and patch state, & create their signal processing
        console.log('ABOUT TO RETRIEVE_USER_DATA');
        fetch(`http://192.168.4.168:3000/synthrooms/${this.props.currentSynthroom.id}/add_user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.props.username,
            currentPatchSettings: this.props.allCurrentUsers[this.props.username].currentPatchSettings
          })
        })
        break;
      case 'ADD_USER':
        // create signal processing for this user here
        console.log('ADDING USER');
        //create oscillatorGainNode
        let oscillatorGainNode = this.audioContext.createGain();
        oscillatorGainNode.gain.value = data.payload.currentPatchSettings.oscillatorGainNodeValue

        //create filterNode
        let filterNode = this.audioContext.createBiquadFilter();
        filterNode.frequency.value = data.payload.currentPatchSettings.filterFrequency
        filterNode.Q.value = data.payload.currentPatchSettings.filterQ
        filterNode.type = data.payload.currentPatchSettings.filterType

        //create gainEnvelope
        let gainEnvelope = new ADSREnvelope()
        gainEnvelope.attackTime = data.payload.currentPatchSettings.gainEnvelopeAttackTime
        gainEnvelope.decayTime = data.payload.currentPatchSettings.gainEnvelopeDecayTime
        gainEnvelope.sustainLevel = data.payload.currentPatchSettings.gainEnvelopeSustainLevel
        gainEnvelope.releaseTime = data.payload.currentPatchSettings.gainEnvelopeReleaseTime
        gainEnvelope.gateTime = data.payload.currentPatchSettings.gainEnvelopeGateTime
        gainEnvelope.releaseCurve = data.payload.currentPatchSettings.gainEnvelopeReleaseCurve

        //create filterEnvelope
        let filterEnvelope = new ADSREnvelope()
        filterEnvelope.attackTime = data.payload.currentPatchSettings.filterEnvelopeAttackTime
        filterEnvelope.decayTime = data.payload.currentPatchSettings.filterEnvelopeDecayTime
        filterEnvelope.sustainLevel = data.payload.currentPatchSettings.filterEnvelopeSustainLevel
        filterEnvelope.peakLevel = data.payload.currentPatchSettings.filterEnvelopePeakLevel
        filterEnvelope.releaseTime = data.payload.currentPatchSettings.filterEnvelopeReleaseTime
        filterEnvelope.gateTime = data.payload.currentPatchSettings.filterEnvelopeGateTime
        filterEnvelope.releaseCurve = data.payload.currentPatchSettings.filterEnvelopeReleaseCurve

        //connect signal processing Nodes
        oscillatorGainNode.connect(filterNode);
        filterNode.connect(this.masterGainNode);

        let newUser = {
          currentPatchSettings: data.payload.currentPatchSettings,
          signalProcessing: {
            oscillatorGainNode: oscillatorGainNode,
            filterNode: filterNode,
            gainEnvelope: gainEnvelope,
            filterEnvelope: filterEnvelope
          }
        }
        this.props.addUser(data.payload.username, newUser) // add signal processing to addNewUser here
        break;
      case 'REMOVE_USER':
        // -turn off & delete all oscillators for this user
        let removedUserOscillators = this.props.activeOscillators[data.payload]
        for (var note in removedUserOscillators) {
          removedUserOscillators[note].stop()
        }
        // remove:
        //  -username object in activeOscillators
        //  -signal processing for user (in state)
        this.props.removeUser(data.payload)
        break;
      case 'UPDATE_PATCH':
        // switch statement here for setting signalProcessing values:
        switch (data.payload.synthParameter){
          case 'oscillatorGainNodeValue':
            this.props.allCurrentUsers[data.payload.username].signalProcessing.oscillatorGainNode.gain.value = data.payload.value
            break;
          case 'filterFrequency':
            this.props.allCurrentUsers[data.payload.username].signalProcessing.filterNode.frequency.value = data.payload.value
            break;
          case 'filterQ':
            this.props.allCurrentUsers[data.payload.username].signalProcessing.filterNode.Q.value = data.payload.value
            break;
          case 'filterType':
            this.props.allCurrentUsers[data.payload.username].signalProcessing.filterNode.type = data.payload.value
            break;
          case 'gainEnvelopeAttackTime':
            this.props.allCurrentUsers[data.payload.username].signalProcessing.gainEnvelope.attackTime = data.payload.value
            break;
          case 'gainEnvelopeDecayTime':
            this.props.allCurrentUsers[data.payload.username].signalProcessing.gainEnvelope.decayTime = data.payload.value
            break;
          case 'gainEnvelopeSustainLevel':
            this.props.allCurrentUsers[data.payload.username].signalProcessing.gainEnvelope.sustainLevel = data.payload.value
            break;
          case 'gainEnvelopeReleaseTime':
            this.props.allCurrentUsers[data.payload.username].signalProcessing.gainEnvelope.releaseTime = data.payload.value
            break;
          case 'adsrFilterFrequency':
            // this.props.allCurrentUsers[data.payload.username].signalProcessing.filterNode.frequency.value = data.payload.value
            break;
          case 'adsrFilterQ':
            // this.props.allCurrentUsers[data.payload.username].signalProcessing.filterNode.Q.value = data.payload.value
            break;
          case 'adsrFilterType':
            // this.props.allCurrentUsers[data.payload.username].signalProcessing.filterNode.type = data.payload.value
            break;
          case 'filterEnvelopeAttackTime':
            this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.attackTime = data.payload.value
            break;
          case 'filterEnvelopeDecayTime':
            this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.decayTime = data.payload.value
            break;
          case 'filterEnvelopeSustainLevel':
            this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.sustainLevel = data.payload.value
            break;
          case 'filterEnvelopePeakLevel':
            this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.peakLevel = data.payload.value
            break;
          case 'filterEnvelopeReleaseTime':
            this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.releaseTime = data.payload.value
            break;
          default:
            console.log('Hit default in UPDATE_PATCH switch')
            break;
        }
        this.props.updatePatch(data.payload.username, data.payload.synthParameter, data.payload.value)
        break;
      case 'LOAD_PATCH':
        // connect signal processing values here:
        //oscillatorGainNode:
        this.props.allCurrentUsers[data.payload.username].signalProcessing.oscillatorGainNode.gain.value = data.payload.oscillatorGainNodeValue
        //filter:
        this.props.allCurrentUsers[data.payload.username].signalProcessing.filterNode.frequency.value = data.payload.filterFrequency
        this.props.allCurrentUsers[data.payload.username].signalProcessing.filterNode.Q.value = data.payload.filterQ
        this.props.allCurrentUsers[data.payload.username].signalProcessing.filterNode.type = data.payload.filterType
        //gain Envelope:
        this.props.allCurrentUsers[data.payload.username].signalProcessing.gainEnvelope.attackTime = data.payload.gainEnvelopeAttackTime
        this.props.allCurrentUsers[data.payload.username].signalProcessing.gainEnvelope.decayTime = data.payload.gainEnvelopeDecayTime
        this.props.allCurrentUsers[data.payload.username].signalProcessing.gainEnvelope.sustainLevel = data.payload.gainEnvelopeSustainLevel
        this.props.allCurrentUsers[data.payload.username].signalProcessing.gainEnvelope.releaseTime = data.payload.gainEnvelopeReleaseTime
        //filter Envelope:
        this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.attackTime = data.payload.filterEnvelopeAttackTime
        this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.decayTime = data.payload.filterEnvelopeDecayTime
        this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.sustainLevel = data.payload.filterEnvelopeSustainLevel
        this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.peakLevel = data.payload.filterEnvelopePeakLevel
        this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.releaseTime = data.payload.filterEnvelopeReleaseTime

        this.props.loadPatch(data.payload.username, data.payload.patch)
        break;
      case 'ADD_SOCKET_OSCILLATOR':
        //get oscillator start time

        //create oscillator and save to state
        let osc = this.audioContext.createOscillator();
        osc.type = data.payload.waveform
        osc.frequency.value = data.payload.frequency;

        //create gain node for ADSR
        let adsrGainNode = this.audioContext.createGain();

        //create filter for envelopeFilter
        let adsrFilterNode = this.audioContext.createBiquadFilter();
        adsrFilterNode.frequency.value = this.props.allCurrentUsers[data.payload.username].currentPatchSettings.adsrFilterFrequency
        adsrFilterNode.Q.value = this.props.allCurrentUsers[data.payload.username].currentPatchSettings.adsrFilterQ
        adsrFilterNode.type = this.props.allCurrentUsers[data.payload.username].currentPatchSettings.adsrFilterType

        //apply envelope to gain
        this.props.allCurrentUsers[data.payload.username].signalProcessing.gainEnvelope.gateTime = Infinity

        //apply envelope to filter frequency
        this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.gateTime = Infinity
        this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.peakLevel = this.props.allCurrentUsers[data.payload.username].currentPatchSettings.filterEnvelopePeakLevel
        this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.sustainLevel = this.props.allCurrentUsers[data.payload.username].currentPatchSettings.filterEnvelopeSustainLevel

        //connect nodes
        osc.connect(adsrGainNode);
        adsrGainNode.connect(adsrFilterNode);
        adsrFilterNode.connect(this.props.allCurrentUsers[data.payload.username].signalProcessing.oscillatorGainNode);

        let startTime = this.audioContext.currentTime
        console.log('current time as start time', this.audioContext.currentTime);
        //save oscillator, gain, & filter to state - and oscillator start time
        this.props.addActiveOscillator(data.payload.key, osc, data.payload.username, adsrGainNode, adsrFilterNode, startTime)
        .then(() => {
          //start oscillator only if the key pressed exists in the activeOscillators
          if (this.props.activeOscillators[data.payload.username][data.payload.key]) {
            this.props.activeOscillators[data.payload.username][data.payload.key].oscillatorNode.start(startTime);
            this.props.allCurrentUsers[data.payload.username].signalProcessing.gainEnvelope.applyTo(adsrGainNode.gain, startTime)
            this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.applyTo(adsrFilterNode.frequency, startTime)
          }

        })
        break;
      case 'REMOVE_SOCKET_OSCILLATOR':
        let playbackTime = this.audioContext.currentTime
        if (this.props.activeOscillators[data.payload.username] && this.props.activeOscillators[data.payload.username][data.payload.key])
          this.props.activeOscillators[data.payload.username][data.payload.key].adsrFilterNode.frequency.cancelScheduledValues(this.props.activeOscillators[data.payload.username][data.payload.key].startTime)
          this.props.activeOscillators[data.payload.username][data.payload.key].adsrGainNode.gain.cancelScheduledValues(this.props.activeOscillators[data.payload.username][data.payload.key].startTime)
          this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.gateTime = playbackTime - this.props.activeOscillators[data.payload.username][data.payload.key].startTime
          this.props.allCurrentUsers[data.payload.username].signalProcessing.gainEnvelope.gateTime = playbackTime - this.props.activeOscillators[data.payload.username][data.payload.key].startTime
          this.props.allCurrentUsers[data.payload.username].signalProcessing.filterEnvelope.applyTo(this.props.activeOscillators[data.payload.username][data.payload.key].adsrFilterNode.frequency, this.props.activeOscillators[data.payload.username][data.payload.key].startTime)
          this.props.allCurrentUsers[data.payload.username].signalProcessing.gainEnvelope.applyTo(this.props.activeOscillators[data.payload.username][data.payload.key].adsrGainNode.gain, this.props.activeOscillators[data.payload.username][data.payload.key].startTime)
          this.props.activeOscillators[data.payload.username][data.payload.key].oscillatorNode.stop(this.props.activeOscillators[data.payload.username][data.payload.key].startTime + this.props.allCurrentUsers[data.payload.username].signalProcessing.gainEnvelope.duration)
          //need to wait for stop() to finish before removing the oscillator
          this.props.removeActiveOscillator(data.payload.key, data.payload.username)
        break;
      case 'FORCE_REMOVE_SOCKET_OSCILLATOR':
        if (this.props.activeOscillators[data.payload.username][data.payload.key])
          this.props.activeOscillators[data.payload.username][data.payload.key].oscillatorNode.stop()
          this.props.activeOscillators[data.payload.username][data.payload.key].oscillatorNode.disconnect()
          this.props.removeActiveOscillator(data.payload.key, data.payload.username)
        break;
      case 'ADD_MESSAGE':
        this.props.addNewMessage(data.payload)
        break;
      default:
        console.log(data)
        break;
    }
  }

  handleSendMessage = (messageInput) => {
    //send message to back end here
    fetch(`http://192.168.4.168:3000/synthrooms/${this.props.currentSynthroom.id}/add_message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({content: messageInput, username: this.props.username})
    })
    //then add logic to handleSocketResponse
    this.setState({
      messageInput: ''
    })
  }

  handleSendNotes = (key, frequency) => {
    fetch(`http://192.168.4.168:3000/synthrooms/${this.props.currentSynthroom.id}/send_notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key: key,
        frequency: frequency,
        waveform: this.props.allCurrentUsers[this.props.username].currentPatchSettings.selectedWaveform,
        username: this.props.username
      })
    })
  }

  handleRemoveNotes = (key) => {
    fetch(`http://192.168.4.168:3000/synthrooms/${this.props.currentSynthroom.id}/remove_notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key: key,
        username: this.props.username
      })
    })
  }

  forceRemoveNotes = (key) => {
    fetch(`http://192.168.4.168:3000/synthrooms/${this.props.currentSynthroom.id}/force_remove_notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key: key,
        username: this.props.username
      })
    })
  }

  sendPatchUpdate = (username, synthParameter, value) => {
    fetch(`http://192.168.4.168:3000/synthrooms/${this.props.currentSynthroom.id}/update_patch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        synthParameter: synthParameter,
        value: value
      })
    })
  }

  handlePatchLoad = (patch) => {
    fetch(`http://192.168.4.168:3000/synthrooms/${this.props.currentSynthroom.id}/load_patch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.props.username,
        patch: patch
      })
    })
  }

  render() {
    console.log('props in synthroom',this.props);
    return (
      <div className="Synthroom">
        <ActionCable
          channel={{channel: 'SynthroomChannel', synthroom_id: this.props.currentSynthroom.id, username: this.props.username}}
          onReceived={this.handleSocketResponse}
        />
        <header className="Synthroom-header">
          {/* <img src={logo} className="Synthroom-logo" alt="logo" /> */}
          <h1 className="Synthroom-title">Sympathizer</h1>
          <div className="master-gain-container">
            <span>Master Volume: </span>
            <input id="masterGain" type="range" min="0.0" max="1.0" step="0.01"
                defaultValue="0.5" list="volumes" name="volume" ref="masterGain"
              onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/>
            {/* <datalist id="volumes">
              <option value="0.0" label="Mute"/>
              <option value="1.0" label="100%"/>
            </datalist> */}
          </div>
        </header>
        <div className="room-info">
          {/* <p>Chord Mode: Soon™</p> */}
          <span>Current Room: {this.props.currentSynthroom.name}</span>
          <span>Username: {this.props.username}</span>
        </div>
        <div className="patch-crud">
          <div className="select-save-delete">
            <span>Patches: </span>
            <select name="patches" id="patchSelect" defaultValue="Default" onChange={(event) => {
              let selectedPatch
              if (event.target[event.target.selectedIndex].value !== "Default") {
                selectedPatch = this.props.allPatches.find((patch) => patch.id === parseInt(event.target[event.target.selectedIndex].value, 10))
                console.log(selectedPatch);
              } else {
                selectedPatch = this.defaultPatch
              }
              this.handlePatchLoad(selectedPatch)
            }}>
              <option value="Default">Default</option>
              {this.listPatches()}
            </select>
            <button id="saveButton" onClick={this.savePatch}>Save Patch</button>
            <button id="deleteButton" onClick={() => {
              if (this.props.allCurrentUsers[this.props.username].currentPatchSettings.id !== null) {
                this.props.deletePatch(this.props.allCurrentUsers[this.props.username].currentPatchSettings.id)
                setTimeout(() => this.props.fetchAllPatches(), 100)
              }
            }}>Delete</button>
          </div>
          <div className="save-as-new">
            <button id="saveAsNewButton" onClick={() => {
              this.props.createNewPatch(this.props.username, this.props.allCurrentUsers[this.props.username].currentPatchSettings)
              .then(() => this.props.fetchAllPatches())
            }}>Save As New</button>
            <input id="name" type="text" value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.name} onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/>
          </div>
        </div>
        <div className="oscillator">
          <div className="waveform-select-container">
            <span>Waveform: </span>
            <select name="waveform" value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.selectedWaveform} ref="waveformSelect" id="selectedWaveform" onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}>
              <option value="sine">Sine</option>
              <option value="square" selected>Square</option>
              <option value="sawtooth">Sawtooth</option>
              <option value="triangle">Triangle</option>
            </select>
          </div>
          <span>Current Octave: {this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave}</span><br/>
          <span>Oscillator Gain: </span>
          <input id="oscillatorGainNodeValue" type="range" min="0.0" max="1.0" step="0.01"
              value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.oscillatorGainNodeValue} list="volumes" name="volume" ref="oscillatorGainNodeValue"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/>
        </div>
        <div className='gain-envelope'>
          <span>Gain Envelope: </span><br/>
          <span>Attack: </span>
          <input id="gainEnvelopeAttackTime" type="range" min="0.01" max="10.0" step="0.01"
              value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.gainEnvelopeAttackTime} list="attackTimes" name="attackTime" ref="gainEnvelopeAttackTime"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/>
          <span>Decay: </span>
          <input id="gainEnvelopeDecayTime" type="range" min="0.01" max="10.0" step="0.01"
              value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.gainEnvelopeDecayTime} list="decayTimes" name="decayTime" ref="gainEnvelopeDecayTime"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/>
          <span>Sustain: </span>
          <input id="gainEnvelopeSustainLevel" type="range" min="0.01" max="1.0" step="0.01"
              value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.gainEnvelopeSustainLevel} list="sustainLevels" name="sustainLevel" ref="gainEnvelopeSustainLevel"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/>
          <span>Release: </span>
          <input id="gainEnvelopeReleaseTime" type="range" min="0.01" max="10.0" step="0.01"
              value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.gainEnvelopeReleaseTime} list="releaseTimes" name="releaseTime" ref="gainEnvelopeReleaseTime"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/>
        </div>
        <div className="filter">
          <span>Filter: </span><br/>
          <span>Type: </span>
          <select name="adsrFilterType" id="adsrFilterType" value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.adsrFilterType} ref="adsrFilterType" id="adsrFilterType" onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}>
            <option value="lowpass">Lowpass</option>
            <option value="highpass" selected>Highpass</option>
            <option value="bandpass">Bandpass</option>
          </select><br/>
          <span>Peak: </span>
          <input id="filterEnvelopePeakLevel" type="range" min="0.01" max="20000.0" step="0.01"
              value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.filterEnvelopePeakLevel} list="peakLevels" name="peakLevel" ref="filterEnvelopePeakLevel"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/>
          {/* <span>Frequency: </span>
          <input id="adsrFilterFrequency" type="range" min="10.0" max="20000.0" step="0.01"
              value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.adsrFilterFrequency} list="frequencies" name="frequency" ref="adsrFilterFrequency"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/> */}
          <span>Q: </span>
          <input id="adsrFilterQ" type="range" min="0.01" max="50.0" step="0.01"
              value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.adsrFilterQ} list="Qs" name="Q" ref="adsrFilterQ"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/>
        </div>
        <div className='filter-envelope'>
          <span>Filter Envelope: </span><br/>
          <span>Attack: </span>
          <input id="filterEnvelopeAttackTime" type="range" min="0.01" max="10.0" step="0.01"
              value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.filterEnvelopeAttackTime} list="attackTimes" name="attackTime" ref="filterEnvelopeAttackTime"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/>
          <span>Decay: </span>
          <input id="filterEnvelopeDecayTime" type="range" min="0.01" max="10.0" step="0.01"
              value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.filterEnvelopeDecayTime} list="decayTimes" name="decayTime" ref="filterEnvelopeDecayTime"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/>
          <span>Sustain: </span>
          <input id="filterEnvelopeSustainLevel" type="range" min="0.01" max="1.0" step="0.01"
              value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.filterEnvelopeSustainLevel} list="sustainLevels" name="sustainLevel" ref="filterEnvelopeSustainLevel"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/>
          <span>Release: </span>
          <input id="filterEnvelopeReleaseTime" type="range" min="0.01" max="10.0" step="0.01"
              value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.filterEnvelopeReleaseTime} list="releaseTimes" name="releaseTime" ref="filterEnvelopeReleaseTime"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/>
        </div>
        {/* <div className="secondary-filter">
          <span>Secondary Filter: </span><br/>
          <span>Type: </span>
          <select name="filterType" id="filterType" value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.filterType} ref="filterType" id="filterType" onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}>
            <option value="lowpass">Lowpass</option>
            <option value="highpass" selected>Highpass</option>
            <option value="bandpass">Bandpass</option>
          </select><br/>
          <span>Frequency: </span>
          <input id="filterFrequency" type="range" min="10.0" max="20000.0" step="0.01"
              value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.filterFrequency} list="frequencies" name="frequency" ref="filterFrequency"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/>
          <span>Q: </span>
          <input id="filterQ" type="range" min="0.01" max="50.0" step="0.01"
              value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.filterQ} list="Qs" name="Q" ref="filterQ"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/>
        </div> */}

        <div className="chat">
          <span>---------------</span><br/>
          {this.displayMessages()}
          {/* form for new messages */}
          <input type="text" placeholder="enter a message..." value={this.state.messageInput} onChange={(event) => this.setState({messageInput: event.target.value})}/>
          <button onClick={() => {this.handleSendMessage(this.state.messageInput)}}>Send</button>
        </div>
        {/* <img src={topKeyboard} alt="" className="keyboard_graphic"/> */}
        {/* <img src={bottomKeyboard} alt="" className="keyboard_graphic"/> */}
        <Spectral analyser={this.analyser}/>
        <div className="end-tab"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {...state}
}

export default connect(mapStateToProps, { fetchAllPatches, loadPatch, updatePatch, createNewPatch, deletePatch, addActiveOscillator, removeActiveOscillator, addNewMessage, addUser, removeUser })(Synthroom)
