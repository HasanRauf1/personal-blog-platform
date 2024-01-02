class Api::SpecificSubscriptionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_subscription, only: [:destroy]

  def index
    @specific_subscriptions = current_user.specific_subscriptions.includes(:subscribable)
    render json: @specific_subscriptions, each_serializer: SpecificSubscriptionSerializer
  end

  def create
    @subscription = current_user.specific_subscriptions.build(subscription_params)
    if @subscription.save
      render json: @subscription, status: :created
    else
      render json: @subscription.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @subscription.destroy
    head :no_content
  end

  private

  def set_subscription
    @subscription = current_user.specific_subscriptions.find(params[:id])
  end

  def subscription_params
    params.require(:specific_subscription).permit(:subscribable_type, :subscribable_id)
  end
end
