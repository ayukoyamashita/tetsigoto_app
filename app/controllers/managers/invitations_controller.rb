class Managers::InvitationsController < Devise::InvitationsController
	layout :resolve_layout

	def create
		super
		redirect_to new_manager_invitation_path
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