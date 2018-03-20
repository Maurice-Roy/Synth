Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :patches
  resources :synthrooms

  post '/synthrooms/:id/add_message', to: 'synthrooms#add_message'
  post '/synthrooms/:id/send_notes', to: 'synthrooms#send_notes'
  post '/synthrooms/:id/remove_notes', to: 'synthrooms#remove_notes'

  mount ActionCable.server => '/cable'
end
