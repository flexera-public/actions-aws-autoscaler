const core = require('@actions/core');
const AWS = require('aws-sdk');
const child_process = require("child_process");
const autoScaler = require('./autoScaler');

const GROUP_NAME = core.getInput('groupName', {
  required: true
});

const TIMEOUT = core.getInput('timeoutMinutes', {
  required: false
});

const WAIT_BETWEEN_CHECKS = core.getInput('waitBetweenChecks', {
  required: true
});

const EXTRA_WAIT = core.getInput('extraWait', {
  required: true
});

async function run() {
  try {

    var extraWaitNeeded = autoScaler(GROUP_NAME, TIMEOUT, WAIT_BETWEEN_CHECKS)

    if (extraWaitNeeded) {
      core.info(`Wait for ${EXTRA_WAIT} seconds more as this runner just scaled up.`)
      child_process.execSync(`sleep ${EXTRA_WAIT}`);
    }

  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

run();
