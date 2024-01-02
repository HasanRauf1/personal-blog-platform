class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  # Subscriptions to the post
  has_many :specific_subscriptions, as: :subscribable, dependent: :destroy

  # Validations
  validates :title, presence: true
  validates :body, presence: true
end
