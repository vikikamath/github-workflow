
# command
// get all open PRs by src and target branch
curl -H "Authorization: token b774b8e466ba0da337ed7d7634971c0d390ac20b"  https://api.github.com/repos/vikikamath/test-files/pulls?state=open&base=dev&head=master

# response - iterate through to get number field and diff url
[


]


# command
curl -H "Authorization: token b774b8e466ba0da337ed7d7634971c0d390ac20b" --request PUT https://api.github.com/repos/vikikamath/test-files/pulls/1/merge

# response
{
  "sha": "d1b13cb627e59576659c59830a3ec34a2f293e0f",
  "merged": true,
  "message": "Pull Request successfully merged"
}

#command
curl --silent -H "Authorization: token b774b8e466ba0da337ed7d7634971c0d390ac20b"  https://patch-diff.githubusercontent.com/raw/vikikamath/test-files/pull/2.diff | grep '^\+[^\+]'

#response
+This is some other file
+blah