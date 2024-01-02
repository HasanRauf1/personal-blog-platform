class CreateGeneralSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :general_subscriptions do |t|
      t.boolean :subscribe_to_new_posts
      t.boolean :subscribe_to_all_comments
      t.boolean :subscribe_to_own_post_comments
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
