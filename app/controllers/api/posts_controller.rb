class Api::PostsController < ApplicationController

  def show
    post = Post.find(params[:id])
    render json: post
  end 

  def create
    tags = []
    params[:tags].each { | tag | tags << Tag.find_or_create_by(name: tag)}
    post = Post.create!(**post_params, tags: tags)
    render json: post, status: :created
  end 


  private 
  
  # strong params for post 
  # accepts the attributes to create a post object
  # and allows more control over what is submitted to the 
  # create method
  # tags will be passed in based params and created with
  # find_or_delete_by([])
  def post_params
    params.require(:post)
    .permit(:title, :user_id, :content, :link, :embeddable, :preview_image)
  end 
end
