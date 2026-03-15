Assignment 2 by Ahmed A - SWE645 - Spring 2026
---------------------------------------------------


A) Containerization:
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

B) Rancher password: adminadminadmin or x8fdh3GkRBGmX6bM

		
