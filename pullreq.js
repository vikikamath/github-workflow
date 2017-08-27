
module.exports = (options) => {

	return {
		/*

			title	string	Required. The title of the pull request.

			head	string	Required. The name of the branch where your changes are implemented. For cross-repository pull requests in the same network, namespace head with a user like this: username:branch.

			base	string	Required. The name of the branch you want the changes pulled into. This should be an existing branch on the current repository. You cannot submit a pull request to one repository that requests a merge to a base of another repository.

			body	string	The contents of the pull request.

			maintainer_can_modify	boolean	Indicates whether maintainers can modify the pull request.

		*/
		create: createParams => {

			const url = `/repos/${options.owner}/${options.repo}/pulls`;

			return {
				'uri': `${options.base}${url}`,
				'method': `POST`,
				'headers': options.headers,
				'body': createParams,
				'json': true
			};
		},

		/*

			commit_title	string	Title for the automatic commit message.

			commit_message	string	Extra detail to append to automatic commit message.

			sha	string	SHA that pull request head must match to allow merge.

			merge_method	string	Merge method to use. Possible values are merge, squash or rebase. Default is merge.

		*/

		merge: mergeParams => {
			const url = `/repos/${options.owner}/${options.repo}/pulls/${mergeParams.number}/merge`;

			return {
				'uri': `${options.base}${url}`,
				'method': `PUT`,
				'headers': options.headers,
				'body': mergeParams,
				'json': true
			};
		}
	}


}
