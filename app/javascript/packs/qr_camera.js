import {StampCard} from "./stamp_card";

document.addEventListener('turbolinks:load', () => {
	let qrCamera = new QrCamera();
	if (qrCamera.camera) {
		qrCamera.camera.onchange = () => qrCamera.openQRCamera();
		qrCamera.camera.onclick = () => qrCamera.resetCanvas();
		qrCamera.qrReadedDialogLink.onclick = () => qrCamera.linkToStampCard();
		qrCamera.qrReadedDialogClose.forEach(close => {
			close.onclick = () => qrCamera.hideQrDialog();
		});
	}
});

class QrCamera {

	constructor() {
		this.stampCard = new StampCard();
		this.camera = document.querySelector('input[data-camera]');
		this.canvas = document.querySelector("[data-qr-result] canvas");
		this.loading = document.querySelector('[data-qr-result] .el_loading');
		this.fail = document.querySelector('[data-qr-result] .el_fail');
		this.message = document.querySelector('[data-qr-result] .el_message');
		this.success = document.querySelector('[data-qr-result] .el_success');
		this.qrReadedDialog = document.querySelector('.qrReadedDialog');
		this.qrReadedDialogLink = document.querySelector('.qrReadedDialog .el_link');
		this.qrReadedDialogClose = document.querySelectorAll('.qrReadedDialog .el_close');

		if (this.canvas) {
			this.ctx = this.canvas.getContext("2d");
		}
	}

	openQRCamera() {
		let reader = new FileReader();
		let image = new Image();
		reader.onload = (evt) => {
			image.onload = () => {
				let {width, height} = this.getThumbnailSize(image);
				this.canvas.setAttribute("width", width);
				this.canvas.setAttribute("height", height);

				// カメラの映像をCanvasに複写
				this.ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);

				// QRコード読み取り
				const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
				const code = jsQR(imageData.data, this.canvas.width, this.canvas.height);

				this.qrReadedDialog.classList.add('is-show');
				if (code == null) {
					this.loading.classList.add('is-hide');
					this.message.innerText = '写真内にQRコードが見つかりません。';
					this.fail.classList.add('is-show');
				} else {
					StampCard.postStamp(this.stampCard, code.data);
				}
			};
			image.src = evt.target.result;
		};
		reader.readAsDataURL(this.camera.files[0]);
	}

	resetCanvas() {
		this.fail.classList.remove('is-show');
		this.success.classList.remove('is-show');
	}

	getThumbnailSize(image) {
		const THUMBNAIL_WIDTH = 500; // 画像リサイズ後の横の長さの最大値
		const THUMBNAIL_HEIGHT = 500; // 画像リサイズ後の縦の長さの最大値

		let w, h;
		if (image.width > image.height) {
			// 横長の画像は横のサイズを指定値にあわせる
			let ratio = image.height / image.width;
			w = THUMBNAIL_WIDTH;
			h = THUMBNAIL_WIDTH * ratio;
		} else {
			// 縦長の画像は縦のサイズを指定値にあわせる
			let ratio = image.width / image.height;
			w = THUMBNAIL_HEIGHT * ratio;
			h = THUMBNAIL_HEIGHT;
		}
		return {width: w, height: h};
	}

	hideQrDialog() {
		this.qrReadedDialog.classList.remove('is-show');
	}

	linkToStampCard() {
		this.hideQrDialog();
		location.href = `/users/stamp_card/${this.stampCard.id}#stampCard`
	}
}