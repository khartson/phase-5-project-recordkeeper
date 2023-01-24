class FeedPostsSerializer < ActiveModel::Serializer
  attributes :id, :title, :preview_image, :summary

  has_many :tags
  belongs_to :author, serializer: PostUserSerializer
  has_many :commenters

  def summary
    "#{self.object.content[0..50]}..."
  end 
end
