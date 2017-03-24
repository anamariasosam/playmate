Rails.application.routes.draw do
  namespace :api, defaults: {format: 'json'} do
    resources :sports
    resources :users
  end

  root 'pages#index'
  get '*path', to: 'pages#index'
end
