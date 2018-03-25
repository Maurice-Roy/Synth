class SynthroomsController < ApplicationController

  def index
    @synthrooms = Synthroom.all
    render json: @synthrooms
  end

  def create
    @synthroom = Synthroom.new(synthroom_params)

    if @synthroom.valid?
      # @synthroom[:messages] = []
      @synthroom.save
      puts @synthroom
      render json: @synthroom
    else
      render json: {error: 'A room with this name already exists!'}
    end
  end

  def add_user
    puts 'params in add_user:'
    puts params
    synthroom = Synthroom.find(params[:id])
    SynthroomChannel.broadcast_to(synthroom, {
      type: 'ADD_USER',
      payload: {
        username: params[:username],
        currentPatchSettings: params[:currentPatchSettings]
      }
    })
  end

  def retrieve_user_data
    puts 'params in retrieve_user_data:'
    puts params
    synthroom = Synthroom.find(params[:id])
    SynthroomChannel.broadcast_to(synthroom, {
      type: 'RETRIEVE_USER_DATA'
    })
  end

  def update_patch
    puts 'params in update_patch:'
    puts params
    synthroom = Synthroom.find(params[:id])
    if synthroom
      SynthroomChannel.broadcast_to(synthroom, {
        type: 'UPDATE_PATCH',
        payload: prepare_patch_update(params)
      })
      render json: prepare_patch_update(params)
    else
      render json: {error: 'There was an error updating the patch!'}
    end
  end

  def load_patch
    puts 'params in load_patch:'
    puts params
    synthroom = Synthroom.find(params[:id])
    if synthroom
      SynthroomChannel.broadcast_to(synthroom, {
        type: 'LOAD_PATCH',
        payload: prepare_patch_load(params)
      })
      render json: prepare_patch_load(params)
    else
      render json: {error: 'There was an error loading the patch!'}
    end
  end

  def add_message
    synthroom = Synthroom.find(params[:id])
    if synthroom
      message = Message.create(username: params[:username], content: params[:content], synthroom_id: synthroom.id)
      SynthroomChannel.broadcast_to(synthroom, {
        type: 'ADD_MESSAGE',
        payload: prepare_message(message)
      })
      render json: prepare_message(message)
    else
      render json: {error: 'There was an error sending your message!'}
    end
  end

  def send_notes
    synthroom = Synthroom.find(params[:id])
    if synthroom
      SynthroomChannel.broadcast_to(synthroom, {
        type: 'ADD_SOCKET_OSCILLATOR',
        payload: prepare_add_note_data(params)
      })
      render json: prepare_add_note_data(params)
    else
      render json: {error: 'There was an error sending your note!'}
    end
  end

  def remove_notes
    synthroom = Synthroom.find(params[:id])
    if synthroom
      SynthroomChannel.broadcast_to(synthroom, {
        type: 'REMOVE_SOCKET_OSCILLATOR',
        payload: prepare_remove_note_data(params)
      })
      render json: prepare_remove_note_data(params)
    else
      render json: {error: 'There was an error removing your note!'}
    end
  end

  def prepare_patch_update(params)
    update_hash = {
      username: params[:username],
      synthParameter: params[:synthParameter],
      value: params[:value]
    }
  end

  def prepare_patch_load(params)
    patch_load_hash = {
      username: params[:username],
      patch: params[:patch],
      id: params[:patch][:id],
      name: params[:patch][:name],
      selectedWaveform: params[:patch][:selected_waveform],
      masterGain: params[:patch][:master_gain],
      currentOctave: params[:patch][:current_octave],
      oscillatorGainNodeValue: params[:patch][:oscillator_gain_node_value],
      filterFrequency: params[:patch][:filter_frequency],
      filterQ: params[:patch][:filter_q],
      filterType: params[:patch][:filter_type],
      gainEnvelopeAttackTime: params[:patch][:gain_envelope_attack_time],
      gainEnvelopeDecayTime: params[:patch][:gain_envelope_decay_time],
      gainEnvelopeSustainLevel: params[:patch][:gain_envelope_sustain_level],
      gainEnvelopeReleaseTime: params[:patch][:gain_envelope_release_time],
      gainEnvelopeGateTime: params[:patch][:gain_envelope_gate_time],
      gainEnvelopeReleaseCurve: params[:patch][:gain_envelope_release_curve],
      adsrFilterFrequency: params[:patch][:adsr_filter_frequency],
      adsrFilterQ: params[:patch][:adsr_filter_q],
      adsrFilterType: params[:patch][:adsr_filter_type],
      filterEnvelopeAttackTime: params[:patch][:filter_envelope_attack_time],
      filterEnvelopeDecayTime: params[:patch][:filter_envelope_decay_time],
      filterEnvelopeSustainLevel: params[:patch][:filter_envelope_sustain_level],
      filterEnvelopePeakLevel: params[:patch][:filter_envelope_peak_level],
      filterEnvelopeReleaseTime: params[:patch][:filter_envelope_release_time],
      filterEnvelopeGateTime: params[:patch][:filter_envelope_gate_time],
      filterEnvelopeReleaseCurve: params[:patch][:filter_envelope_release_curve]
      # add more signal processng values here
    }
  end

  def prepare_add_note_data(params)
    note_hash = {
      key: params[:key],
      frequency: params[:frequency],
      waveform: params[:waveform],
      username: params[:username],
    }
  end

  def prepare_remove_note_data(params)
    note_hash = {
      key: params[:key],
      username: params[:username],
    }
  end

  def prepare_message(message)
    message_hash = {
      id: message.id,
      content: message.content,
      username: message.username,
      created_at: message.created_at.strftime('%H:%M')
    }
  end

  def show
    @synthroom = Synthroom.find_by(id: params[:id])
    render json: @synthroom, status: 200
  end

  private

  def synthroom_params
    params.require(:synthroom).permit(:name)
  end
end
