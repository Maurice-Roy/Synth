class SynthroomsController < ApplicationController

  def index
    @synthrooms = Synthroom.all
    render json: @synthrooms
  end

  def create
    @synthroom = Synthroom.new(synthroom_params)

    if @synthroom.valid?
      @synthroom[:messages] = []
      @synthroom.save
      puts @synthroom
      render json: @synthroom
    else
      render json: {error: 'A room with this name already exists!'}
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
