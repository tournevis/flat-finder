const https = require('https')
const searchParams = require('./config/search.json')
const mysqlConf = require('./config/mysql.conf.json')
const BASE_URL = "https://ws.louervite.fr/"
const GET_NEW_FLAT = "AnnonceWebService.svc/RechercherAnnonces?request="
const DB = require('./lib/db.js')
const Flat = require('./lib/flat.js')
const sendEmail = require('./lib/email.js')

var database = new DB(mysqlConf)
var requestUrl = BASE_URL + GET_NEW_FLAT + serialize(searchParams)


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
  console.log(`🏰 ${r.length} : Appartements trouvés`)
  if (r) {
    for (var i = r.length - 1; i >= 0; i--) {
      var formatedFlat = Flat.serialize(r[i])
      var t = database.add(formatedFlat)
    } 
  }
  sendEmail()
}