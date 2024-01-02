class SpecificSubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :subscribable_type, :subscribable_id, :subscribable_name

  def subscribable_name
    object.subscribable.is_a?(Post) ? object.subscribable.title : object.subscribable.name
  end
end
