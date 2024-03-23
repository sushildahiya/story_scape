# Story Scape
A blogging platform built on MERN stack.
# Hosted URL

  Frontend URL: https://story-scape-git-main-sushils-projects-5ce2d618.vercel.app/
  Backend URL: https://story-scape.onrender.com

  Note: Images will not be visible on hosted URL due to render.com issue as disk persistent is a paid service.
  
# Setting up the app

## Pre-requisite:

  *  NodeJs and npm should be installed and environment path should be setuped.

1. Create a directory. Using terminal navigate into the directory and run following command.

    ### $ git clone https://github.com/sushildahiya/story_scape.git

2. Once the project gets cloned, navigate inside the directory "story_scape" using ternminal.

3. Now run below command to install node modules needed to run the app.

    ### $ npm i

       OR

    ### $ npm i --force

5. Navigate inside the other directory to install node modules for backend using terminal.

6. Run below command

    ### $ npm i

       OR

    ### $ npm i --force

7. Create a .env file inside "story_scape" directory with following key-value pairs.

    REACT_APP_BACKEND_ENDPOINT = <ENDPOINT>

Note: In case if user is hosting the backend from local system use BACKEND_ENDPOINT=http://localhost:8000. Don't use '/' at the end of URL.
 
8. Create a .env file inside "story_scape_be" directory with following key-value pairs.

     DATABASE_URL=<YOUR_MONGODB_URL>
     JWT_KEY=<YOUR_JWT_SECERET_KEY>

9. Once node modules are installed, open to terminal and navigate inside the respective directory.

10. Run below command.

    ### $ npm start


Note: React app is hosted on default port 3000 and Backend express app is hosted on default port 8000.4

# Library Used:
## * Client side(React):

* Primeact
* React router dom
* React icons
* React quill
* React avatar edit
* React toastify

## * Server side(NodeJS):

* Express
* Passport JWT
* Jsonwebtoken
* Mongoose
* Body parser
* Multer
* Nodemon
* Bcrypt
* Cors

# Screenshots

## Login page
  
![Screenshot (90)](https://github.com/sushildahiya/story_scape/assets/97718833/5d0c3ab4-1c57-46e0-8e32-2aaa66a1a8a1)

## Signup page

![Screenshot (91)](https://github.com/sushildahiya/story_scape/assets/97718833/4ae41ebf-512b-46af-ba71-57bd31d096ce)

### Signup validations

![Screenshot (95)](https://github.com/sushildahiya/story_scape/assets/97718833/4df3e706-2f03-44d3-b99f-03cf0ebc7245)

![Screenshot (96)](https://github.com/sushildahiya/story_scape/assets/97718833/d53b6c55-909d-4fcf-8d60-1e3438115907)

## Our Story page
  
  ![Screenshot (89)](https://github.com/sushildahiya/story_scape/assets/97718833/1103ae3d-c4e8-4e72-b1a4-d9cae3a2f299)

## Update user avatar

![Screenshot (92)](https://github.com/sushildahiya/story_scape/assets/97718833/59d0fd7f-8f3b-4623-a890-65bb23148764)

## Create/Post story

![Screenshot (93)](https://github.com/sushildahiya/story_scape/assets/97718833/71a2e21f-c107-4a4d-962f-24faaf235c0e)

## Creating post (with data)

![Screenshot (94)](https://github.com/sushildahiya/story_scape/assets/97718833/f59d40e1-67f7-4ded-9595-eef1c134accd)

## Post(details)

![Screenshot (97)](https://github.com/sushildahiya/story_scape/assets/97718833/847c5d88-ff76-4c95-86b4-6c01e9d4c4a3)

## Dashboard

![Screenshot (99)](https://github.com/sushildahiya/story_scape/assets/97718833/57acb591-05ad-4da4-ade1-be7bcc4b4fcb)
