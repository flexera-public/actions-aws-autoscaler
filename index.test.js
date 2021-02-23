const autoScaler = require('./autoScaler');
const AWS = require('aws-sdk-mock');
const assert = require('assert').strict;

test('Scale up for already running runner', () => {
  AWS.mock('AutoScaling', 'setDesiredCapacity', function (params, callback) {
    callback(null, "successfully put item in database");
  });

  AWS.mock('AutoScaling', 'describeAutoScalingGroups', function (params, callback) {
    callback(null, { "AutoScalingGroups": [{ "Instances": [{ "LifecycleState": "InService" }] }] });
  });

  var waitNeeded = autoScaler("autoscaling-group-01", 1, 1, 1);

  assert.equal(waitNeeded, false)

  AWS.restore('AutoScaling');
});

test('Runner come online after scaling up', () => {
  AWS.mock('AutoScaling', 'setDesiredCapacity', function (params, callback) {
    callback(null, "successfully put item in database");
  });

  let numberOfCalls = 0
  AWS.mock('AutoScaling', 'describeAutoScalingGroups', function (params, callback) {

    if (numberOfCalls == 2) {
      callback(null, { "AutoScalingGroups": [{ "Instances": [{ "LifecycleState": "InService" }] }] });
    } else {
      numberOfCalls++;
      callback(null, { "AutoScalingGroups": [{ "Instances": [{ "LifecycleState": "Pending" }] }] });
    }
  });

  var waitNeeded = autoScaler("autoscaling-group-01", 0.1, 1, 1);

  assert.equal(waitNeeded, true)

  AWS.restore('AutoScaling');
});
