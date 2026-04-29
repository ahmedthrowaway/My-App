PLACE THESE FILES HERE IN YOUR REPO:

project-root/
  helm/
    student-survey/
      Chart.yaml
      values.yaml
      templates/
        frontend-deployment.yaml
        frontend-service.yaml
        backend-deployment.yaml
        backend-service.yaml

JENKINS DEPLOY COMMAND TO USE:

helm upgrade --install student-survey ./helm/student-survey   --set frontend.image.tag=$DOCKER_TAG   --set backend.image.tag=$DOCKER_TAG
