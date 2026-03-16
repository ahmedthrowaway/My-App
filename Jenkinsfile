// Ahmed A - SWE645 - Spring 2026 - This is the Jenkinsfile to build a CI/CD pipeline for Assignment 2

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
                    sh 'docker login -u $DOCKER_USER -p $DOCKER_PASS'
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
            		kubectl apply -f $WORKSPACE/deployment.yaml
            		kubectl apply -f $WORKSPACE/service.yaml

            		kubectl set image deployment/student-survey student-survey=$DOCKER_IMAGE:$DOCKER_TAG || true

            		kubectl rollout status deployment/student-survey
            		'''
        		}
    		}
	}	
    }
}
