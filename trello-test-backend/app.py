import os
import sys

# Get the current script's directory
current_script_directory = os.path.dirname(os.path.abspath(__file__))

# Get the project root path
project_root = os.path.abspath(os.path.join(current_script_directory, os.pardir))

# Append the project root and current script directory to the system path
sys.path.append(project_root)
sys.path.append(current_script_directory)

from fastapi import FastAPI, Response, Request
from graphqls.schemas.schema import Query
from graphqls.mutations.mutations import Mutation
from graphene import Schema
from starlette_graphene3 import GraphQLApp, make_playground_handler
from fastapi.middleware.cors import CORSMiddleware

# Define allowed origins
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:8080",
]

app = FastAPI(title="mini-kanban-backend", description="GraphQL APIs")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

schema = Schema(query=Query, mutation=Mutation)

# Basic test endpoint
@app.get("/")
async def root():
    return {"message": "Hello World"}

# Explicitly handle OPTIONS for /graphql
@app.options("/graphql")
async def graphql_options():
    return Response(status_code=200)

# Use add_route instead of mount to allow specific methods on /graphql
app.add_route("/graphql", GraphQLApp(schema=schema, on_get=make_playground_handler()), methods=["GET", "POST", "OPTIONS"])
