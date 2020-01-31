let camera, canvas, qrDecode, success, fail, ctx;

window.onload = function () {
	camera = document.querySelector('input[data-camera]');
	canvas = document.querySelector("[data-qr-result] canvas");
	qrDecode = document.querySelector("[data-qr-decord]");
	success = document.querySelector('[data-qr-result] .el_success');
	fail = document.querySelector('[data-qr-result] .el_fail');

	ctx = canvas.getContext("2d");

	camera.onchange = openQRCamera;
	camera.onclick = resetCanvas;
};

function openQRCamera() {
	let reader = new FileReader();
	let image = new Image();
	reader.onload = function (evt) {
		image.onload = function () {
			let {width, height} = getThumbnailSize(image);
			canvas.setAttribute("width", width);
			canvas.setAttribute("height", height);

			// カメラの映像をCanvasに複写
			ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);

			// QRコード読み取り
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			const code = jsQR(imageData.data, canvas.width, canvas.height);

			if (code == null) {
				fail.classList.add('is-show');
			} else {
				success.classList.add('is-show');
				qrDecode.value = code.data;
			}
		};
		image.src = evt.target.result;
	};
	reader.readAsDataURL(camera.files[0]);
}

function readQRCode(canvas, ctx) {
	let {width, height} = getThumbnailSize(image);
	canvas.setAttribute("width", width);
	canvas.setAttribute("height", height);

	// カメラの映像をCanvasに複写
	ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);

	// QRコード読み取り
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const code = jsQR(imageData.data, canvas.width, canvas.height);

	if (code == null) {
		fail.classList.add('is-show');
	} else {
		success.classList.add('is-show');
		qrDecode.value = code.data;
	}
}

function resetCanvas() {
	fail.classList.remove('is-show');
	success.classList.remove('is-show');
}

function getThumbnailSize(image) {
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