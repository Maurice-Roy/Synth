class AddFilterParametersToPatches < ActiveRecord::Migration[5.1]
  def change
    add_column :patches, :filter_frequency, :float
    add_column :patches, :filter_q, :float
    add_column :patches, :filter_type, :string
  end
end
