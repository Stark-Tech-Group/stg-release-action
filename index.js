const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  try {

    const token = core.getInput('token')
    const tag = core.getInput('version')
    const octokit = GitHub.getOctokit(myToken)

    const createReleaseResponse = await octokit.rest.repos.createRelease({
      ...context.repo,
      tag_name: tag,
      name: tag
    });

    const {
      data: { id: releaseId, html_url: htmlUrl, upload_url: uploadUrl }
    } = createReleaseResponse;

    core.setOutput('id', releaseId);

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
