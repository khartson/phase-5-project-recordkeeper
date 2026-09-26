require 'swagger_helper'

RSpec.describe 'api/posts', type: :request, logged_in: true do
  # `post` is the request helper, so avoid naming lets `post`
  let(:valid_body) do
    {
      title: 'A title long enough',
      content: 'Some content that is long enough to pass validation',
      link: 'https://example.com/album',
      preview_image: 'https://example.com/cover.jpg',
      embeddable: false,
      tags: %w[jazz vinyl]
    }
  end

  path '/posts' do
    post('create post') do
      tags 'Posts'
      operationId 'createPost'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          title: { type: :string, minLength: 10, maxLength: 60 },
          content: { type: :string, minLength: 20, maxLength: 250 },
          link: { type: :string },
          preview_image: { type: :string },
          embeddable: { type: :boolean },
          tags: { type: :array, items: { type: :string }, maxItems: 3, description: 'Tag names; created if new' }
        },
        required: %w[title content link preview_image]
      }

      let(:body) { valid_body }

      response(201, 'created') do
        schema '$ref' => '#/components/schemas/Post'
        run_test! do
          created = Post.last
          expect(created.author).to eq(user)
          expect(created.tags.pluck(:name)).to match_array(%w[jazz vinyl])
        end
      end

      response(422, 'invalid') do
        schema '$ref' => '#/components/schemas/ValidationError'
        let(:body) { valid_body.merge(title: 'short') }
        run_test!
      end
    end
  end

  path '/posts/{id}' do
    parameter name: :id, in: :path, type: :integer

    let(:blog_post) { create(:post, author: user) }
    let(:id) { blog_post.id }

    get('show post') do
      tags 'Posts'
      operationId 'getPost'
      produces 'application/json'

      response(200, 'post with comments') do
        schema '$ref' => '#/components/schemas/Post'
        before { create(:comment, post: blog_post) }
        run_test!
      end

      response(404, 'post not found') do
        schema '$ref' => '#/components/schemas/Error'
        let(:id) { 0 }
        run_test!
      end
    end

    patch('update post') do
      tags 'Posts'
      operationId 'updatePost'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          title: { type: :string, minLength: 10, maxLength: 60 },
          content: { type: :string, minLength: 20, maxLength: 250 }
        },
        required: %w[title content]
      }

      let(:body) { { title: 'An updated title', content: 'Updated content that is long enough' } }

      response(200, 'updated') do
        schema '$ref' => '#/components/schemas/Post'
        run_test! do
          expect(blog_post.reload.title).to eq('An updated title')
        end
      end

      response(403, 'not the owner') do
        schema '$ref' => '#/components/schemas/Error'
        let(:blog_post) { create(:post) }
        run_test!
      end

      response(404, 'post not found') do
        schema '$ref' => '#/components/schemas/Error'
        let(:id) { 0 }
        run_test!
      end

      response(422, 'invalid') do
        schema '$ref' => '#/components/schemas/ValidationError'
        let(:body) { { title: 'short', content: 'Updated content that is long enough' } }
        run_test!
      end
    end

    delete('delete post') do
      tags 'Posts'
      operationId 'deletePost'

      response(204, 'deleted') do
        run_test! do
          expect(Post.exists?(blog_post.id)).to be(false)
        end
      end

      response(403, 'not the owner') do
        schema '$ref' => '#/components/schemas/Error'
        let(:blog_post) { create(:post) }
        run_test! do
          expect(Post.exists?(blog_post.id)).to be(true)
        end
      end

      response(404, 'post not found') do
        schema '$ref' => '#/components/schemas/Error'
        let(:id) { 0 }
        run_test!
      end
    end
  end
end
