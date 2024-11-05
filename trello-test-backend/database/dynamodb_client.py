import boto3
from botocore.exceptions import ClientError
from botocore.config import Config

def get_dynamodb_client(local=True):
    if local:
        # Connect to DynamoDB Local
        dynamodb = boto3.resource(
            'dynamodb',
            endpoint_url='http://localhost:8000',
            region_name='us-west-2',  # You can use any valid AWS region
            aws_access_key_id='anything',  # DynamoDB Local doesn't care about these
            aws_secret_access_key='anything',
            config=Config(retries={'mode': 'standard'})
        )
    else:
        # Connect to DynamoDB in AWS
        dynamodb = boto3.client('dynamodb')

    create_table(dynamodb, "Lists")
    create_table(dynamodb, "Cards")

    return dynamodb

def create_table(dynamodb, table_name):
    client = boto3.client(
        'dynamodb',
        endpoint_url='http://localhost:8000',
        region_name='us-west-2',
        aws_access_key_id='anything',
        aws_secret_access_key='anything'
    )
    existing_tables = client.list_tables()['TableNames']
    if table_name not in existing_tables:
        print(f"Table '{table_name}' does not exist. Creating...")
        # Define the table schema
        key_schema = [
            {
                'AttributeName': 'id',
                'KeyType': 'HASH'  # Partition key
            }
        ]
        attribute_definitions = [
            {
                'AttributeName': 'id',
                'AttributeType': 'S'  # Assuming id is a string attribute
            }
        ]
        try:
            # Create the table
            response = client.create_table(
                TableName=table_name,
                KeySchema=key_schema,
                AttributeDefinitions=attribute_definitions,
                BillingMode='PAY_PER_REQUEST'
            )
            print("Table creation response:", response)
        except ClientError as e:
            print(f"Error creating table '{table_name}': {e}")
    else:
        print(f"Table '{table_name}' already exists.")
