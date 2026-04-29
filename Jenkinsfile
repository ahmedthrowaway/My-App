pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    environment {
        FRONTEND_IMAGE = "ahmedthrowaway/my-app-frontend"
        BACKEND_IMAGE  = "ahmedthrowaway/my-app-backend"
        DOCKER_TAG     = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build --target frontend -t $FRONTEND_IMAGE:$DOCKER_TAG .
                docker build --target backend  -t $BACKEND_IMAGE:$DOCKER_TAG .
                '''
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-pass',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                sh '''
                docker push $FRONTEND_IMAGE:$DOCKER_TAG
                docker push $BACKEND_IMAGE:$DOCKER_TAG
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig-id', variable: 'KUBECONFIG')]) {
                    sh '''
                    kubectl apply -f k8s/frontend-deployment.yaml
                    kubectl apply -f k8s/frontend-service.yaml
                    kubectl apply -f k8s/backend-deployment.yaml
                    kubectl apply -f k8s/backend-service.yaml

                    kubectl set image deployment/student-survey-frontend frontend=$FRONTEND_IMAGE:$DOCKER_TAG || true
                    kubectl set image deployment/student-survey-backend backend=$BACKEND_IMAGE:$DOCKER_TAG || true

                    kubectl rollout status deployment/student-survey-frontend
                    kubectl rollout status deployment/student-survey-backend
                    '''
                }
            }
        }
    }
}
