class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :embeddable, :link, :preview_image, :created_at

  has_many :tags
  belongs_to :author
end
