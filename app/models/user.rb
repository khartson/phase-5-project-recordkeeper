class User < ApplicationRecord
  has_secure_password

  # relationships
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :commented_posts, -> { distinct }, through: :comments, source: 'post'


  # validations - username must exist and be unique
  validates :username, presence: true, uniqueness: true
  # use gem 'Icodi' to create a user svg string icon,
  # which will render a unique profile image on instantiation
  before_create :set_icon


  # search scope: enable fuzzy searching on user model
  # by username
  # eg User.username_search 'khartso' #=> <User username: 'khartson2017'>
  pg_search_scope :username_search, against: :username, using: [:tsearch, :trigram]

  # public icon method, accessible outside of initializiation when
  # a user wants to change their
  def change_icon
    self.set_icon
    self.save
  end 

  private
  
  # set_icon 
  # creates an svg using Icodi gem that returns an svg 
  # string which can be rendered on the frontend. Each svg
  # is unique and serves as a 'profile picture' for a user
  def set_icon
    self.icon = Icodi.new(
      pixels: 10, 
      density: 0.5, stroke: 0.2,
      mirror: :none).render
  end 

end
