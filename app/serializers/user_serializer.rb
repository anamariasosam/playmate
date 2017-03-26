class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :picture, :latitude, :longitude, :sports
end
