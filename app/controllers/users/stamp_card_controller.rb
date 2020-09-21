class Users::StampCardController < Users::BaseController

	def index
		@active_stamp_cards = StampCard.active_cards.order(id: :desc)
		@old_stamp_cards = StampCard.old_cards.order(id: :desc)
	end

	def detail
		@stamp_card = StampCard.find(params[:stamp_card_id])
	end

	def stamp
		unless /^teshigoto_stamp_card_id=\d$/.match?(params[:qr_decode])
			render json: {message: 'QRコードの解析エラーです。'}, status: :unprocessable_entity
			return
		end
		stamp_card_id = /\d$/.match(params[:qr_decode]).to_s

		stamp_card = StampCard.where(id: stamp_card_id).first
		if stamp_card.blank?
			render json: {message: 'QRコードに紐づくスタンプカードが見つかりません。'}, status: :not_found
			return
		end

		if Time.zone.today < stamp_card.start_at
			render json: {message: "「#{stamp_card.name}」は開催前です。"}, status: :forbidden
			return
		end

		if stamp_card.end_at < Time.zone.today
			render json: {message: "「#{stamp_card.name}」は開催終了しました。"}, status: :forbidden
			return
		end

		if stamp_card.complete?(current_user.id)
			render json: {
					message: '全スタンプ取得済み',
					stamp_card_id: stamp_card_id,
					count: stamp_card.count,
					got_count: stamp_card.got_stamps(current_user.id).count,
					stamp_id: '',
			}, status: :ok
			return
		end

		stamp = Stamp.new
		stamp.user_id = current_user.id
		stamp.stamp_card_id = stamp_card.id
		if stamp.save
			render json: {
					message: 'success',
					stamp_card_id: stamp_card_id,
					count: stamp_card.count,
					got_count: stamp_card.got_stamps(current_user.id).count,
					stamp_id: stamp.id,
			}, status: :ok
		else
			render json: {message: stamp.errors}, status: :unprocessable_entity
		end
	end

	def my_stamps
		stamps = StampCard.find(params[:stamp_card_id]).got_stamps(current_user.id).order(:created_at)
		stamp_array = stamps.map do |stamp|
			{id: stamp.id, date: I18n.l(stamp.created_at.to_date, format: :short)}
		end
		render json: {stamps: stamp_array}, status: :ok
	end
end
