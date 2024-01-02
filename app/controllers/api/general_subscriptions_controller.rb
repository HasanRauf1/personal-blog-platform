class Api::GeneralSubscriptionsController < ApplicationController
  before_action :authenticate_user!
  
  def show
    @general_subscription = current_user.general_subscription
    render json: @general_subscription
  end

  def update
    @general_subscription = GeneralSubscription.find_or_initialize_by(user: current_user)
    if @general_subscription.update(general_subscription_params)
      render json: @general_subscription
    else
      render json: @general_subscription.errors, status: :unprocessable_entity
    end
  end

  private

  def general_subscription_params
    params.require(:general_subscription).permit(:subscribe_to_new_posts, :subscribe_to_all_comments, :subscribe_to_own_post_comments)
  end
end
