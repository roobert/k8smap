#!/usr/bin/env ruby

# the horror..

require "json"

k8s_config = JSON.parse(`kubectl config view --output json`)

k8s_config["contexts"].each do |context|
  context_data = context["name"].split("_")
  project = context_data[1]
  region  = context_data[2].split("-")[0..-2]
  zone    = context_data[2].split("-")[-1]
  cluster = context_data[3]

  cluster_key = context["context"]["cluster"]
  user_key = context["context"]["user"]

  cluster_address = k8s_config["clusters"].select do |cluster|
    cluster["name"] == cluster_key }[0]["cluster"]["server"]
  end

  access_token = k8s_config["users"].select do |user|
    user["name"] == user_key }[0]["user"]["auth-provider"]["config"]["access-token"]
  end
end
