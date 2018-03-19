class SynthroomsController < ApplicationController

  def index
    @synthrooms = Synthroom.all
    render json: @synthrooms
  end

  def create
    @synthroom = Synthroom.new(synthroom_params)
    if @synthroom.valid?
      @synthroom.save
      render json: @synthroom
    else
      render json: {error: 'A room with this name already exists!'}
    end
  end

  def add_message
    synthroom = Synthroom.find(params[:synthroom_id])
    if chatroom
      message = Message.create(content: params[:content], synthroom_id: synthroom.id)
      SynthroomChannel.brodcast_to(synthroom, {
        type: 'ADD_MESSAGE',
        payload: prepare_message(message)
      })
      render json: prepare_message(message)
    else
      render json: {error: 'There was an error sending your message!'}
    end
  end

  def prepare_message(message)
    message_hash = {
      id: message.id,
      content: message.content,
      created_at: message.created_at.strftime('%H:%M')
    }
  end

  def show
    @synthroom = Synthroom.find_by(id: params[:id])
    render json: @synthroom
  end

  private

  def synthroom_params
    params.require(:synthroom).permit(:name)
  end
end
