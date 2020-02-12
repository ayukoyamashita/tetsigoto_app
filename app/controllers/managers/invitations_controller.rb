class Managers::InvitationsController < Devise::InvitationsController
	layout :resolve_layout

	private

	def resolve_layout
		if action_name == 'new' || action_name == 'create'
			'managers/application'
		else
			'managers/login'
		end
	end
end