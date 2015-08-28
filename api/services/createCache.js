
exports.updateCacheInfo = function() {
	requestCity();
}



function requestCity() {
	City.findOne({estado_wb: 0})
		.done(function(err, city) {
			if (err || !city) return;

			Weather.find()
				.where({city_id: city.city_id})
				.where({
			        or: [
			        		{type_code: 'ATE'},
			        		{type_code: 'APR'},
			        		{type_code: 'AHT'},
			        		{type_code: 'ALT'}
			      		]
			    })
			    .exec(function(err, results) {
			    	data = weatherHelpers.formatWeatherData(results);
			    	if (data.APR) {
			    		city.precipitation_avg = parseInt(data.APR.average, 10);
			    	}
			    	if (data.AHT && data.ALT) {
			    		city.temp_avg = data.AHT.average;
			    		city.temp_min_avg = data.ALT.average;
			    	} else if (data.ATE) {
			    		city.temp_avg = data.ATE.average;
			    	}
			    	city.estado_wb = 1;
			    	city.save(function(err) {
			    		if (err) console.log(err);
			    		console.log(city.city_id);
			    		requestCity();
			    	});
			    });
		});
}



function requestCities() {
	City
		.findOne()
		.where()
		.limit(50)
		.exec(function(err, results) {
			if (!err && results && results.length) {
				createCache(results);
			}
		});
}


function createCache(results) {
	city = results[0];
	// _.each(results, function(city) {
		Weather.find()
				.where({city_id: city.city_id})
				.where({
			        or: [
			        		{type_code: 'ATE'},
			        		{type_code: 'APR'},
			        		{type_code: 'AHT'},
			        		{type_code: 'ALT'}
			      		]
			    })
			    .exec(function(err, results) {
			    	var temp, 
			    		min_temp,
			    		prec;
			    	data = weatherHelpers.formatWeatherData(results);
			    	if (data.APR) {
			    		city.precipitation_avg = data.APR.average;
			    	}
			    	if (data.AHT && data.ALT) {
			    		city.tmp_avg = data.AHT.average;
			    		city.tmp_min_avg = data.ALT.average;
			    	} else if (data.ATE) {
			    		city.tmp_avg = data.ATE.average;
			    	}

			    	city.estado_wb = 1;
			    	city.update();
			    });
	// });
}
