# Backend Server
 - Run local development with hot reload: NPM run dev
 - Compile/Check: Npm run build
 - Start the compiled file: NPM run start

## Run docker
 - npm run build: to compile before "sudo docker-compose up --build"
 - docker-compose up: Start both the app and postgres
 - docker-compose down

## Access backend
 - Fetch to URL 192.168.1.123:3000
 - Current stream: '/stream'

## Route
 - Includes: '/user', '/music' , '/listen' , '/auth'
 - Unauthenticated request can only go to POST /user and POST /auth, the rest require authenticate
 - /music are for playlist(read, create, update, delete songs)
 - /user are for read, create, update and delete account

## Return data

 - Un-authenticated: {success: false, message: string }, statusCode 401
 - Bad request: {success: false, message: string }, statusCode 400
 - Success getting data: {success: true, data: ... }, statusCode 200
 - Success update data: {success: true, message: string }, statusCode 201
