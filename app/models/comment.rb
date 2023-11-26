class Comment < ApplicationRecord
  # belongs_to :user
  belongs_to :post

  # Validation
  validates :content, presence: true
end
