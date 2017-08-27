import groovy.json.JsonSlurperClassic



@NonCPS
def diffPatchMergePRs(prList) {
	// echo ">> " + prList
	// print ">>>" + prList.length
	// print ">>>" + prList[0].number
	for (i = 0; i < prList.size(); i++){
		//print ">>> " + prList[i].number
		def response = ["curl", "-k", "https://patch-diff.githubusercontent.com/raw/vikikamath/test-files/pull/${prList[i].number}.diff"].execute().text

		def lines = new String(response).split('\n')

		print ">>> Following lines will be written <<<<"
		for (j = 0; j < lines.size(); j++) {
			if (lines[j].startsWith("+") && !lines[j].startsWith("+++")) {
				print " " + lines[j].substring(1)
			}
		}
		print ">>> Following lines will be written <<<<"
	}
}

node {
	def prList = null
	def mongoUpserts = new ArrayList();
	def readyToMergeList = new ArrayList();

	stage('Fetch PRs awaiting merge') {
		def response = ["curl", "-k", "-H", "Content-Type: application/json", "https://api.github.com/repos/vikikamath/test-files/pulls?state=open&base=master&head=dev"].execute().text
		prList = new JsonSlurperClassic().parseText(response)
		// diffPatchMergePRs(prList)
	}

	stage('Get PR data') {
		for (i = 0; i < prList.size(); i++){
			def response = ["curl", "-k", "https://patch-diff.githubusercontent.com/raw/vikikamath/test-files/pull/${prList[i].number}.diff"].execute().text

			def lines = new String(response).split('\n')

			for (j = 0; j < lines.size(); j++) {
				if (lines[j].startsWith("+") && !lines[j].startsWith("+++")) {
					mongoUpserts.add(lines[j].substring(1))
				}
			}

			for (k = 0; k < mongoUpserts.size(); k++) {
				print ">> Upserting " + mongoUpserts[k]
			}

			readyToMergeList.add(prList[i].number);
		}
	}

	stage('Merging PR') {
		for (l = 0 ; l < readyToMergeList.size(); l++) {
			def response = ["curl", "-H", "Authorization: token b774b8e466ba0da337ed7d7634971c0d390ac20b", "-X", "PUT", "https://api.github.com/repos/vikikamath/test-files/pulls/${readyToMergeList[l]}/merge"].execute().text
			def responseJSON = new JsonSlurperClassic().parseText(response)

			print ">> " + responseJSON.message
		}
	}

}
