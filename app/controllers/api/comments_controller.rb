class Api::CommentsController < ApplicationController

  before_action :current_user?, only: [:update, :destroy]
  def create
    comment = Comment.create!(**comment_params, user: @current_user)
    render json: comment, status: :created
  end 
  
  def update
    comment = Comment.find(params[:id])
    if comment.user == @current_user
      comment.update!(content: comment_params[:content])
      render json: comment 
    else
      head :forbidden
    end
  end 

  def destroy
    comment = Comment.find(params[:id])
    if comment.user == @current_user
      comment.destroy 
      head :no_content 
    else
      head :forbidden
    end
  end 

  private

  def comment_params
    params.require(:comment).permit(:id, :content, :post_id)
  end 
end
