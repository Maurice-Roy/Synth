class CreatePatches < ActiveRecord::Migration[5.1]
  def change
    create_table :patches do |t|
      t.string :name
      t.string :selected_waveform
      t.float :master_gain
      t.integer :current_octave

      t.timestamps
    end
  end
end
