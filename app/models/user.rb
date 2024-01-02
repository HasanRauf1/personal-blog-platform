class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy

   # Subscriptions made by the user
  has_one :general_subscription
  has_many :specific_subscriptions
  has_many :subscribed_authors, through: :specific_subscriptions, source: :subscribable, source_type: 'User'
  has_many :subscribed_posts, through: :specific_subscriptions, source: :subscribable, source_type: 'Post'
end
