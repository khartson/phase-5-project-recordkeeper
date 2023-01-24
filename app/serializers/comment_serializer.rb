class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at
  has_one :post
  belongs_to :user, serializer: PostUserSerializer
end
