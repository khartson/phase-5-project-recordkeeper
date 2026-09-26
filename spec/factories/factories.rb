FactoryBot.define do
  factory :user do
    sequence(:username) { |n| "#{Faker::Internet.username(specifier: 5..10)}#{n}" }
    password { 'password' }
  end

  factory :post do
    association :author, factory: :user
    title { Faker::Lorem.characters(number: 20) }
    content { Faker::Lorem.characters(number: 50) }
    link { Faker::Internet.url }
    preview_image { Faker::Internet.url }
    embeddable { false }
  end

  factory :comment do
    association :user
    association :post
    content { Faker::Lorem.sentence }
  end
end
