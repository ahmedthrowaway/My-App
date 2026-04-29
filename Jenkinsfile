//Assignment 3 by Ahmed A - SWE645 - Spring 2026 - Jenkinsfile for CI/CD Pipeline
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
		    helm upgrade --install student-survey ./helm/student-survey \
		      --set frontend.image.tag=$DOCKER_TAG \
		      --set backend.image.tag=$DOCKER_TAG

		    kubectl rollout status deployment/student-survey-frontend
		    kubectl rollout status deployment/student-survey-backend
		    '''
		}
	    }
	}
    }
}
