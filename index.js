const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  try {

    const token = core.getInput('token')
    const github = new GitHub(token);

    // Get owner and repo from context of payload that triggered the action
    const { owner: currentOwner, repo: currentRepo } = context.repo;

    
    const latestRelease = await github.repos.getLatestRelease({
      ...context.repo
    })

    core.setOutput('relaseNumber', JSON.stringify(latestRelease))
    // const createReleaseResponse = await github.repos.createRelease({
    //   owner,
    //   repo,
    //   tag_name: tag,
    //   name: releaseName,
    //   body: bodyFileContent || body,
    //   draft,
    //   prerelease,
    //   target_commitish: commitish
    // });

    // // Get the ID, html_url, and upload URL for the created Release from the response
    // const {
    //   data: { id: releaseId, html_url: htmlUrl, upload_url: uploadUrl }
    // } = createReleaseResponse;

    // // Set the output variables for use by other actions: https://github.com/actions/toolkit/tree/master/packages/core#inputsoutputs
    // core.setOutput('id', releaseId);
    // core.setOutput('html_url', htmlUrl);
    // core.setOutput('upload_url', uploadUrl);
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
