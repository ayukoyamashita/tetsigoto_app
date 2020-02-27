class StampCard < ApplicationRecord
	validates :name, presence: true
	validates :count, presence: true
	validates :description, presence: true
	validates :start_at, presence: true
	validates :end_at, presence: true

end
