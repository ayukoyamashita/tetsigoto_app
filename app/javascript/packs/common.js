let camera = document.getElementById('camera');
const canvas = document.getElementById("picture");
let ctx = canvas.getContext("2d");
const qrDecode = document.getElementById("qrDecode");

camera.onchange = openQRCamera;

const THUMBNAIL_WIDTH = 500; // 画像リサイズ後の横の長さの最大値
const THUMBNAIL_HEIGHT = 500; // 画像リサイズ後の縦の長さの最大値

function openQRCamera() {
	var reader = new FileReader();
	var image = new Image();
	reader.onload = function (evt) {
		image.onload = function () {
			var width, height;
			if(image.width > image.height){
				// 横長の画像は横のサイズを指定値にあわせる
				var ratio = image.height/image.width;
				width = THUMBNAIL_WIDTH;
				height = THUMBNAIL_WIDTH * ratio;
			} else {
				// 縦長の画像は縦のサイズを指定値にあわせる
				var ratio = image.width/image.height;
				width = THUMBNAIL_HEIGHT * ratio;
				height = THUMBNAIL_HEIGHT;
			}
			canvas.setAttribute("width", width);
			canvas.setAttribute("height", height);
			ctx = canvas.getContext("2d");
			ctx.drawImage(image,0,0,image.width,image.height,0,0,width,height);
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