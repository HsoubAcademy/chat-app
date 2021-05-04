## Requirements
* NodeJs
* MongoDB
* GIT

## Backend

### Setup
In the project directory, go to server dir:
* Install dependencies by `npm install`.
* Create a copy of .env.example file to .env `cp .env.example .env`.
* In `.env` file set your mongodb `DB_URL` and preferred port `PORT`.
* Start server by `npm start`.

## Frontend 

### Setup `Local`
In the project directory, go to client dir:
* Install dependencies by `npm install`.
* Create a copy of .env.example file to .env `cp .env.example .env`.
* In `.env` file set your server url `REACT_APP_SOCKET`.
* In `package.json` set your proxy server file `"proxy": "http://localhost:3001"`.
* Start application by `npm start`.

### Setup `Production - Remote`
In the project directory, go to client dir:
* Install dependencies by `npm install`.
* Create a copy of .env.example file to .env `cp .env.example .env`.
* Set your server url `REACT_APP_SOCKET`.
* Start application by `npm run build`.
* Move all contents of `build` dir to `server/public/`.
* Run the application by request node application url.
