const wf = require('./workflow');
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


const PullReq = require(`./pullreq`)(options);


// wf.activate('notes/other.txt', `It's a beautiful workflow!`)
	// .then(_ => workflow.promote())
	// .catch(err => console.error(err));

// wf.promote(`master`, `qa`);

request(PullReq.merge({
	number: 1
}))
.then(res => console.log(res))
.catch(err => console.error(err))
