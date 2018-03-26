Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :patches
  resources :synthrooms

  post '/synthrooms/:id/add_user', to: 'synthrooms#add_user'
  post '/synthrooms/:id/update_patch', to: 'synthrooms#update_patch'
  post '/synthrooms/:id/load_patch', to: 'synthrooms#load_patch'
  post '/synthrooms/:id/retrieve_user_data', to: 'synthrooms#retrieve_user_data'
  post '/synthrooms/:id/add_message', to: 'synthrooms#add_message'
  post '/synthrooms/:id/send_notes', to: 'synthrooms#send_notes'
  post '/synthrooms/:id/remove_notes', to: 'synthrooms#remove_notes'
  post '/synthrooms/:id/remove_notes', to: 'synthrooms#force_remove_notes'

  mount ActionCable.server => '/cable'
end
