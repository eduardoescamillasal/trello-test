# kanban-backend/utils/db.py

from dotenv import load_dotenv
load_dotenv()

import boto3
import os

def get_dynamodb_resource():
    return boto3.resource(
        'dynamodb',
        region_name=os.getenv('AWS_DEFAULT_REGION'),
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        endpoint_url=os.getenv('DYNAMODB_ENDPOINT')  # If using DynamoDB Local
    )
