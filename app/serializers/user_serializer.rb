class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :picture, :sports
end
