class Api::SearchController < ApplicationController

  def search
    if search_params[:user]
      search_users(search_params[:user])
    elsif search_params[:tag]
      search_tags(search_params[:tag])
    else
      render json: { errors: ["Provide a user or tag query"] }, status: :bad_request
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
        ),
      meta: pagy_metadata(@pagy)
    }
  end 

  def search_tags(tag)
    tags = Tag.where('name ILIKE ?', "%#{Tag.sanitize_sql_like(tag)}%").limit(20)
    render json: {
      data: ActiveModel::Serializer::CollectionSerializer.new(tags, serializer: TagSerializer)
    }
  end 

end
