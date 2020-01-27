let camera = document.getElementById('camera');
const canvas = document.getElementById("picture");
let ctx = canvas.getContext("2d");
const qrDecode = document.getElementById("qrDecode");

camera.onchange = openQRCamera;

function openQRCamera() {
	var reader = new FileReader();
	var image = new Image();
	reader.onload = function (evt) {
		image.onload = function () {
			canvas.setAttribute("width", image.width);
			canvas.setAttribute("height", image.height);
			ctx = canvas.getContext("2d");
			ctx.drawImage(image, 0, 0); //canvasに画像を転写
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
	console.log(imageData);
	const code = jsQR(imageData.data, canvas.width, canvas.height);

	console.log(code.data);
	qrDecode.value = code.data;
}