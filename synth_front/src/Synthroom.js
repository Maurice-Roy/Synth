import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchAllPatches, loadPatch, updatePatch, createNewPatch, deletePatch, addActiveOscillator, removeActiveOscillator, addNewMessage, addUser, removeUser } from './actions'
import { ActionCable } from 'react-actioncable-provider'
import logo from './scull4.png';
import topKeyboard from './top_keyboard.svg'
import bottomKeyboard from './bottom_keyboard.svg'
import './Synthroom.css';

class Synthroom extends Component {

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
    //initial variables
    this.AudioContext = window.AudioContext || window.webkitAudioContext
    this.audioContext = new this.AudioContext()
    this.masterGainNode = null;
    this.wavePicker = this.refs.waveformSelect
    this.volumeControl = this.refs.masterGain
    this.noteFreq = null;
    this.defaultPatch = {
      id: null,
      name: 'Default',
      selected_waveform: 'square',
      master_gain: 0.5,
      current_octave: 4,
      oscillator_gain_node_value: 0.5
    }

    //initial fetch for patches from the backend
    this.props.fetchAllPatches()

    //send signal to all users in room to prompt gathering user data
    console.log('ABOUT TO SEND INITIAL FETCH FOR USERS');


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

    // create and connect the master gain node
    this.masterGainNode = this.audioContext.createGain();
    this.masterGainNode.connect(this.audioContext.destination);
    this.masterGainNode.gain.value = this.volumeControl.value;
  }

  //FIXME - this is where the master gain slider is mapped to the state
  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps);
    //does this turn into a massive switch statement for each parameter?
    this.refs.masterGain.value = nextProps.allCurrentUsers[this.props.username].currentPatchSettings.masterGain
    // this.refs.waveformSelect.value = nextProps.allCurrentUsers[this.props.username].currentPatchSettings.selectedWaveform

    this.masterGainNode.gain.value = nextProps.allCurrentUsers[this.props.username].currentPatchSettings.masterGain

    if(nextProps.allCurrentUsers[nextProps.username] && !nextProps.allCurrentUsers[nextProps.username].signalProcessing.oscillatorGainNode){
      fetch(`http://192.168.4.168:3000/synthrooms/${this.props.currentSynthroom.id}/retrieve_user_data`, {
        method: "POST"
      })
    }
  }

  keyPressed = (event) => {
    let key = (event.detail || event.which).toString()

    if (this.controlsArray.includes(key)) { //if key is [ or ] or \
      switch (key) {
        case '219':
          if (this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave > 0) {
            let newOctave = this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave -= 1
            console.log(newOctave);
            this.sendPatchUpdate(this.props.username, 'currentOctave', newOctave)
          }
          break;
        case '221':
          if (this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave < 7) {
            let newOctave = this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave += 1
            console.log(newOctave);
            this.sendPatchUpdate(this.props.username, 'currentOctave', newOctave)
          }
          break;
        case '220':
          //toggle chord mode
          break;
      }
    } else if (Object.keys(this.noteKeyboardAssociations).includes(key)) { // if key is a note - octave 1
      let note = this.noteKeyboardAssociations[key]
      let frequency = this.noteFreq[this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave][note]
      if (!this.props.activeOscillators[this.props.username] || !this.props.activeOscillators[this.props.username][key]) { //if this note isnt playing, play it
        // this.props.addActiveOscillator(key, this.playNote(frequency), this.props.username)
        this.handleSendNotes(key, frequency)
      }
    } else if (Object.keys(this.noteKeyboardAssociations2ndOctave).includes(key)) { // if key is a note - octave 2
      let note = this.noteKeyboardAssociations2ndOctave[key]
      let frequency = this.noteFreq[this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave + 1][note]
      if (!this.props.activeOscillators[this.props.username] || !this.props.activeOscillators[this.props.username][key]) { //if this note isnt playing, play it
        // this.props.addActiveOscillator(key, this.playNote(frequency), this.props.username)
        this.handleSendNotes(key, frequency)
      }
    }
  }

  keyReleased = (event) => {
    console.log(this.props);
    let key = (event.detail || event.which).toString()

    if (this.controlsArray.includes(key)) {
      //if key is [ or ] or \
    } else if (Object.keys(this.noteKeyboardAssociations).includes(key)) { // if key is a note - octave 1
      let note = this.noteKeyboardAssociations[key]
      let frequency = this.noteFreq[this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave][note]
      this.handleRemoveNotes(key)
    } else if (Object.keys(this.noteKeyboardAssociations2ndOctave).includes(key)) { // if key is a note - octave 2
      let note = this.noteKeyboardAssociations2ndOctave[key]
      let frequency = this.noteFreq[this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave + 1][note]
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
        let oscillatorGainNode = this.audioContext.createGain();
        oscillatorGainNode.value = data.payload.currentPatchSettings.oscillatorGainNodeValue
        oscillatorGainNode.connect(this.masterGainNode);
        console.log(oscillatorGainNode);

        let newUser = {
          currentPatchSettings: data.payload.currentPatchSettings,
          signalProcessing: {
            oscillatorGainNode: oscillatorGainNode
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
        // massive switch statement here for setting signalProcessing values:
        switch (data.payload.synthParameter){
          case 'oscillatorGainNodeValue':
            console.log('UPDATING oscillatorGainNode')
            this.props.allCurrentUsers[data.payload.username].signalProcessing.oscillatorGainNode.gain.value = data.payload.value
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

        //ASDR:


        this.props.loadPatch(data.payload.username, data.payload.patch)
        break;
      case 'ADD_SOCKET_OSCILLATOR':
        //create oscillator and save to state
        let osc = this.audioContext.createOscillator();
        console.log('osc:', osc);
        console.log('allCurrentUsers:', this.props.allCurrentUsers);
        console.log('oscGain:', this.props.allCurrentUsers[data.payload.username].signalProcessing.oscillatorGainNode);
        osc.connect(this.props.allCurrentUsers[data.payload.username].signalProcessing.oscillatorGainNode);
        osc.type = data.payload.waveform
        osc.frequency.value = data.payload.frequency;
        osc.start();
        this.props.addActiveOscillator(data.payload.key, osc, data.payload.username)
        break;
      case 'REMOVE_SOCKET_OSCILLATOR':
        if (this.props.activeOscillators[data.payload.username] && this.props.activeOscillators[data.payload.username][data.payload.key])
          this.props.activeOscillators[data.payload.username][data.payload.key].stop()
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
          <img src={logo} className="Synthroom-logo" alt="logo" />
          <h1 className="Synthroom-title">WELCOME TO HELL!</h1>
        </header>
        <div className="patch-crud">
          <div className="select-save-delete">
            <span>Patches: </span>
            <select name="patches" id="patchSelect" defaultValue="Default" onChange={(event) => {
              let selectedPatch
              if (event.target[event.target.selectedIndex].value !== "Default") {
                selectedPatch = this.props.allPatches.find((patch) => patch.id === parseInt(event.target[event.target.selectedIndex].value))
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
        <div className="waveform-select-container">
          <span>Waveform: </span>
          <select name="waveform" value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.selectedWaveform} ref="waveformSelect" id="selectedWaveform" onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}>
            <option value="sine">Sine</option>
            <option value="square" selected>Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>
        <div className="patch-settings">
          <span>Oscillator Gain: </span>
          <input id="oscillatorGainNodeValue" type="range" min="0.0" max="1.0" step="0.01"
              defaultValue="0.5" value={this.props.allCurrentUsers[this.props.username].currentPatchSettings.oscillatorGainNodeValue} list="volumes" name="volume" ref="oscillatorGainNodeValue"
            onChange={(event) => this.sendPatchUpdate(this.props.username, event.target.id, event.target.value)}/><br/>
          <span>Current Octave: {this.props.allCurrentUsers[this.props.username].currentPatchSettings.currentOctave}</span>
        </div>
        <div className="synthroom-info">
          <p>Chord Mode: Soon™</p>
          <p>Current Room: {this.props.currentSynthroom.name}</p>
          <p>Username: {this.props.username}</p>
        </div>
        <div id="chat">
          <span>---------------</span><br/>
          {this.displayMessages()}
          {/* form for new messages */}
          <input type="text" placeholder="enter a message..." value={this.state.messageInput} onChange={(event) => this.setState({messageInput: event.target.value})}/>
          <button onClick={() => {this.handleSendMessage(this.state.messageInput)}}>Send</button>
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

export default connect(mapStateToProps, { fetchAllPatches, loadPatch, updatePatch, createNewPatch, deletePatch, addActiveOscillator, removeActiveOscillator, addNewMessage, addUser, removeUser })(Synthroom)
