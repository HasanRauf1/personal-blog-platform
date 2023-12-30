Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  # Defines the root path route ("/")
  root 'home#index'

  get '/auth/check', to: 'auth#check'
  
  namespace :api do
    resources :posts do
      resources :comments
    end
  end

  get '/*other', to: 'home#index'
end
