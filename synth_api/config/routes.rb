Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :patches
  resources :synthrooms

  # patch '/patches/:id', to: 'patches#update'
  # get '/patches', to: 'patches#index'

  mount ActionCable.server => '/cable'
end
