import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchAllSynthrooms, createNewSynthroom, setUsername } from './actions'
import { ActionCable } from 'react-actioncable-provider'
import SynthroomContainer from './SynthroomContainer'
import { Route, Switch, withRouter } from 'react-router-dom'

import DummyComponent from './DummyComponent'

class App extends Component {

  state = {
    newSynthroomInput: null,
    usernameInput: null
  }

  componentDidMount = () => {
    this.props.fetchAllSynthrooms()
  }

  listSynthrooms = () => {
    return this.props.allSynthrooms.map((synthroom) => {
      return (<option value={synthroom.id} key={synthroom.id} id={synthroom.id}>{synthroom.name}</option>)
    })
  }

  handleSelect = (event) => {
    this.props.history.push(`/synthrooms/${event.target.value}`)
  }

  handleCreate = () => {
    this.props.createNewSynthroom(this.state.newSynthroomInput)
    .then((synthroom) => this.props.history.push(`/synthrooms/${synthroom.id}`) )
  }

  handleSetUsername = () => {
    this.props.setUsername(this.state.usernameInput)
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={(routerProps) => {
          //create a component for this select
          return(
            <div>
              <input type="text" placeholder="enter username..." value={this.state.usernameInput} onChange={(event) => this.setState({usernameInput: event.target.value})}/>
              <button onClick={this.handleSetUsername}>Set Username</button>
              <br/>
              <select name="roomSelect" id="roomSelect" onChange={this.handleSelect}>
                <option disabled selected value>select existing room</option>
                {this.listSynthrooms()}
              </select>
              <span> or </span>
              <input type="text" placeholder="enter new room name..." value={this.state.newSynthroomInput} onChange={(event) => this.setState({newSynthroomInput: event.target.value})}/>
              <button onClick={this.handleCreate}>Create</button>
              <button onClick={(event) => {this.props.history.push(`/dummycomponent/7`)}}>DUMMY</button>
            </div>
          )
        }}/>
        <Route path="/synthrooms/:id" render={(routerProps) => {

          // return <div>{routerProps.match.params.id}</div>
          return <SynthroomContainer {...routerProps}/>
        }}/>
        <Route path="/dummycomponent/7" render={(routerProps) => {

          // return <div>{routerProps.match.params.id}</div>
          return <DummyComponent {...routerProps}/>
        }}/>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {...state}
}

export default withRouter(connect(mapStateToProps, { fetchAllSynthrooms, createNewSynthroom, setUsername })(App))
