class Api::PostsController < ApplicationController

  def show
    post = Post.find(params[:id])
    render json: post
  end 



  private 
  
  def post_params

  end 
end
