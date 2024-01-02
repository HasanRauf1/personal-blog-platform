class CreateSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :specific_subscriptions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :subscribable, polymorphic: true, null: false

      t.timestamps
    end
    add_index :specific_subscriptions, [:user_id, :subscribable_type, :subscribable_id], name: 'index_specific_subscriptions_on_user_and_subscribable'
  end
end
