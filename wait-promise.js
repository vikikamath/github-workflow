module.exports = ms => {
	return function(data) {
		return new Promise(res =>
			setTimeout(() =>res(data), ms));
	};
};
