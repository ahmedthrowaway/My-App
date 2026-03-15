pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "ahmedthrowaway/my-app"
        DOCKER_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-pass',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $DOCKER_IMAGE:$DOCKER_TAG'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig-id', variable: 'KUBECONFIG')]) {
                    sh '''
export KUBECONFIG=$KUBECONFIG
# Apply the deployment and service YAMLs
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Update the deployment image to the new build tag
kubectl set image deployment/My-App My-App=$DOCKER_IMAGE:$DOCKER_TAG || true

# Wait for rollout to complete
kubectl rollout status deployment/My-App
'''
                }
            }
        }
    }
}
