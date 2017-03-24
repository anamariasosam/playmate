class User < ApplicationRecord
  has_many :workouts
  has_many :sports, through: :workouts

  validates_presence_of :name, :description

  mount_uploader :picture, PictureUploader
end
