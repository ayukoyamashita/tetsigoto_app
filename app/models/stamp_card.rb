class StampCard < ApplicationRecord
	validates :name, presence: true
	validates :count, presence: true, numericality: { only_integer: true }
	validates :description, presence: true
	validates :start_at, presence: true
	validates :end_at, presence: true

	validates_date :start_at, allow_blank: true
	validates_date :end_at, allow_blank: true
end
