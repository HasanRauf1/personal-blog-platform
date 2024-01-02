require 'sidekiq/web'

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

    resources :users, only: [:index]
    resources :specific_subscriptions, only: [:index, :create, :destroy]
    resource :general_subscription, only: [:show, :update]
  end

  mount Sidekiq::Web => '/sidekiq'

  get '/*other', to: 'home#index'
end
