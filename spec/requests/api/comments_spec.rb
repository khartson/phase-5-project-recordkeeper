require 'swagger_helper'

RSpec.describe 'api/comments', type: :request, logged_in: true do

  path '/comments' do
    post('create comment') do
      tags 'Comments'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :comment, in: :body, schema: {
        type: :object,
        properties: {
          content: { type: :string },
          post_id: { type: :integer }
        },
        required: %w[content post_id]
      }

      let(:blog_post) { create(:post) }

      response(201, 'created') do
        schema '$ref' => '#/components/schemas/Comment'
        let(:comment) { { content: 'nice', post_id: blog_post.id } }
        run_test!
      end

      response(422, 'invalid post') do
        let(:comment) { { content: 'nice', post_id: 0 } }
        run_test!
      end
    end
  end


  path '/comments/{id}' do
    parameter name: :id, in: :path, type: :integer

    patch('update comment') do
      tags 'Comments'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :comment, in: :body, schema: {
        type: :object,
        properties: {
          content: { type: :string },
          user_id: { type: :integer }
        },
        required: %w[content user_id]
      }

      let(:existing_comment) { create(:comment, user: user) }
      let(:id) { existing_comment.id }
      let(:comment) { { content: 'edited', user_id: user.id } }

      response(200, 'updated') do
        schema '$ref' => '#/components/schemas/Comment'
        run_test! do
          expect(existing_comment.reload.content).to eq('edited')
        end
      end

      response(401, 'not the owner') do
        let(:comment) { { content: 'edited', user_id: user.id + 1 } }
        run_test!
      end

      response(404, 'comment not found') do
        let(:id) { 0 }
        run_test!
      end
    end
  end

end
