# AWS Autoscalar

GitHub Action to set a desired value for an AWS Autoscaling group


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
