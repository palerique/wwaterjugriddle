#!/usr/bin/env bash
set -e  # fail on any error
set -x  # display commands being run

# Check if docker is installed
if ! command -v docker &> /dev/null
then
    echo "docker is not installed. Please install it first."
    exit
fi

# Build the Docker image
docker build -f apps/api/Dockerfile -t br.com.palerique/water-riddle-api:latest . & \
docker build -f apps/web/Dockerfile -t br.com.palerique/water-riddle-web:latest .
