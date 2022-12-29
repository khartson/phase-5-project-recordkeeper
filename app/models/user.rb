class User < ApplicationRecord
  has_secure_password

  # validations - username must exist and be unique
  validates :username, presence: true, uniqueness: true
  # use gem 'Icodi' to create a user svg string icon,
  # which will render a unique profile image on instantiation
  before_create :set_icon

  private
  
  # set_icon 
  # creates an svg using Icodi gem that returns an svg 
  # string which can be rendered on the frontend. Each svg
  # is unique and serves as a 'profile picture' for a user
  def set_icon
    self.icon = Icodi.new(pixels: 10, 
                                 density: 0.5, stroke: 0.2,
                                 mirror: :none).render
  end 
end
