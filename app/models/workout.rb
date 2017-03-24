class Workout < ApplicationRecord
  belongs_to :user
  belongs_to :sport

  validates_presence_of :user_id, :sport_id
end
