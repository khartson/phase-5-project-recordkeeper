Rails.application.routes.draw do
  scope module: 'api' do

    resources :users

    # auth flow routes
    post '/signup', to: "sessions#signup"
    get '/me', to: "sessions#me"
    post 'login', to: "sessions#login"
    delete '/logout', to: "sessions#logout"
  end 

  # Routing logic: fallback requests for React Router.
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
