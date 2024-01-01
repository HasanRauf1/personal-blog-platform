class AuthController < ApplicationController
  def check
    if user_signed_in?
      render json: { signed_in: true, user: current_user.as_json(only: [:id, :name, :email]) }
    else
      render json: { signed_in: false }
    end
  end
end
