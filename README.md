# AWS Autoscalar

GitHub Action to set a desired value for an AWS Autoscaling group

## Parameters

| Name | Description | Default | Required |
| - | - | - | - |
| `groupName` | Autoscaling group name | | ✔ |
| `timeoutMinutes` | Timeout in minutes | 2 | |
| `waitBetweenChecks` | Sleep time between checks in checks | 10 | |
| `extraWait` | Sleep for extra time when runner just scaled up. [When using needs in other jobs](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idneeds)  | 60 | |


## Usage

```yaml
  - name: 'Set desired capacity'
    uses: flexera/actions-aws-autoscaler@v1
    with:
      groupName: 'autoscaling-group-name'
      timeoutMinutes: 2
```

AWS environment variables should be set prior to using this action, for example using: [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials)

[More details](https://github.com/actions/javascript-action)

## Releasing latest version

- Use [release.yml](https://github.com/flexera/actions-aws-autoscaler/actions/workflows/release.yml) to create a new release from GitHub UI.
- Test the release manually on an internal workflow. (because this is a public repo it is not possible to test a runner with this)
- Use [update-v1.yml](https://github.com/flexera/actions-aws-autoscaler/actions/workflows/update-v1.yml) to update `v1` to the new release created in the previous step to automatically update other workflows.
- `v1` release should be used in other pipelines to receive latest updates.



