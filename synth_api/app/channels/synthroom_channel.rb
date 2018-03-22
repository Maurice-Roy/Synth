class SynthroomChannel < ApplicationCable::Channel
  def subscribed
    synthroom = Synthroom.find(params[:synthroom_id])
    stream_for synthroom
    # puts "params on subscribe: #{params}"

    # SynthroomChannel.broadcast_to(synthroom, {
    #   type: 'ADD_NEW_USER',
    #   payload: params[:username]
    # })
  end

  def unsubscribed
    #destroy unused synth architecture for this user here
    synthroom = Synthroom.find(params[:synthroom_id])
    puts "params on unsubscribe: #{params}"
    SynthroomChannel.broadcast_to(synthroom, {
      type: 'REMOVE_USER',
      payload: params[:username]
    })
  end
end
