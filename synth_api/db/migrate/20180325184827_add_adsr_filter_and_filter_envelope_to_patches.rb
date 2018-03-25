class AddAdsrFilterAndFilterEnvelopeToPatches < ActiveRecord::Migration[5.1]
  def change
    add_column :patches, :adsr_filter_frequency, :float
    add_column :patches, :adsr_filter_q, :float
    add_column :patches, :adsr_filter_type, :string
    add_column :patches, :filter_envelope_attack_time, :float
    add_column :patches, :filter_envelope_decay_time, :float
    add_column :patches, :filter_envelope_sustain_level, :float
    add_column :patches, :filter_envelope_release_time, :float
    add_column :patches, :filter_envelope_gate_time, :float
    add_column :patches, :filter_envelope_release_curve, :string
  end
end
