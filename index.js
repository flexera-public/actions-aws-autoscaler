const core = require('@actions/core');
const AWS = require('aws-sdk');
const child_process = require("child_process");


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

    var params = {
      AutoScalingGroupName: GROUP_NAME,
      DesiredCapacity: 1
    };

    var autoscaling = new AWS.AutoScaling();
    autoscaling.setDesiredCapacity(params, function (err, data) {
      if (err) throw err;
      else core.info("Successfully set the desired capacity.");
    });

    params = {
      AutoScalingGroupNames: [
        GROUP_NAME
      ]
    };

    core.info("Wait for runner to be ready.");

    var timeout_ms = TIMEOUT * 60 * 1000;
    var startTime = Date.now();
    var extraWait = false;
    while ((Date.now() - startTime) < timeout_ms) {
      var data = await autoscaling.describeAutoScalingGroups(params).promise();
      if (data.AutoScalingGroups[0].Instances[0] != null) {
        if (data.AutoScalingGroups[0].Instances[0].LifecycleState === "InService") {
          core.info("Runner is ready.")
          break;
        }

        if (data.AutoScalingGroups[0].Instances[0].LifecycleState === "Pending") {
          extraWait = true;
        }
      }
      core.info(`Not in service yet! Wait for ${WAIT_BETWEEN_CHECKS} seconds.`)
      child_process.execSync(`sleep ${WAIT_BETWEEN_CHECKS}`);
    }

    if (extraWait) {
      core.info(`Wait for ${EXTRA_WAIT} seconds more as this runner just scaled up.`)
      child_process.execSync(`sleep ${EXTRA_WAIT}`);
    }

  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

run();
