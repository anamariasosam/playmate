class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :sport_id
  has_one :user
  has_one :sport
end
