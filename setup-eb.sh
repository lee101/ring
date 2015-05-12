sudo pip install -U awsebcli

# set up credentials

touch /home/ubuntu/.aws/config
chmod 600 /home/ubuntu/.aws/config
echo "[profile nc-aws-account]" > /home/ubuntu/.aws/config
echo "aws_access_key_id = $AWS_ACCESS_KEY_ID" >> /home/ubuntu/.aws/config
echo "aws_secret_access_key = $AWS_SECRET_KEY" >> /home/ubuntu/.aws/config
