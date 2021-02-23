const AWS = require('aws-sdk');
const core = require('@actions/core');
const child_process = require("child_process");

autoscaler = function (groupName, timeout, waitBetweenChecks) {
  var params = {
    AutoScalingGroupName: groupName,
    DesiredCapacity: 1
  };

  var autoscaling = new AWS.AutoScaling();
  autoscaling.setDesiredCapacity(params, function (err, data) {
    if (err) throw err;
    else core.info("Successfully set the desired capacity.");
  });

  params = {
    AutoScalingGroupNames: [
      groupName
    ]
  };

  core.info("Wait for runner to be ready.");

  var timeout_ms = timeout * 60 * 1000;
  var startTime = Date.now();
  var extraWait = false;
  var data = {}
  while ((Date.now() - startTime) < timeout_ms) {
    //var data = autoscaling.describeAutoScalingGroups(params).promise();
    autoscaling.describeAutoScalingGroups(params, function (err, data1) {
      if (err) throw err;
      else data = data1
    });

    if (data.AutoScalingGroups[0].Instances[0] != null) {
      if (data.AutoScalingGroups[0].Instances[0].LifecycleState === "InService") {
        core.info("Runner is ready.")
        break;
      }

      if (data.AutoScalingGroups[0].Instances[0].LifecycleState === "Pending") {
        extraWait = true;
      }
    }
    core.info(`Not in service yet! Wait for ${waitBetweenChecks} seconds.`)
    child_process.execSync(`sleep ${waitBetweenChecks}`);
  }

  return extraWait;
};

module.exports = autoscaler;