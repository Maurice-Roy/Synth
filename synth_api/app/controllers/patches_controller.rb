class PatchesController < ApplicationController
  def index
    @patches = Patch.all
    render json: @patches
  end


  def create

  end


  def update

  end
end
