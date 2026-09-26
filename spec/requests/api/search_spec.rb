require 'swagger_helper'

RSpec.describe 'api/search', type: :request do
  # not using :logged_in, since its `user` let would be sent as the `user` query param
  let(:searcher) { create(:user, password: 'password') }
  before { post '/login', params: { user: { username: searcher.username, password: 'password' } } }

  path '/api/search' do
    get('search users or tags') do
      tags 'Search'
      operationId 'search'
      produces 'application/json'
      description 'Pass exactly one of `user` (fuzzy username match, paginated) or `tag` (substring match).'
      parameter name: :user, in: :query, type: :string, required: false
      parameter name: :tag, in: :query, type: :string, required: false
      parameter name: :page, in: :query, type: :integer, required: false

      response(200, 'matching users or tags') do
        schema oneOf: [
          {
            type: :object,
            properties: {
              data: { type: :array, items: { '$ref' => '#/components/schemas/UserSummary' } },
              meta: { '$ref' => '#/components/schemas/PaginationMeta' }
            },
            required: %w[data meta]
          },
          {
            type: :object,
            properties: {
              data: { type: :array, items: { '$ref' => '#/components/schemas/Tag' } }
            },
            required: %w[data]
          }
        ]

        context 'by user' do
          let(:user) { 'recordcollect' }
          before { create(:user, username: 'recordcollector') }

          run_test! do
            body = JSON.parse(response.body)
            expect(body['data'].map { |u| u['username'] }).to include('recordcollector')
            expect(body['meta']).to include('page' => 1)
          end
        end

        context 'by tag' do
          let(:tag) { 'jaz' }
          before { Tag.create!(name: 'jazz') }

          run_test! do
            expect(JSON.parse(response.body)['data'].map { |t| t['name'] }).to eq(['jazz'])
          end
        end
      end

      response(400, 'no query given') do
        schema '$ref' => '#/components/schemas/Error'
        run_test!
      end
    end
  end
end
