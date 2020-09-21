export class StampCard {
	constructor(id) {
		this.id = id;
	}

	loadStamps() {
		let stampCard = document.getElementById('stampCard');
		if (stampCard == null || stampCard.dataset.id != this.id) {
			return;
		}
		let xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.addEventListener('load', () => {
			let stamps = xhr.response.stamps;
			Array.prototype.forEach.call(stampCard.children, (item, index) => {
				if (index < stamps.length) {
					item.classList.add('is-stamped');
					item.getElementsByClassName('stampCard_card_date')[0].innerText = stamps[index].date;
				}
			});

		});
		xhr.open('GET', `/users/stamp_card/${this.id}/my_stamps`);
		xhr.send();
	}

	static postStamp(stampCard, qrDecode) {
		let authenticityToken = document.querySelector('meta[name="csrf-token"]').content;
		let loading = document.querySelector('[data-qr-result] .el_loading');
		let success = document.querySelector('[data-qr-result] .el_success');
		let fail = document.querySelector('[data-qr-result] .el_fail');
		let message = document.querySelector('[data-qr-result] .el_message');

		let xhr = new XMLHttpRequest();
		xhr.responseType = 'json';

		xhr.addEventListener('load', () => {
			loading.classList.add('is-hide');

			if (xhr.status == 200) {
				success.classList.add('is-show');
				stampCard.id = xhr.response.stamp_card_id;
				stampCard.loadStamps();
			} else {
				message.innerText = xhr.response.message;
				fail.classList.add('is-show');
			}

		});

		xhr.open('POST', '/users/stamp_card/stamp');
		xhr.setRequestHeader('X-CSRF-Token', authenticityToken);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(`qr_decode=${qrDecode}`);
	}

}