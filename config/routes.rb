Rails.application.routes.draw do
  namespace :api, defaults: {format: 'json'} do
    resources :users

    get 'user/playmates/:id', to: 'users#playmates'
  end

  root 'pages#index'
  get '*path', to: 'pages#index'
end
