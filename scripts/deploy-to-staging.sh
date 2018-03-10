#!/usr/bin/env bash

set -euox pipefail

# SSH cred setup
eval "$(ssh-agent -s)"
chmod 600 .travis/titan_deploy_key
ssh-add .travis/titan_deploy_key

# Build frontend for production
pushd titan-web-client
    yarn install && yarn build
    # Push code to staging env
    pushd build
        scp -o StrictHostKeyChecking=no -r * ${SCP_PATH}
    popd
popd

# TOOD: Build server for production
