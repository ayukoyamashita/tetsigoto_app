module StampCardDecorator

	def status_string
		if Time.zone.now.to_date < start_at
			'開催前'
		elsif end_at < Time.zone.now.to_date
			'終了'
		else
			'開催中'
		end
	end

end
