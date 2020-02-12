Rails.application.routes.draw do
	#
	# devise_scope :manager do
	# 	authenticated :manager do
	# 		root :to => 'stamp_card#index', as: :manager_authenticated_root
	# 	end
	# 	unauthenticated :manager do
	# 		root :to => 'users/sessions#new', as: :manager_unauthenticated_root
	# 	end
	# end
	#
	# devise_for :managers, controllers: {
	# 		sessions: 'managers/sessions',
	# 		passwords: 'managers/passwords',
	# 		registrations: 'managers/registrations',
	# 		confirmations: 'managers/confirmations'
	# }

	devise_scope :user do
		authenticated :user do
			root :to => 'users/stamp_card#index', as: :user_authenticated_root
		end
		unauthenticated :user do
			root :to => 'users/sessions#new', as: :user_unauthenticated_root
		end
	end

	devise_for :users, controllers: {
			sessions: 'users/sessions',
			passwords: 'users/passwords',
			registrations: 'users/registrations',
			confirmations: 'users/confirmations'
	}

	namespace :users do
		get 'stamp_card', to: 'stamp_card#index'
	end
end
