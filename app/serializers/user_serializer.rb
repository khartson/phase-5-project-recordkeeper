class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :icon, :created_at
end
