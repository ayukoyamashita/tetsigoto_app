// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require("jsqr")

import fontawesome from '@fortawesome/fontawesome'
import faSolid from '@fortawesome/fontawesome-free-solid'
import faRegular from '@fortawesome/fontawesome-free-regular'
import faBrands from '@fortawesome/fontawesome-free-brands'
fontawesome.library.add(faSolid, faRegular, faBrands);
document.addEventListener('turbolinks:load', () => {
	fontawesome.dom.i2svg()
});

import "./qr_camera"
import {StampCard} from "./stamp_card";
import "../stylesheets/application-user"

document.addEventListener('turbolinks:load', () => {
	let stampCardElem = document.getElementById('stampCard');
	if (stampCardElem) {
		let stampCard = new StampCard(stampCardElem.dataset.id);
		stampCard.loadStamps();
	}
});
// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
