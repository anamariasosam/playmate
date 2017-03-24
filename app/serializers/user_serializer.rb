class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :picture
  has_many :sports
end
