const btoa = require(`btoa`);
const request = require(`request-promise`);

const token = `b774b8e466ba0da337ed7d7634971c0d390ac20b`;

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

module.exports = {

	activate: (path, contentStr) => {
		// commit to dev
		return request(Commit.newFile({
			message: `System generated commit on ${new Date(Date.now())}`,
			content: btoa(contentStr),
			path: path
		}))
			.then(jsonRes => jsonRes)
			.catch(err => console.error(err));
	},

	promote: (src, dest) => {
		// create pr
		return request(PullReq.create({
			title: `System generated PR: Promoting data from ${src} to ${dest}.`,
			head: src,
			base: dest,
			body: `This PR was auto created at ${new Date(Date.now())}`,
			maintainer_can_modify: true
		}))
			.then(jsonRes => jsonRes.number)

			// then merge pr
			.then(number => request(PullReq.merge({
				number: number
			})))
			.catch(err => console.error(err))

	}
}








