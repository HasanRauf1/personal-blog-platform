class ApplicationController < ActionController::Base
  after_action :set_csrf_header

  private

  def set_csrf_header
    response.headers['X-CSRF-TOKEN'] = form_authenticity_token
  end
end
