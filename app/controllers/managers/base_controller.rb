class Managers::BaseController < ApplicationController
	layout 'managers/application'

	before_action :authenticate_manager!

end