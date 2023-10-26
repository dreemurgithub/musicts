### Development and start up

- Run local development with hot reload: NPM run dev
- Compile/Check: Npm run build
- Start the compiled file: NPM run start

### Run docker

- npm run build: to compile before "sudo docker-compose up --build"
- docker-compose up: Start both the app and postgres
- docker-compose down

### Access backend

- Fetch to URL 192.168.1.123:3000
- Current stream: '/stream'

## General infors

### Routes

- Includes: '/user', '/music' , '/listen' , '/auth'
- Unauthenticated request can only go to POST /user and POST /auth, the rest require authenticate
- /music are for playlist(read, create, update, delete songs)
- /user are for read, create, update and delete account

### Return data

- Un-authenticated: {success: false, message: string }, statusCode 401
- Bad request: {success: false, message: string }, statusCode 400
- Success getting data: {success: true, data: ... }, statusCode 200
- Success update data: {success: true, message: string }, statusCode 201

## '/music'Route, for music infor, search

### All avaiable music at: get '/music'

- always return an ojbect with key as id
- { ...,abcd : {
  title: string,
  artist: string,
  id: "abcd"
  },...}

### One music at: get '/music/:id'

- Correct id: {id: "\_k3y2tVWK74"} => {
  "title": "[Vietsub] Luyến Nhân Tâm - 恋人心 - Hoa Thiên Cốt",
  "artist": "Huyền Vũ",
  "id": "\_k3y2tVWK74"
  }
- Wrong id return a 400 with message

### Search example for: post '/music'

- This is a search request to youtube, the return below is for {search: "my love" }
- [...{
  "id": {
  "videoId": "ulOb9gIGGd0"
  },
  "url": "https://www.youtube.com/watch?v=ulOb9gIGGd0",
  "title": "Westlife - My Love (Official Video)",
  "description": "",
  "duration_raw": "4:14",
  "snippet": {
  "url": "https://www.youtube.com/watch?v=ulOb9gIGGd0",
  "duration": "4:14",
  "publishedAt": "14 years ago",
  "thumbnails": {
  "id": "ulOb9gIGGd0",
  "url": "https://i.ytimg.com/vi/ulOb9gIGGd0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDZWATRJ2YyEZ7pE-tFePiONOSctw",
  "default": {
  "url": "https://i.ytimg.com/vi/ulOb9gIGGd0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDZWATRJ2YyEZ7pE-tFePiONOSctw",
  "width": 720,
  "height": 404
  },
  "high": {
  "url": "https://i.ytimg.com/vi/ulOb9gIGGd0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDZWATRJ2YyEZ7pE-tFePiONOSctw",
  "width": 720,
  "height": 404
  },
  "height": 404,
  "width": 720
  },
  "title": "Westlife - My Love (Official Video)",
  "views": "340454225"
  },
  "views": "340454225"
  },...]
 - Bad request and no infor search will return []

## '/listen' route, for stream, download

### All the avaiable id - get request to '/listen'
 - Always an array of id []

### Download new MP3 to server - put request to '/listen'
 - send {id: string} , if the id is on youtube, the request should return status 200 and the song information, otherwise send a 400 with a message

### Download 3 file, return only current playing - post request to '/listen'
 - send {current: string, next: string, before: string} , if the current is on youtube, the request should return status 200 and the song information, otherwise send a 400 with a message
 - The server will return the current song first and save the infor on disk later

### Stream music at '/listen/:id' , with id is from youtube video

- Connect audio to get request in /listen/:id should allow listening to mp3.
- All the avaiable id can be found at a get request to /listen
