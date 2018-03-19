class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.integer :synthroom_id
      t.text :content
      t.string :username
      t.timestamps
    end
  end
end
