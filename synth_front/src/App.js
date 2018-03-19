import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchAllSynthrooms } from './actions'
import { ActionCable } from 'react-actioncable-provider'
import SynthroomContainer from './SynthroomContainer'
import { Route, Switch, withRouter } from 'react-router-dom'

class App extends Component {

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

  renderSynthroom = () => {

  }

  render() {

    return (
      <div>
        <Route exact path="/" render={(routerProps) => {
          //create a component for this select
          return(<select name="roomSelect" id="roomSelect" onChange={this.handleSelect}>
            <option disabled selected value> -- select a room -- </option>
            {this.listSynthrooms()}
          </select>)
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

export default withRouter(connect(mapStateToProps, { fetchAllSynthrooms })(App))
