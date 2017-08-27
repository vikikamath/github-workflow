module.exports = (str, obj) =>
	str.split(/\//)
	.map(token.startsWith(`:`) ? obj[token.substr(1)]: token)
	.join(`/`)
