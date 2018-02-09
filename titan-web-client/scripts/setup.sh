#!/usr/bin/env bash

SCRIPT_PATH="$( cd "$(dirname "$0")" ; pwd -P )"
APP_PATH="${SCRIPT_PATH}/.."

for d in src/*/; do
    if [[ ${d} = *"titan-"* ]]; then
         MODULE_PATH=$(cut -d "/" -f 2 <<< "${d}")
         echo "Linking module: ${MODULE_PATH}"

        cd "${APP_PATH}/${d}"
        yarn link > /dev/null 2>&1
        cd ${SCRIPT_PATH}
        yarn link "${MODULE_PATH}" > /dev/null 2>&1
    fi
done

echo "Setup complete"