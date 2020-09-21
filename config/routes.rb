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
		resources :stamp_cards
		resources :users, :only => [:index, :show]
		resources :managers, :only => [:index, :show, :destroy]
	end

	namespace :users do
		get 'stamp_cards', to: 'stamp_card#index'
		get 'stamp_card/:stamp_card_id', to: 'stamp_card#detail', as: 'stamp_card'
		get 'stamp_card/:stamp_card_id/my_stamps', to: 'stamp_card#my_stamps', as: 'stamp_card_my_stamps'
		post 'stamp_card/stamp', to: 'stamp_card#stamp', as: 'stamp_card_stamp'
	end
end
