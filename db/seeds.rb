# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Sport.destroy_all

Sport.create(name: 'Walk');
Sport.create(name: 'Run');
Sport.create(name: 'Cycle');
Sport.create(name: 'Tennis');
Sport.create(name: 'Squash');
Sport.create(name: 'Shoot');
Sport.create(name: 'PingPong');
