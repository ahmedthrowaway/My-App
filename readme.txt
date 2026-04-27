Assignment 2 by Ahmed A - SWE645 - Spring 2026
---------------------------------------------------


A) Containerizations:
	Preface - Most docker commands requrie root permissions, so you must usually preface any docker command with "sudo". For example, "sudo docker images" 
	Step 1. Navigate to working directory with source files, create a dockerfile using "vim Dockerfile"
	Step 2. With the Dockerfile open using Vim (or any text editing application of your choosing), enter the following:
		FROM nginx:alpine
		COPY index.html /usr/share/nginx/html/
		COPY survey.html /user/share/nginx/html/
	Step 3. Now, we must build the image using the dockerfile. Run the following command:
		docker build -t [YOUR_DOCKER_TAG] .
		Comfirm that the image was built successfully by running "docker images"
	Step 4. Log into docker. Run the following command:
		docker login -u [YOUR_DOCKERHUB_USERNAME]
		You will be promped to enter a password. You should receive a login successful message.
	Step 5. Tag your image using the following format:
		docker tag [REPOSITORY]:[TAG NAME] [YOUR_DOCKERHUB_USERNAME]/[REPOSITORY]:[TAG NAME]
	Step 6. Push your image to dockerhub (assuming you do not already have a repository created for this image). Run the command:
		docker push [YOUR_DOCKERHUB_USERNAME]/[REPOSITORY]:[TAG NAME]
	Step 7. SSH to your EC2 instance.
	Step 8. Log into docker and run:
		docker pull [YOUR_DOCKERHUB_USERNAME]/[REPOSITORY]:[TAG NAME]

B) Kubernetes deployment:
	Step 1. Create EC2 instance with 30GiB of Storage, T3.Large (T2.Large also works) machine, and Ubuntu AMI (optional). Also, set LabInstanceProfile
	Step 2. Set up Rancher in EC2 instance using instructions in slides.
	Step 3. Install kubectl to be able to communicate with API Server in K8 cluster
	Step 4. Create a deployment configuration file using template on Kubernetes.io site. Search for deployment and you should see a .yaml file example.
		Change the template file to have 3 as replicaset, and change image to your Dockerhub image that you pushed in part A. Customize name and tag.
	Step 5. Create a service configuration file for NodePort service using template also found on Kubernetes.io
		Make sure the selector matches tag in deployment config file. port and targetport should be 80.
	Step 6. Run:
			kubectl apply -f deployment.yaml
			kubectl apply -f service.yaml
	Step 7. Run kubectl get all. Make note of the port number of the NodePort service that was created.
	Step 8. Adjust security group inbound rules to allow connection to NodePort port number from step 7. 
	Step 8. In your browser URL field, enter <YOUR-EC2-IP-ADDR>:<NODEPORT_PORTNUM). You should see your website now.

C) CI/CD Pipeline
	Step 1. Set up Github repository. Move all source files there.
	Step 2. On EC2 machine, generate an SSH key and link it to your Github repo.
	Step 3. Make a new directory on EC2 machine and clone Github repo using SSH.
	Step 4. Install Jenkins on EC2. Make sure it is running using the command systemctl status jenkins.
	Step 5. In your browser URL file, <EC2-IP-ADDR>:8080. Follow instructions to log in to Jenkins
	Step 6. Create two new credentials: one for your Dockerhub account and upload a secret file for your kube config file.
	Step 6. Build a new pipeline. Pipeline script from SCM. Enter in your Github repository URL and provide Github credentials. Select Poll and enter "* * * * *" to poll every minute.
	Step 7. Create a Jenkinsfile in your repo directory on EC2. Git add ., Git commit -m "Added Jenkinsfile", Git push.
		Next time that Jenkins polls your repo, they should see the update and build the pipeline according to the stages in your Jenkinsfile.
	Step 8. Monitor Jenkins build to see if build ran successfully or failed. Review logs if failure occurs.
		
