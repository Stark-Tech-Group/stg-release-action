const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  try {

    const token = core.getInput('token')
    const github = new GitHub(token);

    // Get owner and repo from context of payload that triggered the action
    const { owner: currentOwner, repo: currentRepo } = context.repo;

    
    const latestReleaseRes = await github.repos.getLatestRelease({
      ...context.repo
    })

    const {
      data: { tag_name: tagName }
    } = latestReleaseRes;

    const version = tagName.split(".")
    const major = version[0]
    const minor = version[1]
    let buildNumber = +version[2]

    buildNumber++
    const tag = 'r' + major + '.' + minor + '.' + buildNumber
    
    const createReleaseResponse = await github.repos.createRelease({
      ...context.repo,
      tag_name: tag,
      name: tag
    });

    const {
      data: { id: releaseId, html_url: htmlUrl, upload_url: uploadUrl }
    } = createReleaseResponse;

    core.setOutput('id', releaseId);
    core.setOutput('htmlUrl', htmlUrl);
    core.setOutput('uploadUrl', uploadUrl)
    core.setOutput('tag', tag)

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();




// octokit.repos.uploadReleaseAsset({
//   owner,
//   repo,
//   release_id,
//   data,
// });
