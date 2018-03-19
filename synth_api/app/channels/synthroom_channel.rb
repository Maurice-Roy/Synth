class SynthroomChannel < ApplicationCable::Channel
  def subscribed
    synthroom = Synthroom.find(params[:synthroom_id])
    stream_for synthroom
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
