# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180325205505) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "messages", force: :cascade do |t|
    t.integer "synthroom_id"
    t.text "content"
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "patches", force: :cascade do |t|
    t.string "name"
    t.string "selected_waveform"
    t.float "master_gain"
    t.integer "current_octave"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "oscillator_gain_node_value"
    t.float "filter_frequency"
    t.float "filter_q"
    t.string "filter_type"
    t.float "gain_envelope_attack_time"
    t.float "gain_envelope_decay_time"
    t.float "gain_envelope_sustain_level"
    t.float "gain_envelope_release_time"
    t.float "gain_envelope_gate_time"
    t.string "gain_envelope_release_curve"
    t.float "adsr_filter_frequency"
    t.float "adsr_filter_q"
    t.string "adsr_filter_type"
    t.float "filter_envelope_attack_time"
    t.float "filter_envelope_decay_time"
    t.float "filter_envelope_sustain_level"
    t.float "filter_envelope_release_time"
    t.float "filter_envelope_gate_time"
    t.string "filter_envelope_release_curve"
    t.float "filter_envelope_peak_level"
  end

  create_table "synthrooms", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
