class AddSportsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :sports, :text, array:true, default: []
  end
end
