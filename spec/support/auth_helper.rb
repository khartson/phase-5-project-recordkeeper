RSpec.shared_context 'logged in' do
  let(:user) { create(:user, password: 'password') }
  before { post '/login', params: { user: { username: user.username, password: 'password' } } }
end

RSpec.configure do |config|
  config.include_context 'logged in', :logged_in
end