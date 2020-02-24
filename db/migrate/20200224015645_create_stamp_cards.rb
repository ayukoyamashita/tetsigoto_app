class CreateStampCards < ActiveRecord::Migration[6.0]
  def change
    create_table :stamp_cards do |t|
      t.string :name
      t.integer :count
      t.text :description
      t.date :start_at
      t.date :end_at

      t.timestamps
    end
  end
end
