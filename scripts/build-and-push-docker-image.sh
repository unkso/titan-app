#!/usr/bin/env bash

docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}
docker build --rm -f .travis/Dockerfile -t unkso/titan-image:latest .
docker push unkso/titan-image:latest
