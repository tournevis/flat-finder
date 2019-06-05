const https = require('https')
const searchParams = require('./config/search.json')
const mysqlConf = require('./config/mysql.conf.json')
const DB = require('./lib/db.js')
const Flat = require('./lib/flat.js')
const constant = require('./utils/const.js')

var database = new DB(mysqlConf)
var requestUrl = constant.BASE_URL + constant.GET_NEW_FLAT + serialize(searchParams)


var searchForFlats = function () {

  console.log('🎺 Request: Start')
  https.get(requestUrl, res => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    })
    res.on('end', () => {
      console.log('🎺 Request: Done')
      handleData(data)
    })
  }).on("error", (err) => {
    console.log("🎺 Request: 🚨 \n Error:" + err.message);
  })
}

function serialize (obj) {
  var str = JSON.stringify(obj)
  return encodeURIComponent(str).replace(/'/g,"%27").replace(/"/g,"%22");
}
function computeDelay () {
  var delay =  1000 * 60 * (Math.random() * 4 + 4)
  var min = Math.floor((delay / 1000) / 60)
  var sec = Math.floor( (delay / 1000) % 60 )
  console.log('🙌 next refresh in : ' +  min + 'min' + sec + 's.')
  return delay
}

function  handleData(data) {
  var delay = 60 * 1000
  var obj = JSON.parse(data)
  if (obj.d.Data && obj.d.Data.Resultats ) {
    var r = obj.d.Data.Resultats.Resultats
    console.log(`🏰 ${r.length} : Appartements trouvés`)
    if (r) {
      for (var i = r.length - 1; i >= 0; i--) {
        var formatedFlat = Flat.serialize(r[i])
        database.add(formatedFlat)
      } 
    }
    delay = computeDelay()
  } else {
    console.log(`🙅‍♀️ 0 : Appartements trouvés`)
    console.log(data.d)
  }
  setTimeout(() => { searchForFlats() }, delay)
}
searchForFlats()