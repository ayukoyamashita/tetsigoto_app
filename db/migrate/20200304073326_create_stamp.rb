class CreateStamp < ActiveRecord::Migration[6.0]
  def change
    create_table :stamps do |t|
      t.references :user, foreign_key: true
      t.references :stamp_card, foreign_key: true
      t.timestamps
    end
  end
end
