class Post < ApplicationRecord

  has_and_belongs_to_many :tags 

  # alias the user referenced as the author
  # has_one :author, class_name: "User"
  # has_one :user
  belongs_to :author, class_name: "User", foreign_key: 'user_id'

  validates :title, length: { in: 10..60 }
  validates :content, length: {in: 20..250 }
  validates_length_of :tags, { maximum: 3 }

  accepts_nested_attributes_for :tags

end
