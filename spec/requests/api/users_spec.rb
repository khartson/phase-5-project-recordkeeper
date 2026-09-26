require 'swagger_helper'

RSpec.describe 'api/users', type: :request, logged_in: true do

  path '/api/users/{id}' do
    parameter name: :id, in: :path, type: :string,
              description: 'Username for GET; numeric user id for PATCH'

    get('show user') do
      tags 'Users'
      operationId 'getUser'
      produces 'application/json'

      let(:id) { user.username }

      response(200, 'user profile with posts') do
        schema '$ref' => '#/components/schemas/User'
        before do
          create(:post, author: user)
          create(:comment, user: user)
        end
        run_test!
      end

      response(404, 'user not found') do
        schema '$ref' => '#/components/schemas/Error'
        let(:id) { 'nobody-here' }
        run_test!
      end
    end

    patch('update user') do
      tags 'Users'
      operationId 'updateUser'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: { username: { type: :string } },
        required: %w[username]
      }

      let(:id) { user.id }
      let(:body) { { username: 'renamed' } }

      response(200, 'updated') do
        schema '$ref' => '#/components/schemas/User'
        run_test! do
          expect(user.reload.username).to eq('renamed')
        end
      end

      response(401, 'not your account') do
        schema '$ref' => '#/components/schemas/Error'
        let(:id) { create(:user).id }
        run_test!
      end

      response(422, 'username taken') do
        schema '$ref' => '#/components/schemas/ValidationError'
        let(:body) { { username: create(:user).username } }
        run_test!
      end
    end
  end

  path '/api/change_password' do
    patch('change password') do
      tags 'Users'
      operationId 'changePassword'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          password: {
            type: :object,
            properties: {
              old_password: { type: :string },
              change: {
                type: :object,
                properties: {
                  password: { type: :string },
                  password_confirmation: { type: :string }
                },
                required: %w[password password_confirmation]
              }
            },
            required: %w[old_password change]
          }
        },
        required: %w[password]
      }

      let(:body) do
        { password: { old_password: 'password', change: { password: 'newpass', password_confirmation: 'newpass' } } }
      end

      response(200, 'password changed') do
        schema '$ref' => '#/components/schemas/User'
        run_test! do
          expect(user.reload.authenticate('newpass')).to be_truthy
        end
      end

      response(401, 'incorrect current password') do
        schema '$ref' => '#/components/schemas/ValidationError'
        let(:body) do
          { password: { old_password: 'wrong', change: { password: 'newpass', password_confirmation: 'newpass' } } }
        end
        run_test!
      end

      response(422, 'confirmation mismatch') do
        schema '$ref' => '#/components/schemas/ValidationError'
        let(:body) do
          { password: { old_password: 'password', change: { password: 'newpass', password_confirmation: 'other' } } }
        end
        run_test!
      end
    end
  end

  path '/api/new_icon' do
    patch('generate new icon') do
      tags 'Users'
      operationId 'newIcon'
      produces 'application/json'

      response(200, 'new icon') do
        schema type: :object, properties: { icon: { type: :string } }, required: %w[icon]
        run_test!
      end
    end
  end

  path '/api/delete_account' do
    delete('delete account') do
      tags 'Users'
      operationId 'deleteAccount'
      consumes 'application/json'
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          user: {
            type: :object,
            properties: { password: { type: :string } },
            required: %w[password]
          }
        },
        required: %w[user]
      }

      let(:body) { { user: { password: 'password' } } }

      response(204, 'account deleted') do
        run_test! do
          expect(User.exists?(user.id)).to be(false)
        end
      end

      response(401, 'incorrect password') do
        schema '$ref' => '#/components/schemas/ValidationError'
        let(:body) { { user: { password: 'wrong' } } }
        run_test! do
          expect(User.exists?(user.id)).to be(true)
        end
      end
    end
  end
end
