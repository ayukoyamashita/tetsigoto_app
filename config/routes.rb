Rails.application.routes.draw do
	root 'index#index'

	devise_for :users

	get 'stamp_card', to: 'stamp_card#index'
end
