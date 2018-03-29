import React from 'react'
import { connect } from 'react-redux'
import Synthroom from './Synthroom'
import { loadSynthroom } from './actions'
import rainbowDongle from './rainbow_dongle.gif'

class SynthroomContainer extends React.Component {
  componentDidMount = () => {
		let id = this.props.match.params.id

		this.props.loadSynthroom(id)
	}

	render = () => {
		if (this.props.currentSynthroom && this.props.username){
			return <Synthroom/>
		} else {
			return <img className="rainbowDongle" id="rainbow-dongle" src={rainbowDongle} alt=""/>
		}
	}
}

const mapStateToProps = (state) => {
  return {...state}
}

export default connect(mapStateToProps, { loadSynthroom })(SynthroomContainer);
