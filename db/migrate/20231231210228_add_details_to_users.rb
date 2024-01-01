class AddDetailsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :name, :string, before: :email
    add_column :users, :phone_number, :string, before: :email
  end
end
