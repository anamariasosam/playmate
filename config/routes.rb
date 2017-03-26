Rails.application.routes.draw do
  namespace :api, defaults: {format: 'json'} do
    resources :users

    get 'users/nearby/:id', to: 'users#nearby'
  end

  root 'pages#index'
  get '*path', to: 'pages#index'
end
