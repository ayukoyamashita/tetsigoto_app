Rails.application.routes.draw do

	devise_for :managers, controllers: {
			sessions: 'managers/sessions',
			passwords: 'managers/passwords',
			registrations: 'managers/registrations',
			invitations: 'managers/invitations'
	}

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

	namespace :managers do
		get '/', to: 'index#index'
	end

	namespace :users do
		get 'stamp_card', to: 'stamp_card#index'
	end
end
