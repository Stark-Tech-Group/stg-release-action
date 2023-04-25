const core = require('@actions/core');
const github = require('@actions/github');
const context = github.context;

async function run() {
  try {

    const token = core.getInput('token')
    const tag = core.getInput('version')
    const octokit = github.getOctokit(token)

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