class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :embeddable, :link, :preview_image, :created_at

  has_many :tags
  has_many :comments, serializer: CommentSerializer
  belongs_to :author, serializer: PostUserSerializer
end
