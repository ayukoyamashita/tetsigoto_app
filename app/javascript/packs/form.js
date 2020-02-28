import flatpickr from "flatpickr"
const Japan = require("flatpickr/dist/l10n/ja.js").default.ja;
require("flatpickr/dist/flatpickr.min.css")

document.addEventListener('turbolinks:load', () => {
	flatpickr.localize(Japan);
	flatpickr(document.querySelectorAll('.datepicker'), {
		disableMobile: "true"
	});
});