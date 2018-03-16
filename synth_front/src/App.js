import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchAllPatches,
        loadPatch,
        updatePatch,
        createNewPatch,
        deletePatch,
        addActiveOscillator,
        removeActiveOscillator
       } from './actions'
import logo from './scull4.png';
import topKeyboard from './top_keyboard.svg'
import bottomKeyboard from './bottom_keyboard.svg'
import './App.css';

class App extends Component {

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
    //initial variables
    this.AudioContext = window.AudioContext || window.webkitAudioContext
    this.audioContext = new this.AudioContext()
    this.masterGainNode = null;
    this.wavePicker = this.refs.waveformSelect
    this.volumeControl = this.refs.masterGain
    this.noteFreq = null;

    //initial fetch for patches from the backend
    this.props.fetchAllPatches()

    //keyboard keys => musical notes
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

    // create and connect the master gain node
    this.masterGainNode = this.audioContext.createGain();
    this.masterGainNode.connect(this.audioContext.destination);
    this.masterGainNode.gain.value = this.volumeControl.value;
  }


  //FIXME - this is where the master gain slider is mapped to the state
  // componentWillReceiveProps = (nextProps) => {
  //   //does this turn into a massive switch statement for each parameter?
  //   this.masterGainNode.gain.value = nextProps.currentPatchSettings.masterGain
  // }

  keyPressed = (event) => {
    let key = (event.detail || event.which).toString()

    if (this.controlsArray.includes(key)) { //if key is [ or ] or \
      switch (key) {
        case '219':
          if (this.props.currentPatchSettings.currentOctave > 0) {
            let newOctave = this.props.currentPatchSettings.currentOctave -= 1
            this.props.updatePatch('currentOctave', newOctave)
          }
          break;
        case '221':
          if (this.props.currentPatchSettings.currentOctave < 7) {
            let newOctave = this.props.currentPatchSettings.currentOctave += 1
            this.props.updatePatch('currentOctave', newOctave)
          }
          break;
        case '220':
          //toggle chord mode
          break;
      }
    } else if (Object.keys(this.noteKeyboardAssociations).includes(key)) { // if key is a note - octave 1
      let note = this.noteKeyboardAssociations[key]
      let frequency = this.noteFreq[this.props.currentPatchSettings.currentOctave][note]
      if (!this.props.activeOscillators[frequency]) { //if this note isnt playing, play it
        this.props.addActiveOscillator(frequency, this.playNote(frequency))
      }
    } else if (Object.keys(this.noteKeyboardAssociations2ndOctave).includes(key)) { // if key is a note - octave 2
      let note = this.noteKeyboardAssociations2ndOctave[key]
      let frequency = this.noteFreq[this.props.currentPatchSettings.currentOctave + 1][note]
      if (!this.props.activeOscillators[frequency]) { //if this note isnt playing, play it
        this.props.addActiveOscillator(frequency, this.playNote(frequency))
      }
    }
  }

  keyReleased = (event) => {
    let key = (event.detail || event.which).toString()

    if (this.controlsArray.includes(key)) {
      //if key is [ or ] or \
    } else if (Object.keys(this.noteKeyboardAssociations).includes(key)) { // if key is a note - octave 1
      let note = this.noteKeyboardAssociations[key]
      let frequency = this.noteFreq[this.props.currentPatchSettings.currentOctave][note]
      if (this.props.activeOscillators[frequency]) { //if this note is playing, stop it
        //also remove from activeOscillators array
        this.props.activeOscillators[frequency].stop()
        this.props.removeActiveOscillator(frequency)
      }
    } else if (Object.keys(this.noteKeyboardAssociations2ndOctave).includes(key)) { // if key is a note - octave 2
      let note = this.noteKeyboardAssociations2ndOctave[key]
      let frequency = this.noteFreq[this.props.currentPatchSettings.currentOctave + 1][note]
      if (this.props.activeOscillators[frequency]) { //if this note is playing, stop it
        //also remove from activeOscillators array
        this.props.activeOscillators[frequency].stop()
        this.props.removeActiveOscillator(frequency)
      }
    }
  }

  playNote = (freq) => {
    let osc = this.audioContext.createOscillator();
    osc.connect(this.masterGainNode);
    osc.type = this.props.currentPatchSettings.selectedWaveform
    osc.frequency.value = freq;
    osc.start();
    return osc;
  }

  listPatches = () => {
    return this.props.allPatches.map((patch) => {
      return (<option value={patch.id} key={patch.id} id={patch.id}>{patch.name}</option>)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">WELCOME TO HELL!</h1>
        </header>
        <div className="patch-controls">
          <span>Patches: </span>
          <select name="patches" id="patchSelect" defaultValue="Default Patch" onChange={(event) => {
            let selectedPatch = this.props.allPatches.find((patch) => patch.id === parseInt(event.target[event.target.selectedIndex].value))
            this.props.loadPatch(selectedPatch)
          }}>
            <option value="Default Patch">Default</option>
            {this.listPatches()}
          </select>
        </div>
        <div className="master-gain-container">
          <span>Volume: </span>
          <input id="masterGain" type="range" min="0.0" max="1.0" step="0.01"
              defaultValue="0.5" list="volumes" name="volume" ref="masterGain"
            onChange={(event) => this.props.updatePatch(event.target.id, event.target.value)}/>
          <datalist id="volumes">
            <option value="0.0" label="Mute"/>
            <option value="1.0" label="100%"/>
          </datalist>
        </div>
        <div className="waveform-select-container">
          <span>Waveform: </span>
          <select name="waveform" ref="waveformSelect" id="selectedWaveform" onChange={(event) => this.props.updatePatch(event.target.id, event.target.value)}>
            <option value="sine">Sine</option>
            <option value="square" selected>Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>
        {/* <img src={topKeyboard} alt="" className="keyboard_graphic"/> */}
        {/* <img src={bottomKeyboard} alt="" className="keyboard_graphic"/> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {...state}
}

export default connect(mapStateToProps, { fetchAllPatches, loadPatch, updatePatch, createNewPatch, deletePatch, addActiveOscillator, removeActiveOscillator })(App)
