#!/bin/sh
set -e
if [ "${TABLEAU_HOST}" == "$null" ] || [ "${USERNAME}" == "$null" ]; then
    echo "TABLEAU_HOST or USERNAME cannot be empty"
    exit 1
fi

sed -i 's#${USERNAME}#'${USERNAME}'#g' /usr/src/app/server.js
sed -i 's#${TABLEAU_HOST}#'${TABLEAU_HOST}'#g' /usr/src/app/server.js
sed -i 's#${PORT}#'${PORT-8080}'#g' /usr/src/app/server.js
sed -i 's#${IFRAME_WIDTH}#'${IFRAME_WIDTH--1}'#g' /usr/src/app/server.js
sed -i 's#${IFRAME_HEIGHT}#'${IFRAME_HEIGHT--1}'#g' /usr/src/app/server.js
exec "$@"
