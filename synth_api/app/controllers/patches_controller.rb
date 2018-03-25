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
    puts params
    # remember to add params for new signal processing
    @patch = Patch.create(
      name: params[:name],
      selected_waveform: params[:selectedWaveform],
      master_gain: params[:masterGain],
      current_octave: params[:currentOctave],
      oscillator_gain_node_value: params[:oscillatorGainNodeValue],
      filter_frequency: params[:filterFrequency],
      filter_q: params[:filterQ],
      filter_type: params[:filterType],
      gain_envelope_attack_time: params[:gainEnvelopeAttackTime],
      gain_envelope_decay_time: params[:gainEnvelopeDecayTime],
      gain_envelope_sustain_level: params[:gainEnvelopeSustainLevel],
      gain_envelope_release_time: params[:gainEnvelopeReleaseTime],
      gain_envelope_gate_time: params[:gainEnvelopeGateTime],
      gain_envelope_release_curve: params[:gainEnvelopeReleaseCurve],
      adsr_filter_frequency: params[:adsrFilterFrequency],
      adsr_filter_q: params[:adsrFilterQ],
      adsr_filter_type: params[:adsrFilterType],
      filter_envelope_attack_time: params[:filterEnvelopeAttackTime],
      filter_envelope_decay_time: params[:filterEnvelopeDecayTime],
      filter_envelope_sustain_level: params[:filterEnvelopeSustainLevel],
      filter_envelope_peak_level: params[:filterEnvelopePeakLevel],
      filter_envelope_release_time: params[:filterEnvelopeReleaseTime],
      filter_envelope_gate_time: params[:filterEnvelopeGateTime],
      filter_envelope_release_curve: params[:filterEnvelopeReleaseCurve]
    )
    render json: @patch
  end

  def update
    @patch = Patch.find(params[:id])
    # remember to add params for new signal processing
    @patch.update(name: params[:name],
      selected_waveform: params[:selectedWaveform],
      master_gain: params[:masterGain],
      current_octave: params[:currentOctave],
      oscillator_gain_node_value: params[:oscillatorGainNodeValue],
      filter_frequency: params[:filterFrequency],
      filter_q: params[:filterQ],
      filter_type: params[:filterType],
      gain_envelope_attack_time: params[:gainEnvelopeAttackTime],
      gain_envelope_decay_time: params[:gainEnvelopeDecayTime],
      gain_envelope_sustain_level: params[:gainEnvelopeSustainLevel],
      gain_envelope_release_time: params[:gainEnvelopeReleaseTime],
      gain_envelope_gate_time: params[:gainEnvelopeGateTime],
      gain_envelope_release_curve: params[:gainEnvelopeReleaseCurve],
      adsr_filter_frequency: params[:adsrFilterFrequency],
      adsr_filter_q: params[:adsrFilterQ],
      adsr_filter_type: params[:adsrFilterType],
      filter_envelope_attack_time: params[:filterEnvelopeAttackTime],
      filter_envelope_decay_time: params[:filterEnvelopeDecayTime],
      filter_envelope_sustain_level: params[:filterEnvelopeSustainLevel],
      filter_envelope_peak_level: params[:filterEnvelopePeakLevel],
      filter_envelope_release_time: params[:filterEnvelopeReleaseTime],
      filter_envelope_gate_time: params[:filterEnvelopeGateTime],
      filter_envelope_release_curve: params[:filterEnvelopeReleaseCurve]
    )
    render json: @patch
  end

  def destroy
    @patch = Patch.find(params[:id])
    @patch.delete
  end
end
