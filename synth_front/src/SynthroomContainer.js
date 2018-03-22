import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Synthroom from './Synthroom'
import { loadSynthroom } from './actions'

class SynthroomContainer extends React.Component {
  componentDidMount = () => {
		let id = this.props.match.params.id

		this.props.loadSynthroom(id)
	}

	render = () => {
		if (this.props.currentSynthroom && this.props.username){
			return <Synthroom/>
		} else {
			return <h1>Loading</h1>
		}
	}
}

const mapStateToProps = (state) => {
  return {...state}
}

export default connect(mapStateToProps, { loadSynthroom })(SynthroomContainer);
