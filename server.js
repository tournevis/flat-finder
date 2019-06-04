const https = require('https')
const baseUrl = "https://ws.louervite.fr/AnnonceWebService.svc/RechercherAnnonces?request="

var params = {
  "Criteres": {
    "CodesInsee": ["930048"],
    "Tri": {
      "Parameter": "DateCreation",
      "Asc": false
    },
    "Pagination": {
      "PageIndex": "0",
      "PageSize": 20
    },
    "EstDerniereRecherche": true,
    "EstRechercheRefine": false,
    "TypesBien": [1],
    "NbPiecesMin": 1,
    "PrixMin": 100,
    "PrixMax": 10000
  }
}
var requestUrl = baseUrl + serialize(params)
https.get(requestUrl, res => {
  let data = ''
  res.on('data', (chunk) => {
    data += chunk
  })
  res.on('end', () => {
    console.log('🎺 request done')
    handleData(data)
  })
}).on("error", (err) => {
  console.log("🎺 🚨 Error:" + err.message);
})

function serialize (obj) {
  var str = JSON.stringify(obj)
  return encodeURIComponent(str).replace(/'/g,"%27").replace(/"/g,"%22");
}

function  handleData(data) {
  var obj = JSON.parse(data)
  var r =  obj.d.Data.Resultats.Resultats
  console.log(r)
}