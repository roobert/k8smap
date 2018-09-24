#!/bin/bash

set -e

APP=k8smap
COMMIT_DESCRIBE=$(git describe --all --tags)
IMAGE="eu.gcr.io/$GCP_PROJECT_NAME/$APP"

gcloud -q auth configure-docker

echo "image name: $IMAGE"

docker push "$IMAGE"

function json_escape {
  echo -n $1 | python -c 'import json,sys; print json.dumps(sys.stdin.read(), ensure_ascii=False, encoding="utf-8")'
}

COMMIT_AUTHOR="${COMMIT_AUTHOR:-$(git log --format=%an -n 1)}"
COMMIT_MESSAGE="${COMMIT_MESSAGE:-$(git log --format=%B -n 1)}"
COMMIT_SHA=$(git rev-parse HEAD)
COMMIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
IMAGE_ID=$(docker images -q $IMAGE)
DOCKER_INSPECT=$(docker inspect $IMAGE_ID)
SS_PROJECT=$(echo $GCP_PROJECT_NAME | cut -d\- -f3)


JSON=$(cat <<EOF
{
  "type": "image",
  "project": "${SS_PROJECT}",
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

cat image.json | jq .

gsutil cp image.json gs://${GCP_PROJECT_NAME}-image-metadata/${APP}/travis-build.${TRAVIS_BUILD_NUMBER}.json
