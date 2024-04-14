# Aexonic Assignment

-  Used Node Js , Mongodb ,Express Js, Typescript
-  Used bcrypt hash , salt forpassword 
-  For validation used express validator
-  For token generate , Authentication & Authorization used JsonwebToken


# Project Setup

-There should be .env file in root directory if not please create .env file and add below variables.

 SERVER_PORT = 3030
 HOST = localhost
 MONGO_URI ="mongodb://localhost:27017/aexonic"
 JWT_TOKEN_SECRET = CC0A6A9D1A9D8DAE855510B40F5ACE5459E867B1CAE98B68F194A401923AE45C
 JWT_TOKEN_EXPIRE = '3650d'


- To setup the project, all you need to do just run below command 

`npm run build`

`npm run dev`

# DB

This project uses mongodb to connect and execute queries on DB. It is configured to use mongoose as its database.


## API 

### REGISTER API

   URL : http://localhost:3030/api/v1/register
   Method : POST
   body: {
    "firstName": "rinky",
    "lastName": "kandwal",
    "email": "rinky@gmail.com",
    "password":"Test@123",
    "mobile": 9876543210,
    "address": "faridabad , India"
   }


### LOGIN API
   
   URL : http://localhost:3030/api/v1/login
   Method : POST
   body : {
    "email": "rinkykandwal20@gmail.com",
    "password":"Test@123"
    }

  NOTE -- It will generate token , which passed in all rest apis in bearer token in authorization.below

  

### LIST API

   URL : http://localhost:3030/api/v1/user-list
   Method : GET
   Params : page,limit

 NOTE : Passed bearer token in header authorization


### UPDATE  API

   URL : http://localhost:3030/api/v1/update-user
   Method : PUT
   body  : {
    "firstName": "rinky3",
    "lastName": "sharma5",
    "mobile": 9718724669,
    "address": "faridabad , India"
}

Note : Passed user bearer token in header authorization


### SEARCH API

   URL : http://localhost:3030/api/v1/search
   Method : GET
   Params : firstName,lastName,email,mobile,page,limit

 NOTE : Passed bearer token in header authorization

