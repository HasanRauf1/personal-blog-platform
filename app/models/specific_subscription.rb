class SpecificSubscription < ApplicationRecord
   # The user who created the subscription
  belongs_to :user

  # Polymorphic association allowing subscription to different models (User or Post)
  belongs_to :subscribable, polymorphic: true
end
