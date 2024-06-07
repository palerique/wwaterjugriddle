#!/bin/bash
set -e  # fail on any error

# Check if docker is installed
if ! command -v docker &> /dev/null
then
    echo "docker is not installed. Please install it first."
    exit
fi

# Build the Docker image
docker build -f sheep-monolith/Dockerfile -t sheep-monolith:1.0.0 .

#docker run -p 8080:8080 sheep-monolith:1.0.0