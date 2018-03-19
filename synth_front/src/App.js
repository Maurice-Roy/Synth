import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchAllSynthrooms, createNewSynthroom, setUsername } from './actions'
import { ActionCable } from 'react-actioncable-provider'
import SynthroomContainer from './SynthroomContainer'
import { Route, Switch, withRouter } from 'react-router-dom'

class App extends Component {

  state = {
    newSynthroomInput: null
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

  render() {
    return (
      <div>
        <Route exact path="/" render={(routerProps) => {
          //create a component for this select
          return(
            <div>
              <input type="text" placeholder="enter username..." onChange={(event) => this.props.setUsername(event.target.value)}/>
              <br/>
              <select name="roomSelect" id="roomSelect" onChange={this.handleSelect}>
                <option disabled selected value>select existing room</option>
                {this.listSynthrooms()}
              </select>
              <span> or </span>
              <input type="text" placeholder="enter new room name..." value={this.state.newSynthroomInput} onChange={(event) => this.setState({newSynthroomInput: event.target.value})}/>
              <button onClick={this.handleCreate}>Create</button>
            </div>
          )
        }}/>
        <Route path="/synthrooms/:id" render={(routerProps) => {
          console.log(routerProps);

          // return <div>{routerProps.match.params.id}</div>
          return <SynthroomContainer {...routerProps}/>
        }}/>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {...state}
}

export default withRouter(connect(mapStateToProps, { fetchAllSynthrooms, createNewSynthroom, setUsername })(App))
