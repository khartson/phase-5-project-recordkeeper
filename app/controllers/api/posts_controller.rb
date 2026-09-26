class Api::PostsController < ApplicationController
  skip_before_action :current_user?
  before_action :set_post, only: [:update, :destroy]
  before_action :authorize_owner!, only: [:update, :destroy]

  def show
    post = Post.find(params[:id])
    render json: post, serializer: PostSerializer,
    include: ['comments', 'comments.user', 'tags', 'author', 'commenters']
  end 

  def create
    tags = Array(params[:tags]).map { |tag| Tag.find_or_create_by(name: tag) }
    post = Post.create!(**post_params, author: @current_user, tags: tags)
    render json: post, status: :created
  end 


  def update
    @post.update!(content: post_params[:content], title: post_params[:title])
    render json: @post
  end 

  def destroy
    @post.destroy!
    head :no_content
  end 


  private 

  def set_post
    @post = Post.find(params[:id])
  end

  def authorize_owner!
    return if @post.user_id == @current_user.id
    render json: { errors: ["You cannot edit this resource"] }, status: :forbidden
  end
  
  # strong params for post 
  # accepts the attributes to create a post object
  # and allows more control over what is submitted to the 
  # create method
  # tags will be passed in based params and created with
  # find_or_delete_by([])
  def post_params
    params.require(:post)
    .permit(:title, :content, :link, :embeddable, :preview_image)
  end 

end
