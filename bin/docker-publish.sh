#!/bin/bash

set -e

APP=k8smap

gcloud auth configure-docker

docker -- push "eu.gcr.io/$GCP_PROJECT_NAME/$APP"

function json_escape {
  echo -n $1 | python -c 'import json,sys; print json.dumps(sys.stdin.read(), ensure_ascii=False, encoding="utf-8")'
}

COMMIT_AUTHOR="${COMMIT_AUTHOR:-$(git log --format=%an -n 1)}"
COMMIT_MESSAGE="${COMMIT_MESSAGE:-$(git log --format=%B -n 1)}"
COMMIT_SHA=$(git rev-parse HEAD)
COMMIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
COMMIT_DESCRIBE=$(git describe)
IMAGE_ID=$(docker images -q eu.gcr.io/$GCP_PROJECT_NAME/$APP:$(git describe))
DOCKER_INSPECT=$(docker inspect $IMAGE_ID)

JSON=$(cat <<EOF
{
  "type": "image",
  "project": "${GCP_PROJECT_NAME}",
  "service": "${APP}",
  "commit": {
    "author": $(json_escape "${COMMIT_AUTHOR}"),
    "message": $(json_escape "${COMMIT_MESSAGE}"),
    "sha": "${COMMIT_SHA}",
    "branch": "${COMMIT_BRANCH}",
    "url": "https://github.com/${TRAVIS_REPO_SLUG}/commit/${COMMIT_SHA}",
    "describe": "${COMMIT_DESCRIBE}"
  },
  "build": {
    "id": "${TRAVIS_BUILD_NUMBER}",
    "url": "https://travis-ci.com/${TRAVIS_REPO_SLUG}/jobs/${TRAVIS_JOB_ID}"
  },
  "dockerInspect": $DOCKER_INSPECT
}
EOF
)

echo $JSON > image.json

cat image.json

gsutil cp image.json gs://${GCP_PROJECT_NAME}-image-metadata/${APP}/travis-build.${TRAVIS_BUILD_NUMBER}.json
