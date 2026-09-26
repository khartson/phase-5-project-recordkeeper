RSpec.shared_context 'logged in' do
  let(:logged_in_user) { create(:user, password: 'password') }
  let(:user) { logged_in_user }
  before { post '/api/login', params: { user: { username: logged_in_user.username, password: 'password' } } }
end

RSpec.configure do |config|
  config.include_context 'logged in', :logged_in
end