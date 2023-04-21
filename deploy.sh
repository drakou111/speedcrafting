#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m "New Deployment $(date '+%Y-%m-%d %H:%M:%S')"
git push -f https://github.com/drakou111/speedcrafting.git master:gh-pages

cd -