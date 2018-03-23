class PatchesController < ApplicationController
  def index
    @patches = Patch.all
    render json: @patches
  end

  def show
    @patch = Patch.find(params[:id])
    render json: @patch
  end

  def create
    @patch = Patch.create(name: params[:name], selected_waveform: params[:selectedWaveform], master_gain: params[:masterGain], current_octave: params[:currentOctave], oscillator_gain_node_value: params[:oscillatorGainNodeValue])
    render json: @patch
  end

  def update
    @patch = Patch.find(params[:id])
    @patch.update(name: params[:name], selected_waveform: params[:selectedWaveform], master_gain: params[:masterGain], current_octave: params[:currentOctave], oscillator_gain_node_value: params[:oscillatorGainNodeValue])
    render json: @patch
  end

  def destroy
    @patch = Patch.find(params[:id])
    @patch.delete
  end
end
