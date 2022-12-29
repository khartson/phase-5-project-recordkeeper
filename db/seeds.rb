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
20.times do
  User.create!(
    username: Faker::Internet.username,
    password: Faker::Internet.password
  )
end 

p '✔️ Done.'

