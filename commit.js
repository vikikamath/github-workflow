module.exports = (options) => {

	return {

		newFile: commitOptions => {

			const url = `/repos/${options.owner}/${options.repo}/contents/${commitOptions.path}`;

			return {
				'uri': `${options.base}${url}`,
				'method': `PUT`,
				'headers': options.headers,
				'body': commitOptions,
				json: true
			};
		}
	};

}
