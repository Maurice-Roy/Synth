import React from 'react'
import PropTypes from 'prop-types'
import { ActionCable } from 'react-actioncable-provider'


class DummyComponenet extends React.Component {
  state = {
    currentSynthroom: {id: 7},
    username: 'MAURICE',
    userObject: {},
    subscribed: false
  }

  handleSocketResponse = (data) => {
    console.log('data in DummyComponent handleSocketResponse', data);
    switch (data.type) {
      case 'ADD_NEW_USER':
        this.setState({
          userObject: data.payload,
          subscribed: true
        })
        break;
    }
  }
  
  // componentWillReceiveProps(nextProps, nextState){
  //   if (!nextState.subscribed){
  //     console.log("RERENDERING")
  //     this.forceUpdate()
  //   }
  // }

  render () {
    console.log('props in DummyComponent',this.props);
    console.log('state in DummyComponent',this.state);

    return (
      <ActionCable
        channel={{channel: 'SynthroomChannel', synthroom_id: this.state.currentSynthroom.id, username: this.state.username}}
        onReceived={this.handleSocketResponse}
      />
    )
  }
}

export default DummyComponenet;
