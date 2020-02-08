Rails.application.routes.draw do
	root 'index#index'

	devise_for :users, controllers: {
			sessions: 'users/sessions',
			passwords: 'users/passwords',
			registrations: 'users/registrations',
			confirmations: 'users/confirmations'
	}

	get 'stamp_card', to: 'stamp_card#index'
end
