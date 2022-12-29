class Api::SessionsController < ApplicationController

  # do not authorize before signup or login
  skip_before_action :authorize, only: [:signup, :login]

  # take in user params, if valid? return the created 
  # user instance + update the session with their info
  def signup
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end 

  # grabs inherited instance variable @current_user 
  # from parent class, will return the user if the 
  # client returns a session :user_id for current login
  # else, render a not authorized response (auto login)
  def me
    render json: @current_user 
  end 


  # checks user records for parameters passed, 
  # if authenticated returns user and sets 
  # session variable 
  def login 
    user = User.find_by(username: user_params[:username])
    if user&.authenticate(user_params[:password])
      session[:user_id] = user.id
      return render json: user, status: :created
    else
      render_login_errors(user)
    end 
  end 

  # log out the user and remove from the session
  # will error out with 401 if logout attempted 
  # while not logged in 
  def logout
    session.delete :user_id
    head :no_content 
  end 

  private

  # permitted parameters for a login or signup attempt
  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end 

  # conditional check: if the user does not exist, then the username is invalid
  # if the user exists with an invalid password, it will faith the authenticate
  # check and return a password error, since the user exists
  def render_login_errors(user)
    render json: { errors: user.nil? ? { "username": "Incorrect username" } : 
                                       { "password": "Incorrect password" } }, status: :unauthorized
  end 
  
end
