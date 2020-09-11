class StampCard < ApplicationRecord
	validates :name, presence: true
	validates :count, presence: true, numericality: { only_integer: true }
	validates :description, presence: true
	validates :start_at, presence: true
	validates :end_at, presence: true

	validates_date :start_at, allow_blank: true
	validates_date :end_at, allow_blank: true

	def self.active_cards
		self.where('start_at <= ?', Time.zone.now.to_date).where('? <= end_at', Time.zone.now.to_date)
	end

	def self.old_cards
		self.where('end_at < ?', Time.zone.now.to_date)
	end
end
