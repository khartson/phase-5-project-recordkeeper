Rails.application.routes.draw do
  scope module: 'api' do

    # default routes
    # resources :posts, exc
    resources :users

    get '/posts', to: 'feed#posts'

    # feed routes for paramaterizing, serializing, and
    # accepting depending search data

    # custom user routes for sensitive information where
    # user info grabbed from session/@current_user
    patch '/change_password', to: 'users#change_password'
    patch '/new_icon', to: "users#new_icon"
    delete '/delete_account', to: "users#delete_account"

    # auth flow routes
    post '/signup', to: "sessions#signup"
    get '/me', to: "sessions#me"
    post 'login', to: "sessions#login"
    delete '/logout', to: "sessions#logout"
  end 

  # Routing logic: fallback requests for React Router.
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
