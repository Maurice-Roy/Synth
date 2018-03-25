class AddFilterEnvelopePeakLevelToPatches < ActiveRecord::Migration[5.1]
  def change
    add_column :patches, :filter_envelope_peak_level, :float
  end
end
