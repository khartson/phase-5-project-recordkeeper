class Api::FeedController < ApplicationController

  # feed endpoint where all posts are fetched, offering 
  # conditional querying for url searches, with result pagination
  def posts 
    @pagy, @posts = pagy(filter_posts, items: 20)
    render json: {
      data: ActiveModel::Serializer::CollectionSerializer.new(
                      @posts, serializer: FeedPostsSerializer),
      meta: pagy_metadata(@pagy)
    }
  end 

  def users
    render json: User.all.sample(10), each_serializer: UserSearchSerializer
  end 

  def tags
    render json: Tag.all
  end 

  private 

  # declare filterable fields
  # compact_blank turns empty string and array fields to niltype
  def filter_params
    params.compact_blank.permit(:user, :page, tags: [])
  end

  # conditionally check if results for posts are sorted against tag, 
  # user id, both, or neither, and return resutls accordingly
  def filter_posts
    if filter_params[:user] && filter_params[:tags]
      Post.where(user_id: filter_params[:user]).joins(:tags).where(tags: { id: params[:tags]})
    elsif filter_params[:user]
      Post.where(user_id: filter_params[:user])
    elsif filter_params[:tags]
      Post.joins(:tags).where(tags: { id: filter_params[:tags] })
    else 
      Post.all
    end 
  end 

end
