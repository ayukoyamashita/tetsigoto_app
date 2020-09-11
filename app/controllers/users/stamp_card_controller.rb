class Users::StampCardController < Users::BaseController

	def index
		@active_stamp_cards = StampCard.active_cards.order(id: :desc)
		@old_stamp_cards = StampCard.old_cards.order(id: :desc)
	end

	def detail
		@stamp_card = StampCard.find(params[:stamp_card_id])
		@stamps = Stamp.where(user_id: current_user.id, stamp_card_id: params[:stamp_card_id]).order(:id)
	end

	def stamp
		stamp_card = StampCard.find(params[:stamp_card_id])
		stamp = Stamp.new
		stamp.user_id = current_user.id
		stamp.stamp_card_id = stamp_card.id
		respond_to do |format|
			if stamp.save
				format.json {render :show, status: :ok}
			else
				format.json {render json: stamp.errors, status: :unprocessable_entity}
			end
		end
	end
end
