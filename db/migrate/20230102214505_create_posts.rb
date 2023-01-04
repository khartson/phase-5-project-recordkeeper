class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :content
      t.boolean :embeddable
      t.string :link
      t.string :preview_image

      t.timestamps
    end
  end
end
