export class StampCard {
	constructor() {
		this.authenticityToken = document.querySelector('meta[name="csrf-token"]').content;
		this.loading = document.querySelector('[data-qr-result] .el_loading');
		this.success = document.querySelector('[data-qr-result] .el_success');
		this.fail = document.querySelector('[data-qr-result] .el_fail');
		this.qrReadedDialog = document.querySelector('.qrReadedDialog');
	}

	setQrDecode(qrDecode) {
		this.qrDecode = qrDecode;
	}

	postStamp() {
		let xhr = new XMLHttpRequest();
		xhr.responseType = 'json';

		xhr.addEventListener('load', () => {
			this.loading.classList.add('is-hide');

			if (xhr.status == 200) {
				this.success.classList.add('is-show');
				this.id = xhr.response.stamp_card_id;
			} else {
				this.fail.classList.add('is-show');
			}

		});

		xhr.open('POST', `/users/stamp_card/stamp`);
		xhr.setRequestHeader('X-CSRF-Token', this.authenticityToken);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(`qr_decode=${this.qrDecode}`);
	}

}