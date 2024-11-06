import boto3
from botocore.exceptions import ClientError

def delete_table(table_name):
    dynamodb = boto3.resource(
        'dynamodb',
        endpoint_url='http://localhost:8000',  
        region_name='us-west-2',               
        aws_access_key_id='blablabla',          
        aws_secret_access_key='blablabla'
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
