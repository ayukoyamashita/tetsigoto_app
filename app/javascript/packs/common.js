const camera = document.getElementById('camera');
const canvas = document.getElementById("picture");
const ctx = canvas.getContext("2d");
const qrDecode = document.getElementById("qrDecode");
const THUMBNAIL_WIDTH = 500; // 画像リサイズ後の横の長さの最大値
const THUMBNAIL_HEIGHT = 500; // 画像リサイズ後の縦の長さの最大値

camera.onchange = openQRCamera;

function openQRCamera() {
	let reader = new FileReader();
	let image = new Image();
	reader.onload = function (evt) {
		image.onload = function () {
			let width, height;
			if (image.width > image.height) {
				// 横長の画像は横のサイズを指定値にあわせる
				let ratio = image.height / image.width;
				width = THUMBNAIL_WIDTH;
				height = THUMBNAIL_WIDTH * ratio;
			} else {
				// 縦長の画像は縦のサイズを指定値にあわせる
				let ratio = image.width / image.height;
				width = THUMBNAIL_HEIGHT * ratio;
				height = THUMBNAIL_HEIGHT;
			}
			canvas.setAttribute("width", width);
			canvas.setAttribute("height", height);
			ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);
			checkPicture();
		};
		image.src = evt.target.result;
	};
	reader.readAsDataURL(camera.files[0]);
}

/**
 * QRコードの読み取り
 */
function checkPicture() {
	// カメラの映像をCanvasに複写
	ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);

	// QRコードの読み取り
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const code = jsQR(imageData.data, canvas.width, canvas.height);

	qrDecode.value = code.data;
}