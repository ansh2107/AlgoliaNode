var express = require('express');
var router = express.Router();

var algoliasearch = require('algoliasearch');
var client = algoliasearch('GSLW7H4FX6', '6d38326fdc63c2715698c888b55eb2d2');
var Firebase = require('firebase');
var myclient = client.initIndex('colorsArray');

// Connect to our Firebase contacts data
// var fb = new Firebase('https://brilliant-fire-6680.firebaseio.com/message');

/* GET home page. */
router.get('/', function(req, res, next) {

	




//client.initIndex('contacts').setSettings({"attributesToIndex":["name","email","company","city","county","unordered(address)","state","zip","phone","fax","unordered(web)"],"customRanking":["desc(followers)"]});


client.initIndex('colorsArray').setSettings({"attributesToIndex":["unordered(objectID)","unordered(hexValue)","unordered(colorName)"],"customRanking":["desc(objectID)"]});


//client.initIndex('contacts_new').setSettings({"attributesToIndex":["name","email","company","city","county","unordered(address)","state","zip","phone","fax","unordered(web)"],"customRanking":["desc(followers)"]});
	
  res.render('index', { title: 'Express' });
});




module.exports = router;
