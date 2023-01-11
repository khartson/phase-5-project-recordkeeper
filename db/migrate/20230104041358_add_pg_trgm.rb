class AddPgTrgm < ActiveRecord::Migration[6.1]
  def change
    enable_extension('pg_trgm') unless extensions.include?('pg_trgm')
  end
end
