require 'swagger_helper'

RSpec.describe 'api/feed', type: :request do
  # not using :logged_in, since its `user` let would be sent as the `user` query param
  let(:viewer) { create(:user, password: 'password') }
  before { post '/login', params: { user: { username: viewer.username, password: 'password' } } }

  path '/posts' do
    get('posts feed') do
      tags 'Feed'
      operationId 'getFeedPosts'
      produces 'application/json'
      description 'Paginated posts (20 per page), optionally filtered by author id and/or tag ids.'
      parameter name: :user, in: :query, type: :integer, required: false, description: 'Author user id'
      parameter name: 'tags[]', in: :query, required: false, description: 'Tag ids',
                schema: { type: :array, items: { type: :integer } }, style: :form, explode: true
      parameter name: :page, in: :query, type: :integer, required: false

      let!(:author) { create(:user) }
      let!(:tagged_post) { create(:post, author: author, tags: [Tag.create!(name: 'jazz')]) }
      let!(:other_post) { create(:post) }

      response(200, 'page of posts') do
        schema '$ref' => '#/components/schemas/FeedPostPage'

        context 'unfiltered' do
          run_test! do
            body = JSON.parse(response.body)
            expect(body['data'].size).to eq(2)
            expect(body['meta']['page']).to eq(1)
          end
        end

        context 'filtered by author' do
          let(:user) { author.id }

          run_test! do
            expect(JSON.parse(response.body)['data'].map { |p| p['id'] }).to eq([tagged_post.id])
          end
        end

        context 'filtered by tag' do
          let(:'tags[]') { [tagged_post.tags.first.id] }

          run_test! do
            expect(JSON.parse(response.body)['data'].map { |p| p['id'] }).to eq([tagged_post.id])
          end
        end
      end
    end
  end

  path '/users' do
    get('random users') do
      tags 'Feed'
      operationId 'getFeedUsers'
      produces 'application/json'
      description 'Up to 10 random users.'

      response(200, 'users') do
        schema type: :array, items: { '$ref' => '#/components/schemas/UserSummary' }
        before { create_list(:user, 2) }
        run_test!
      end
    end
  end

  path '/tags' do
    get('all tags') do
      tags 'Feed'
      operationId 'getTags'
      produces 'application/json'

      response(200, 'tags') do
        schema type: :array, items: { '$ref' => '#/components/schemas/Tag' }
        before { Tag.create!(name: 'jazz') }
        run_test!
      end
    end
  end
end
