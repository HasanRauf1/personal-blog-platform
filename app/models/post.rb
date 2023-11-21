class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  # Validations
  validates :title, presence: true
  validates :body, presence: true
end
