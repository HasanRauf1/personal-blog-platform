Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  root 'home#index'
  
  namespace :api do
    resources :posts do
      resources :comments
    end
  end
  get '/*other', to: 'home#index'
end
