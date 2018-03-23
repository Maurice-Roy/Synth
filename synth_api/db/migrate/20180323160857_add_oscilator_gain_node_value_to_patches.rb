class AddOscilatorGainNodeValueToPatches < ActiveRecord::Migration[5.1]
  def change
    add_column :patches, :oscillator_gain_node_value, :float
  end
end
