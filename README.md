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

- Create a new release from GitHub UI for the latest commit hash.
- Test the release manually. TODO: Run test automatically.
- Run the commands below to move the commit hash for `v1` to the latest release:
```bash
git checkout main
git tag --force v1 <latest-release-commit-hash>
git push --force --tags
```
- `v1` release should be used in other pipelines to receive latest updates.