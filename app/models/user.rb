class User < ApplicationRecord
  # validates_presence_of :name, :description

  mount_uploader :picture, PictureUploader

  reverse_geocoded_by :latitude, :longitude
  after_validation :reverse_geocode, :if => :latitude_changed? || :longitude_changed?
end
