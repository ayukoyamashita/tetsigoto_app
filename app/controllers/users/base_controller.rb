class Users::BaseController < ApplicationController
	layout 'users/application'

	before_action :authenticate_user!
end