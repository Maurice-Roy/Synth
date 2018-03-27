import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

class Spectral extends React.Component {
  constructor(props) {
    super(props)
    this.dataArray = new Uint8Array(this.props.analyser.fftSize/2);
  }

  componentDidMount = () => {
    this.canvasCtx = this.refs.spectralCanvas.getContext('2d')
    this.canvasCtx.fillStyle = 'rgba(255, 255, 255, 0)'
    this.canvasCtx.strokeStyle = 'rgb(0, 0, 0)'
    this.canvasCtx.lineWidth = 0.1
    this.draw()
  }

  width = 550
  height = 250

  x = d3.scaleLinear()
    .domain([0, 1024])
    .range([3, this.width])

  y = d3.scaleLinear()
    .domain([0, 255])
    .range([this.height + 4, 5])

  colors = d3.scaleLinear()
    .domain([0, 40, 90, 140, 220])
    .range(['white', 'yellow', 'orange', 'orange', 'red'])

  draw = () => {
    this.props.analyser.getByteFrequencyData(this.dataArray)
    this.canvasCtx.fillStyle = 'rgba(33,33,33)'
    this.canvasCtx.fillRect(0, 0, this.width, this.height)
    for (let i in this.dataArray) {
      this.canvasCtx.beginPath()
      this.canvasCtx.fillStyle = this.colors(this.dataArray[i])
      this.canvasCtx.arc(this.x(i), this.y(this.dataArray[i]), 3, 0, 2*Math.PI)
      this.canvasCtx.fill()
      this.canvasCtx.stroke()
    }
    requestAnimationFrame(this.draw)
  }

  render () {
    return (
      <canvas className="spectral" ref='spectralCanvas' id='spectralCanvas' width={this.width} height={this.height}></canvas>
    )
  }
}

export default Spectral;
