class Api::UsersController < ApplicationController

  before_action :current_user?, only: [:update]
  # def index
  #   @pagy, @users = pagy(User.all)
  #   render json: {
  #     data: @users,
  #     **pagy_metadata(@pagy)
  #   }
  # end 

  # find a user by username. opted to not use the 
  # find(:id) route simply because I prefer formatting
  # a profile with a username on the frontend, so 
  # there is a custom validtion should you route
  # to a resource that does not exist 
  def show
    user = User.find_by(username: params[:id])
    if user
      render json: user
    else 
      render json: { errors: ["User not found"] }, status: :not_found
    end 
  end 

  # the update action is verified by the before_action
  # current_user? from the base class, which checks if the session
  # user is trying to access their own resource
  # if not, we error out and never get to this block. Rather than reuse
  # the params[:id] field, using the @current_user instance variable for the 
  # session adds one extra layer of security when updating only your own resource
  # furthermore, validations will take care of any errors (such as taking someone
  # else's username) when you go to change the field
  def update
    @current_user.update!(user_params)
    render json: @current_user
  end 

  # okay, rails does NOT validate password change by default
  # because of the case of a password not being update with
  # another form field, perhaps where it is an empty field
  # handled validation on the frontend
  # https://gorails.com/episodes/rails-for-beginners-part-19-edit-password
  def change_password 
    user = User.find(@current_user.id)
    if user.authenticate(password_params[:old_password])
      user.update!(password_params[:change])
      return render json: user
    else 
      render json: { errors: { password: "Incorrect password" } }, status: :unauthorized
    end 
  end 

  # generates a new icon to display on the frontend
  def new_icon 
    @current_user.change_icon
    render json: { icon: @current_user.icon }
  end 

  def delete_account
    if @current_user.authenticate(deletion_params[:password])
      @current_user.destroy
      session[:user_id] = nil
      return head :no_content
    else 
      render json: { errors: { password: "Incorrect password"} },
                     status: :unauthorized
    end 
  end 

  private 

  def password_params
    params.require(:password).permit(:old_password, change: [:password, :password_confirmation])
  end 

  def user_params
    params.require(:user).permit(:username)
  end 

  def icon_params
    params.require(:icon).permit(:new)
  end 

  def deletion_params
    params.require(:user).permit(:password)
  end 


  # before action that verifies client user before 
  # hitting update routes, so that users cannot access
  # update endpoints for resources created by other users
  def current_user?
    render json: { errors: ["You cannot edit this resource"] }, 
           status: :unauthorized unless String(@current_user.id) == params[:id]
  end 

end
