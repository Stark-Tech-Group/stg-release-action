const core = require('@actions/core');
const github = require('@actions/github');


// most @actions toolkit packages have async methods
async function run() {
  try {
    
    const token = core.getInput('token')
    const tookit = github.getOctokit(myToken)

    const release = tookit.repos.getLatestRelease({
      ...github.context.repo
    });

    core.setOutput('relaseNumber', JSON.stringify(release))

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
