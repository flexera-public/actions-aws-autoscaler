# AWS Autoscalar

GitHub Action to set a desired value for an AWS Autoscaling group

## Parameters

| Name | Description | Default | Required |
| - | - | - | - |
| `aws-region` | AWS Region  | | ✔ |
| `role-to-assume` | GitHub Runner's autoscaling group IAM role | | ✔ |
| `auto-scaling-group-name` | Autoscaling group name | | ✔ |
| `timeout-minutes` | Timeout in minutes | 2 | |
| `wait-between-checks` | Sleep time between checks in checks | 10 | |
| `extra-wait` | Sleep for extra time when runner just scaled up. [When using needs in other jobs](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idneeds)  | 60 | |


## Usage

```yaml
  - name: 'Set desired capacity'
    uses: flexera/actions-aws-autoscaler@v2
    with:
      aws-region: 'us-east-1'
      role-to-assume: 'autoscaling-iam-role-arn'
      auto-scaling-group-name: 'autoscaling-group-name'
```

AWS environment variables should be set prior to using this action, for example using: [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials)

[More details](https://github.com/actions/javascript-action)

## Releasing latest version

- Use [release.yml](https://github.com/flexera/actions-aws-autoscaler/actions/workflows/release.yml) to create a new release from GitHub UI.
- Test the release manually on an internal workflow. (because this is a public repo it is not possible to test a runner with this)
- Use [update-v1.yml](https://github.com/flexera/actions-aws-autoscaler/actions/workflows/update-v1.yml) to update `v1` to the new release created in the previous step to automatically update other workflows.
- `v1` release should be used in other pipelines to receive latest updates.



