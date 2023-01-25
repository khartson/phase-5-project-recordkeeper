class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :icon, :created_at
  has_many :posts, serializer: FeedPostsSerializer
  has_many :commented_posts, serializer: FeedPostsSerializer
end
