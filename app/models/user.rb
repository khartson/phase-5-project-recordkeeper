class User < ApplicationRecord
  has_secure_password

  # validations - username must exist and be unique
  validates :username, presence: true, uniqueness: true
  before_create :set_icon

  private
  
  def set_icon
    self.icon = Icodi.new.render
  end 
end
