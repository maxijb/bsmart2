//	res.i18n(item)


exports.generateCityText = function(res, climate, data, location) {
	var text = [],
		i18 = res.i18n;

	if (climate.type) {
		if (climate.precipitation_type == 'medium') {
			text.push(i18("SentencesClimate1", location.name, climate.type));
		} else {
			text.push(i18("SentencesClimate2", location.name, climate.type, i18('PrecipitationType_'+climate.precipitation_type)));
		}
	}

	if (climate.seasons_temperature) {
		text.push(res.i18n('SentencesSeasons1', location.name));
	}

	return text.join('. ');
}
