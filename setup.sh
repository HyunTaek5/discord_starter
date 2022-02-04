#!/bin/bash

echo Discord Bot Name? "It will be directory name."
# shellcheck disable=SC2162
read botName

# shellcheck disable=SC2103
cd ..
cp -r discord_starter "$botName"

# shellcheck disable=SC2164
cd "$botName"
rm -rf .git
git init
