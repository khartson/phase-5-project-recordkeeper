class Api::UsersController < ApplicationController

  def index
    @pagy, @users = pagy(User.all)
    render json: {
      data: @users,
      **pagy_metadata(@pagy)
    }
  end 

  def show
    user = User.find_by(username: params[:id])
    if user
      render json: user
    else 
      render json: { errors: ["User not found"] }, status: :not_found
    end 
  end 

  def update
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

  def new_icon 
  end 

  def destroy
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
end
