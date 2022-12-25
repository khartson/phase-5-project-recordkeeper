class User < ApplicationRecord
  has_secure_password

  # validations - username must exist and be unique
  validates :username, presence: true, uniqueness: true

end
