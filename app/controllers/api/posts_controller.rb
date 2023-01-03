class Api::PostsController < ApplicationController

  def index 
    # @pagy, @records 
    render json: Post.all
  end 



  private 
  
  def post_params

  end 
end
