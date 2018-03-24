class SynthroomChannel < ApplicationCable::Channel
  def subscribed
    synthroom = Synthroom.find(params[:synthroom_id])
    stream_for synthroom
  end

  def unsubscribed
    synthroom = Synthroom.find(params[:synthroom_id])
    SynthroomChannel.broadcast_to(synthroom, {
      type: 'REMOVE_USER',
      payload: params[:username]
    })
  end
end
