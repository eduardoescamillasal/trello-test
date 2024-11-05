import boto3
from botocore.exceptions import ClientError

def delete_table(table_name):
    dynamodb = boto3.resource(
        'dynamodb',
        endpoint_url='http://localhost:8000',  # DynamoDB Local endpoint
        region_name='us-west-2',               # Region name (can be any valid AWS region)
        aws_access_key_id='anything',          # Credentials are not required for DynamoDB Local
        aws_secret_access_key='anything'
    )

    table = dynamodb.Table(table_name)

    try:
        table.delete()
        print(f"Deleting table '{table_name}'...")
        table.wait_until_not_exists()
        print(f"Table '{table_name}' has been deleted.")
    except ClientError as e:
        print(f"Error deleting table '{table_name}': {e.response['Error']['Message']}")

if __name__ == "__main__":
    delete_table('Lists')
    delete_table('Cards')
