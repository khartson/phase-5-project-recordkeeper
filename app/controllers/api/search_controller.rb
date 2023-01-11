class Api::SearchController < ApplicationController

  def search
    # byebug
    if search_params[:user]
      search_users(search_params[:user])
    elsif search_params[:tag]
      search_tags(search_params[:tag])
    end 
  end 

  private 
  
  def search_params
    params.permit(:user, :tag)
  end 

  def search_users(user)
    @pagy, @users = pagy(User.username_search(user))
    render json: {
      data: 
        ActiveModel::Serializer::CollectionSerializer.new(
          @users, serializer: UserSearchSerializer
        )
    }
  end 

  def search_tags
  end 

end
