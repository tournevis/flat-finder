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
		return '' + url
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