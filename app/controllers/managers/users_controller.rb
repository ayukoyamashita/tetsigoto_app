class Managers::UsersController < Managers::BaseController
  before_action :set_user, only: [:show]

  # GET /users
  # GET /users.json
  def index
    @users = User.all.order(:id)
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.fetch(:user, {})
    end
end
