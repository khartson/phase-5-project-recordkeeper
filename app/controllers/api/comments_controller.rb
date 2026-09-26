class Api::CommentsController < ApplicationController
  skip_before_action :current_user?
  before_action :set_comment, only: [:update, :destroy]
  before_action :authorize_owner!, only: [:update, :destroy]

  def create
    comment = Comment.create!(**comment_params, user: @current_user)
    render json: comment, status: :created
  end

  def update
    @comment.update!(content: comment_params[:content])
    render json: @comment
  end

  def destroy
    @comment.destroy
    head :no_content
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def authorize_owner!
    return if @comment.user_id == @current_user.id
    render json: { errors: ["You cannot edit this resource"] }, status: :forbidden
  end

  def comment_params
    params.require(:comment).permit(:content, :post_id)
  end
end