class Managers::StampCardsController < Managers::BaseController
	before_action :set_stamp_card, only: [:show, :edit, :update, :destroy]

	# GET /stamp_cards
	# GET /stamp_cards.json
	def index
		@stamp_cards = StampCard.all
	end

	# GET /stamp_cards/1
	# GET /stamp_cards/1.json
	def show
	end

	# GET /stamp_cards/new
	def new
		@stamp_card = StampCard.new
	end

	# GET /stamp_cards/1/edit
	def edit
	end

	# POST /stamp_cards
	# POST /stamp_cards.json
	def create
		@stamp_card = StampCard.new(stamp_card_params)

		respond_to do |format|
			if @stamp_card.save
				format.html {redirect_to managers_stamp_cards_path, notice: 'スタンプカードを作成しました。'}
			else
				format.html {render :new}
			end
		end
	end

	# PATCH/PUT /stamp_cards/1
	# PATCH/PUT /stamp_cards/1.json
	def update
		respond_to do |format|
			if @stamp_card.update(stamp_card_params)
				format.html {redirect_to managers_stamp_cards_path, notice: 'スタンプカードを更新しました。'}
				format.json {render :show, status: :ok, location: @stamp_card}
			else
				format.html {render :edit}
				format.json {render json: @stamp_card.errors, status: :unprocessable_entity}
			end
		end
	end

	# DELETE /stamp_cards/1
	# DELETE /stamp_cards/1.json
	def destroy
		@stamp_card.destroy
		respond_to do |format|
			format.html {redirect_to managers_stamp_cards_url, notice: 'スタンプカードを削除しました。'}
			format.json {head :no_content}
		end
	end

	private

	# Use callbacks to share common setup or constraints between actions.
	def set_stamp_card
		@stamp_card = StampCard.find(params[:id])
	end

	# Never trust parameters from the scary internet, only allow the white list through.
	def stamp_card_params
		params.require(:stamp_card).permit(:name, :count, :description, :start_at, :end_at)
	end
end
