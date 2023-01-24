class ApplicationController < ActionController::API
  include ActionController::Cookies
  include Pagy::Backend 
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  
  before_action :authorize
  before_action :current_user?, only: [:update]

  private

  # before action that verifies client user before 
  # hitting update routes, so that users cannot access
  # update endpoints for resources created by other users
  def current_user?
    key = controller_name.classify.downcase.to_sym
    render json: { errors: ["You cannot edit this resource"] },
           status: :unauthorized unless @current_user.id == Integer(params[key][:user_id])
  end 
  
  # before action that ensures a user is logged in via client
  # with cookies, if not deny client access to resource endpoints
  # overridden for endpoints such as signup and login, where 
  # authorization is not required
  def authorize
    @current_user = User.find_by(id: session[:user_id])
    
    render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  end 

  # return a hash with a key value pair of the error field,
  # as well as the error message. Rather than rendering an array
  # of errors in json, this makes accessing the specific attribute
  # causing the error much more specific on the frontend for 
  # form validation
  def render_unprocessable_entity_response(invalid)
    render json: { errors: Hash[invalid.record.errors.collect { | e | [ e.attribute, e.full_message ]}] }, status: :unprocessable_entity
  end 

  # boilerplate not found response, rescues from ActiveRecord
  # find() method, ex: { errors: ["User not found"]}
  def render_not_found_response(invalid)
    render json: { errors: ["#{invalid.model} not found"] }, status: :not_found 
  end

end
