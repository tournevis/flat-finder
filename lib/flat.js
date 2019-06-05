const contants = require('../utils/const.js')
class Flat {
	constructor() {

	}
	serialize (obj) {
		return {
			flat_id: obj["IdAnnonce"],
			postal_code: obj["CodePostal"] ,
			date_maj: obj["DateMaj"],
			date_created: obj["DateMaj"],
			status: 0,
			type: obj["IdTypeBien"],
			price: obj["Prix"],
			free_space: obj["Surface"],
			spaces: obj["NbPieces"] ,
			lat: obj["Lat"],
			lng: obj["Lng"],
			city: obj["Ville"],
			hood: obj["Quartier"],
			adress: obj["Adresse"],
			url: this.computeFlatUrl(obj["Url"]),
			images: this.computeFlatImage(obj["Visuels"]),
		}
	}
	computeFlatImage(img) {
		var tmpImgArray = []
		img.forEach(el => {
			tmpImgArray.push(el.Formats[el.Formats.length - 1].Url)
		})
		return tmpImgArray.join(',')
	}
	computeFlatUrl (url) {
		return contants.DISPLAY_URL + url
	}
	computeMail (flat) {
		var body = '<div>'
		body += '<h2>Nouvelle Annonce: </h2>'
		body += `<p> prix : <b>${flat.price} </b></p>`
		body += `<p> surface : <b>${flat.free_space} </b></p>`
		body += `<a href="${flat.url}"> ${flat.url} </a>`
		var imgs = flat.images.split(',')

		body += '<h3>Les Images : </h3>'
		body += '<div class="images-container">'
		for (var i = imgs.length - 1; i >= 0; i--) {
			body += `<img src='${imgs[i]}'>`
		}
		body += '</div>'
		body += '</div>'
		return {
			title: '🦊 Flat Found: ' + flat.city + ' - ' + flat.flat_id,
			body: body
		}
	}
	getModel () {
		return "id INT AUTO_INCREMENT," +
			    "flat_id INT  NOT NULL," +
			    "postal_code VARCHAR(255) NOT NULL," +
			    "date_maj DATE," +
			    "date_created DATE," +
			    "status TINYINT DEFAULT 0," +
			    "type TINYINT DEFAULT 0," +
			    "price SMALLINT," +
			    "free_space FLOAT," +
			    "spaces FLOAT," +
			    "lat FLOAT," +
			    "lng FLOAT," +
			    "city TEXT," +
			    "hood TEXT," +
			    "adress TEXT," +
			    "url TEXT," +
			    "images TEXT," +
			    "PRIMARY KEY (id)" 
	}
}
module.exports = new Flat()