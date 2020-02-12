class Managers::InvitationsController < Devise::InvitationsController
	layout :resolve_layout

	def after_invite_path_for(inviter, invitee)
		managers_path
	end

	def after_accept_path_for(resource)
		managers_path
	end

	private

	def resolve_layout
		if action_name == 'new' || action_name == 'create'
			'managers/application'
		else
			'managers/login'
		end
	end
end