class StampCard < ApplicationRecord
	has_many :stamps

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

	def active?
		self.start_at <= Time.zone.today && Time.zone.today <= self.end_at
	end

	def complete?(user_id)
		self.count <= got_stamps(user_id).count
	end

	def got_stamps(user_id)
		self.stamps.where(user_id: user_id)
	end

end
