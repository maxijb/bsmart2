var questions;
exports.initQuestions = function() {
	if (!questions) {
		questions = sails.config.constants.questions;
	}
}



exports.possibleQuestions = function(data, request) {
	var possible = [],
		i,
		j,
		key;
	
	// initQuestions();
	for (var i in questions) {
		var question = questions[i];
		for (var j = question.neededInfo.length - 1; j >= 0 ; j--) {
			key = question.neededInfo[j];
			if (data[key]) {
				possible.push(i);
				break;
			}
		}
	}

	return possible;
}


/**
* Returns 
*/
exports.getDataUsedForQuestion = function(question, data) {
	var i,
		used = [],
		key;

	for (i = questions[question].neededInfo.length - 1; i >= 0; i--) {
		key = questions[question].neededInfo[i];
		if (data[key]) {
			used.push(key);
		}
	}
	return used;
}