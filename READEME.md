# ComicClanApiDemo
This is a microservice API for a social version of ComicClan.

## DB DUMMY INFORMTION ACCESS
- user_name: **m@gmail.com** password: **cat123**
- user_name: **233rdasd@gmail.com** password: **dog123**
- user_name: **43f@hotmail.com** password: **dog**
- user_name: **??>UDHJKwio2d@aol.com** password: **cat**
##### ***THESE EMAILS SHOULD NOT BE VAILD***

## Running
To run the project, you must have docker installed on your computer. Once you have that installed and running, run
```console
docker-compose up
```
from the project root. This will build all of the needed images, containers, and volumes to setup the docker architecture.
## Understanding the API
### Route Overview
These are the following valid endpoints:
- /api/signup
- /api/login
- /api/posts
- /api/comments
#### GET /api/signup
Data consists of:
```javascript
{
 "user_name": "<email>",
 "password": "<password>"
}
```
#### GET /api/login
Data consists of:
```javascript
{
 "user_name": "<email>",
 "password": "<password>"
}
```
#### GET /api/posts
Data consists of:
```javascript
{
 "pages": <page number>
}
```
#### POST /api/posts
Data consists of:
```javascript
{
 "content": "<post content>"
}
```
#### GET /api/comments
Data consists of:
```javascript
{
 "pages": <page number>
}
```
#### POST /api/comments
Data consists of:
```javascript
{
 "post_id": <id of post being commented on>,
 "comment": "<post comment>"
}
```
### Route Response Information
Each API endpoint will return either a success status or an error status, as well as a payload that looks like this:
```javascript
{
 "auth": <true || false>,
 "message": {
   "token": "<token>"
   }
}
```
Every message contains either the error message, or the information desired. Check the auth value of the paylod or 
the status code response to gurantee that you will be getting information to hydrate client application as desired.

### Route Setup
The routes for the API take a bit of setup before you use the majority of them. They all require the following headers:
```console
Content-Type: application/json
```
Routes are also authenticated via JWT. Each token payload is based on the user id, user_name, **TOKENS ARE SET TO EXPIRE
AFTER AN HOUR**.
If you want to modify the token expiration time, the variable is in **server/src/api/routes.js/**
```javascript
const tokenExpiration = 3600
```
You can get a token by:
- **Fetching a user** through the */api/login* endpoint
- **Adding a user** through the */api/signup* endpoint


## Testing
Testing for the endpoints of the APIs are done through the local setup of a mysql database. Once you have that installed
and running, run
```console
source <project-root>/db/src/test-dump.sql
```
This builds the db from the schema file schema. 
*NOTE: This scheme file is also used for the main microservice application 
as well*
### You will also need to edit the following files:
- 'testRun.js' file inside of the **server/src/tests/** directory
Set
```javascript
const testRun = true
```
- 'routes.js' file inside of the **server/src/api** directory. You will need to comment lines 13-19, the first 'pool' object
```javascript
/*const pool = mysql.createPool({
    host: "db",
    port: "3306",
    user: 'root',
    password: "password",
    database: "mydb",
});*/
```
and uncomment lines 22-28, the second 'pool 'object'
```javascript
const pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: 'root',
    database: 'mydb',
    multipleStatements: true,
});
```
In another terminal window, run this sequence from the project root:
```console
cd server/src/
```
```console
npm run test
```
### All test cases should pass. All tests are in the **server/src/tests/** directory
