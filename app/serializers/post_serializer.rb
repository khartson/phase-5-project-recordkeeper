class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :embeddable, :link, :preview_image

  has_many :tags
  belongs_to :author
end
