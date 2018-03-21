class SynthroomChannel < ApplicationCable::Channel
  def subscribed
    synthroom = Synthroom.find(params[:synthroom_id])
    stream_for synthroom
    # create synth architecture for this user here
  end

  def unsubscribed
    #destroy unused synth architecture for this user here
    # Any cleanup needed when channel is unsubscribed
  end
end
