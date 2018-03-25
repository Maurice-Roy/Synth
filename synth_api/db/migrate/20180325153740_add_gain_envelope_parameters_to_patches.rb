class AddGainEnvelopeParametersToPatches < ActiveRecord::Migration[5.1]
  def change
    add_column :patches, :gain_envelope_attack_time, :float
    add_column :patches, :gain_envelope_decay_time, :float
    add_column :patches, :gain_envelope_sustain_level, :float
    add_column :patches, :gain_envelope_release_time, :float
    add_column :patches, :gain_envelope_gate_time, :float
    add_column :patches, :gain_envelope_release_curve, :string
  end
end
