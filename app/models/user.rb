class User < ApplicationRecord
  # validates_presence_of :name, :description

  mount_uploader :picture, PictureUploader
end
