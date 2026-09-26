# frozen_string_literal: true

require 'rails_helper'

RSpec.configure do |config|
  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.openapi_root = Rails.root.join('swagger').to_s

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:swaggerize' rake task, the complete Swagger will
  # be generated at the provided relative path under openapi_root
  # By default, the operations defined in spec files are added to the first
  # document below. You can override this behavior by adding a openapi_spec tag to the
  # the root example_group in your specs, e.g. describe '...', openapi_spec: 'v2/swagger.json'
  config.openapi_specs = {
    'v1/swagger.yaml' => {
      openapi: '3.0.1',
      info: {
        title: 'Recordkeeper API',
        version: 'v1'
      },
      paths: {},
      servers: [
        { url: 'http://localhost:3000', description: 'Local' }
      ],
      security: [{ cookie_auth: [] }],
      components: {
        securitySchemes: {
          cookie_auth: { type: :apiKey, in: :cookie, name: '_session_id' }
        },
        schemas: {
          Error: {
            type: :object,
            properties: {
              errors: { type: :array, items: { type: :string } }
            },
            required: %w[errors]
          },
          ValidationError: {
            type: :object,
            properties: {
              errors: { type: :object, additionalProperties: { type: :string } }
            },
            required: %w[errors]
          },
          UserSummary: {
            type: :object,
            properties: {
              id: { type: :integer },
              username: { type: :string },
              icon: { type: :string, nullable: true }
            },
            required: %w[id username]
          },
          Tag: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string }
            },
            required: %w[id name]
          },
          FeedPost: {
            type: :object,
            properties: {
              id: { type: :integer },
              title: { type: :string },
              preview_image: { type: :string },
              summary: { type: :string },
              tags: { type: :array, items: { '$ref' => '#/components/schemas/Tag' } },
              author: { '$ref' => '#/components/schemas/UserSummary' },
              commenters: { type: :array, items: { '$ref' => '#/components/schemas/UserSummary' } }
            },
            required: %w[id title preview_image summary]
          },
          Post: {
            type: :object,
            properties: {
              id: { type: :integer },
              title: { type: :string },
              content: { type: :string },
              embeddable: { type: :boolean, nullable: true },
              link: { type: :string },
              preview_image: { type: :string },
              created_at: { type: :string, format: 'date-time' },
              tags: { type: :array, items: { '$ref' => '#/components/schemas/Tag' } },
              comments: { type: :array, items: { '$ref' => '#/components/schemas/Comment' } },
              author: { '$ref' => '#/components/schemas/UserSummary' },
              commenters: { type: :array, items: { '$ref' => '#/components/schemas/UserSummary' } }
            },
            required: %w[id title content link preview_image created_at]
          },
          User: {
            type: :object,
            properties: {
              id: { type: :integer },
              username: { type: :string },
              icon: { type: :string, nullable: true },
              created_at: { type: :string, format: 'date-time' },
              posts: { type: :array, items: { '$ref' => '#/components/schemas/FeedPost' } },
              commented_posts: { type: :array, items: { '$ref' => '#/components/schemas/FeedPost' } }
            },
            required: %w[id username created_at]
          },
          Comment: {
            type: :object,
            properties: {
              id: { type: :integer },
              content: { type: :string },
              created_at: { type: :string, format: 'date-time' },
              user: { '$ref' => '#/components/schemas/UserSummary' }
            },
            required: %w[id content created_at user]
          },
          PaginationMeta: {
            type: :object,
            properties: {
              scaffold_url: { type: :string },
              prev: { type: :integer, nullable: true },
              page: { type: :integer },
              next: { type: :integer, nullable: true },
              last: { type: :integer }
            },
            required: %w[page last]
          },
          FeedPostPage: {
            type: :object,
            properties: {
              data: { type: :array, items: { '$ref' => '#/components/schemas/FeedPost' } },
              meta: { '$ref' => '#/components/schemas/PaginationMeta' }
            },
            required: %w[data meta]
          }
        }
      }
    }
  }

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The openapi_specs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.openapi_format = :yaml
end
