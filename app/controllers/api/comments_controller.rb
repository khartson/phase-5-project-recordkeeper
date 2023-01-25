class Api::CommentsController < ApplicationController

  before_action :current_user?, only: [:update, :destroy]
  def create
    comment = Comment.create!(**comment_params, user: @current_user)
    render json: comment, status: :created
  end 
  
  def update
    comment = Comment.find(params[:id])
    comment.update!(content: comment_params[:content])
    render json: comment 
  end 

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy 
    head :no_content 
  end 

  private

  def comment_params
    params.require(:comment).permit(:id, :content, :user_id, :post_id)
  end 
end
