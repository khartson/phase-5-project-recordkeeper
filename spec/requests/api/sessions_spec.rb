require 'swagger_helper'

RSpec.describe 'api/sessions', type: :request do
  credentials_schema = {
    type: :object,
    properties: {
      user: {
        type: :object,
        properties: {
          username: { type: :string },
          password: { type: :string },
          password_confirmation: { type: :string }
        },
        required: %w[username password]
      }
    },
    required: %w[user]
  }

  path '/api/signup' do
    post('sign up') do
      tags 'Sessions'
      operationId 'signup'
      security []
      consumes 'application/json'
      produces 'application/json'
      parameter name: :credentials, in: :body, schema: credentials_schema

      let(:credentials) { { user: { username: 'newuser', password: 'secret', password_confirmation: 'secret' } } }

      response(201, 'created and logged in') do
        schema '$ref' => '#/components/schemas/User'
        run_test! do
          get '/api/me'
          expect(response).to have_http_status(:ok)
        end
      end

      response(422, 'invalid') do
        schema '$ref' => '#/components/schemas/ValidationError'
        before { create(:user, username: 'newuser') }
        run_test!
      end
    end
  end

  path '/api/login' do
    post('log in') do
      tags 'Sessions'
      operationId 'login'
      security []
      consumes 'application/json'
      produces 'application/json'
      parameter name: :credentials, in: :body, schema: credentials_schema

      let!(:existing_user) { create(:user, username: 'existing', password: 'password') }
      let(:credentials) { { user: { username: 'existing', password: 'password' } } }

      response(201, 'logged in') do
        schema '$ref' => '#/components/schemas/User'
        run_test! do
          get '/api/me'
          expect(response).to have_http_status(:ok)
        end
      end

      response(401, 'wrong username or password') do
        schema '$ref' => '#/components/schemas/ValidationError'
        let(:credentials) { { user: { username: 'existing', password: 'wrong' } } }
        run_test!
      end
    end
  end

  path '/api/me' do
    get('current user') do
      tags 'Sessions'
      operationId 'me'
      produces 'application/json'

      response(200, 'current user', logged_in: true) do
        schema '$ref' => '#/components/schemas/User'
        run_test!
      end

      response(401, 'not logged in') do
        schema '$ref' => '#/components/schemas/Error'
        run_test!
      end
    end
  end

  path '/api/logout' do
    delete('log out') do
      tags 'Sessions'
      operationId 'logout'

      response(204, 'logged out', logged_in: true) do
        run_test! do
          get '/api/me'
          expect(response).to have_http_status(:unauthorized)
        end
      end

      response(401, 'not logged in') do
        schema '$ref' => '#/components/schemas/Error'
        run_test!
      end
    end
  end
end
