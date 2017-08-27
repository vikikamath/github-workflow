const btoa = require(`btoa`);
const request = require(`request-promise`);

const token = ``;

const options = {
	base: `https://api.github.com`,
	owner: `vikikamath`,
	repo: `test-files`,
	headers: {
		'User-Agent': `vikikamath`,
		'Authorization': `token ${token}`
	}
};

const Commit = require(`./commit`)(options);
const PullReq = require(`./pullreq`)(options);
const envEnum = {
	dev: 1,
	qa: 2,
	master: 3
}

const wait = require(`./wait-promise`);

module.exports = {

	activate: (path, contentStr) => {
		// commit to dev
		return request(Commit.newFile({
			message: `System generated commit on ${new Date(Date.now())}`,
			content: btoa(contentStr),
			path: path,
			branch: `dev` // always!
		}))
			.then(jsonRes => jsonRes)
			.catch(err => console.error(err));
	},

	promote: (src, dest) => {
		if (! envEnum[src] || !envEnum[dest]) {
			console.log(`'src' and 'dest' must be provided`);
			return;
		}

		if (envEnum[src] != envEnum[dest] - 1) {
			console.log(`Cannot promote from ${src} to ${dest}. Please check 'source' and 'dest'.`);
			return;
		}


		// create pr
		return request(PullReq.create({
			title: `System generated PR: Promoting data from ${src} to ${dest}.`,
			head: src,
			base: dest,
			body: `This PR was auto created at ${new Date(Date.now())}`,
			maintainer_can_modify: true
		}))
			.then(jsonRes => wait(5000)(jsonRes.number))

			// then merge pr
			.then(number => request(PullReq.merge({
				number: number
			})))
			.catch(err => console.error(err))

	}
}








