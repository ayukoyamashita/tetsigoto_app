Rails.application.routes.draw do

	devise_scope :user do
		authenticated :user do
			root :to => 'stamp_card#index', as: :authenticated_root
		end
		unauthenticated :user do
			root :to => 'users/sessions#new', as: :unauthenticated_root
		end
	end

	devise_for :users, controllers: {
			sessions: 'users/sessions',
			passwords: 'users/passwords',
			registrations: 'users/registrations',
			confirmations: 'users/confirmations'
	}

	get 'stamp_card', to: 'stamp_card#index'
end
