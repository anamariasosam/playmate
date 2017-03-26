class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :picture, :latitude, :longitude, :sports

  attribute :sports do
    object.sports.map(&:downcase)
  end
end
