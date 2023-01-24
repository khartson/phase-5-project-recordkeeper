# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
p '🌱 Seeding...'
kyle = User.create!(username: 'khartson2017', password: 'hello')
seth = User.create!(username: 'smassarsky', password: 'password')

users = Array.new(35) { | user | 
  {
    username: Faker::Internet.username,
    password: Faker::Internet.password
  }
}

User.create!(users)

tags = Array.new(20) { | tag | 
  {
    name: Faker::ProgrammingLanguage.name
  } 
} 

Tag.create!(tags)

embed_links = [
  'https://soundcloud.com/completedeveloperpodcast/cdp-episode0013-why-developers-hate-distractions?si=882d703be04d48daa31bed46e280d6da&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
  'https://www.youtube.com/watch?v=fsG1XaZEa78',
  'https://www.youtube.com/watch?v=8czTg7Jw8No',
  'https://gist.github.com/rails/264500',
  'https://gist.github.com/rails/267595'
]

embed = Array.new(40) { | post | 
  {
    title: Faker::Lorem.paragraph_by_chars(number: 15),
    content: Faker::Lorem.paragraph_by_chars(number: 120),
    embeddable: true,
    link: embed_links[Faker::Number.between(from: 0, to: 4)],
    preview_image: 'https://images.unsplash.com/photo-1514428631868-a400b561ff44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    user_id: Faker::Number.between(from: 1, to: 35)
  }
}

Post.create!(embed)

non_embed_links = [
  'https://api.rubyonrails.org/classes/ActiveRecord/RecordNotFound.html',
  'https://docs.djangoproject.com/en/4.1/',
  'https://react.semantic-ui.com',
  'https://reactjs.org/docs/getting-started.html',
  'https://medium.com/@khartson2017/build-smarter-search-results-in-react-and-rails-with-fuzzy-search-and-debouncing-part-one-rails-7e48996fdfbd'
]

non_embed = Array.new(40) { | post | 
  {
    title: Faker::Lorem.paragraph_by_chars(number: 15),
    content: Faker::Lorem.paragraph_by_chars(number: 120),
    embeddable: true,
    link: non_embed_links[Faker::Number.between(from: 0, to: 4)],
    preview_image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80',
    user_id: Faker::Number.between(from: 1, to: 35)
  }
}

Post.create!(non_embed)

comments = Array.new(90) { | comment | 
  {
    content: Faker::Lorem.paragraph_by_chars(number: 30),
    user_id: Faker::Number.between(from: 1, to: 35),
    post_id: Faker::Number.between(from: 1, to: 80)
  }
}

Comment.create!(comments)

Post.all.each do | p | 
 p.tags = Tag.all.sample(3)
end 

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
#                                         link: 'https://gist.github.com/bsimpson/4088286',
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

# # Tag.all.each do | t | t.posts << Array.new(3) { | p | Post.find(Faker::Number.between(from: 1, to: 60)) } end 

# kyle_posts = Array.new(20) { | i | { title: Faker::Lorem.paragraph_by_chars(number: 20),
#                                      content: Faker::Lorem.paragraph_by_chars(number: 180),
#                                      embeddable: true,
#                                      link: 'https://www.youtube.com/watch?v=wBu7zPctus4',
#                                      preview_image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
#                                      user_id: 1 
#                             }}
# Post.create!(kyle_posts);

# Post.all.each do | p | 
#  p.tags = Tag.all.sample(3)
# end 

p '✔️ Done.'

