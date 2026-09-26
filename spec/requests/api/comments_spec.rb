require 'swagger_helper'

RSpec.describe 'api/comments', type: :request, logged_in: true do

  path '/api/comments' do
    post('create comment') do
      tags 'Comments'
      operationId 'createComment'
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


  path '/api/comments/{id}' do
    parameter name: :id, in: :path, type: :integer

    let(:existing_comment) { create(:comment, user: user) }
    let(:id) { existing_comment.id }

    patch('update comment') do
      tags 'Comments'
      operationId 'updateComment'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :comment, in: :body, schema: {
        type: :object,
        properties: {
          content: { type: :string }
        },
        required: %w[content]
      }

      let(:comment) { { content: 'edited' } }

      response(200, 'updated') do
        schema '$ref' => '#/components/schemas/Comment'
        run_test! do
          expect(existing_comment.reload.content).to eq('edited')
        end
      end

      response(403, 'not the owner') do
        let(:existing_comment) { create(:comment) }
        run_test! do
          expect(existing_comment.reload.content).not_to eq('edited')
        end
      end

      response(404, 'comment not found') do
        let(:id) { 0 }
        run_test!
      end
    end

    delete('delete comment') do
      tags 'Comments'
      operationId 'deleteComment'
      produces 'application/json'

      response(204, 'no content') do
        run_test! do
          expect(Comment.exists?(existing_comment.id)).to be(false)
        end
      end

      response(403, 'not the owner') do
        let(:existing_comment) { create(:comment) }
        run_test! do
          expect(Comment.exists?(existing_comment.id)).to be(true)
        end
      end

      response(404, 'comment not found') do
        let(:id) { 0 }
        run_test!
      end
    end
  end

end
