const axios = require('axios')
const fs = require('fs')

/* const fetchPhData = async () => {
	try {
		const res = await axios.get(
			'https://raw.githubusercontent.com/flores-jacob/philippine-regions-provinces-cities-municipalities-barangays/master/philippine_provinces_cities_municipalities_and_barangays_2019v2.json'
		)
		const phData = await res.data
		fs.writeFile('phData.txt', JSON.stringify(phData), (err) => {
			if (err) throw err
			console.log('complete')
		})
	} catch (error) {
		console.log(error)
	}
}
fetchPhData() */
/* import json from './phData.json' */
const json = require('./phData.json')
json['01'].charge = 2000
console.log(
	json['01'].province_list['ILOCOS NORTE'].municipality_list.ADAMS
		.barangay_list
)
