class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  
  before_action :authorize

  private
  
  def authorize
    @current_user = User.find_by(id: session[:user_id])
    
    render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  end 

  def render_unprocessable_entity_response(invalid)
    # render json: { errors: invalid.record.errors.collect { | e | { e.attribute => e.full_message }} }, status: :unprocessable_entity
    render json: { errors: invalid.record.errors.full_messages }
  end 

  def render_not_found_response(invalid)
    render json: { errors: ["#{invalid.model} not found"] }, status: :not_found 
  end

end
