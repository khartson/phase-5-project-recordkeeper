# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
p '🌱 Seeding...'
# kyle = User.create!(username: 'khartson2017', password: 'hello')
# seth = User.create!(username: 'smassarsky', password: 'password')
# 20.times do
#   User.create!(
#     username: Faker::Internet.username,
#     password: Faker::Internet.password
#   )
# end 
# tags = Tag.create!([{ name: 'JavaScript' }, { name: "Ruby"},
#                     { name: 'C++        '}, { name: 'Python'},
#                     { name: 'React'      }, { name: 'Rails'}
#                   ])

# youtube_posts = Array.new(20) { | i | { 
#                                         title: Faker::Lorem.paragraph_by_chars(number: 15),
#                                         content: Faker::Lorem.paragraph_by_chars(number: 120),
#                                         embeddable: true,
#                                         link: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
#                                         preview_image: Faker::Placeholdit.image(background_color: :random),
#                                         user_id: Faker::Number.between(from: 1, to: 22)
#                                 } }
# Post.create!(youtube_posts)

# vimeo_posts = Array.new(20) { | i | { 
#                                         title: Faker::Lorem.paragraph_by_chars(number: 15),
#                                         content: Faker::Lorem.paragraph_by_chars(number: 120),
#                                         embeddable: true,
#                                         link: 'https://vimeo.com/253989945',
#                                         preview_image: Faker::Placeholdit.image(background_color: :random),
#                                         user_id: Faker::Number.between(from: 1, to: 22)
#                                 } }

# Post.create!(vimeo_posts)

# gist_posts = Array.new(20) { | i | { 
#                                         title: Faker::Lorem.paragraph_by_chars(number: 15),
#                                         content: Faker::Lorem.paragraph_by_chars(number: 120),
#                                         embeddable: true,
#                                         link: 'https://gist.github.com/bsimpson/4088286https://www.youtube.com/watch?v=ScMzIvxBSi4',
#                                         preview_image: Faker::Placeholdit.image(background_color: :random),
#                                         user_id: Faker::Number.between(from: 1, to: 22)
#                                 } }
# Post.create!(gist_posts) 

# non_embed_posts = Array.new(20) { | i | { 
#                                         title: Faker::Lorem.paragraph_by_chars(number: 15),
#                                         content: Faker::Lorem.paragraph_by_chars(number: 120),
#                                         embeddable: false,
#                                         link: Faker::Internet.url,
#                                         preview_image: Faker::Placeholdit.image(background_color: :random),
#                                         user_id: Faker::Number.between(from: 1, to: 22)
#                                 } }
# Post.create!(non_embed_posts)


# tags = Array.new(30) { | i | { name: Faker::ProgrammingLanguage.name } }

# Tag.create(tags)

# Tag.all.each do | t | t.posts << Array.new(3) { | p | Post.find(Faker::Number.between(from: 1, to: 60)) } end 

# kyle_posts = Array.new(20) { | i | { title: Faker::Lorem.paragraph_by_chars(number: 20),
#                                      content: Faker::Lorem.paragraph_by_chars(number: 180),
#                                      embeddable: true,
#                                      link: 'https://www.youtube.com/watch?v=wBu7zPctus4',
#                                      preview_image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
#                                      user_id: 1 
#                             }}
# Post.create!(kyle_posts);

p '✔️ Done.'

