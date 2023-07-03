RestAPI with Login, Registration, CRUD Operations, and JWT Authentication
This is a documentation for a RestAPI that provides features such as user login, registration, CRUD (Create, Read, Update, Delete) operations, and JWT (JSON Web Token) authentication. This API allows users to perform various operations on a database using HTTP methods.

Table of Contents
Getting Started
Installation
Setting Up the Database
Authentication
Endpoints
User Registration
User Login
CRUD Operations
Create
Read
Update
Delete
Error Handling
Contributing
License
Getting Started
Installation
To get started with the RestAPI, follow these steps:

 1. Clone the repository
 2. cd Files (Directory path in which files are located)
 3. npm install express body-parser mongoose jasonwebtoken  (Install Dependencies)
 4. node App.js (Start the server)

The server should now be running on http://localhost:3000.

Setting Up the Database
The RestAPI requires a database to store user information and other resources. By default, it is configured to use a MongoDB database. Follow these steps to set up the database:

Install and start a MongoDB server if you haven't already.

Configure the database connection in the .env file.

Change the mongodb connection string in config.js to connect to your database and name the database to "TaskDb".

Authentication
This RestAPI uses JWT authentication to secure the endpoints. To access protected routes, clients need to include a valid JWT token in the Authorization header of their HTTP requests.

To obtain a JWT token, clients should first register a new user account using the /register endpoint. Then, they can authenticate by sending a POST request to the /login endpoint with their credentials. Upon successful login, the server will respond with a JWT token, which should be included in subsequent requests.

To include the JWT token in the request header:

Authorization: Bearer <JWT Token> (Postman)

Endpoints
User Registration
Endpoint: /register
Method: POST
Description: Registers a new user account.

Request Body:

{
  "Name": "example_user",
  "email": "example@12.com",
  "Password":"Exampple password"
}

Response: 
{
  "token": <token>
}

User Login
Endpoint: /login
Method: POST
Description: Authenticates a user and returns a JWT token.

Request Body:

{
  "email": "example@12.com",
  "Password":"Exampple password"
}

Response:

{
 "token":<token>
}

CRUD Operations
Create
Endpoint: /users
Method: POST
Description: Creates a new resource.

Request Body:

{
  "Name":"Example Name",
  "email": "example@12.com",
  "Password":"Exampple password"
}

Response:

res.send("Added")

Read
Endpoint: /users
Method: GET
Description: Retrieves all resources.

Response:

{
  "Name":"Example Name",
  "email": "example@12.com",
  "Password":"Exampple password"
}

Update
Endpoint: /users/:id
Method: PUT
Description: Updates an existing resource.

Request Body:

{
  "Name":"Updated Name"
}

Response:

{
  "Name":"Updated Name",
  "email": "example@12.com",
  "Password":"Exampple password"
}

Delete
Endpoint: /users/:id
Method: DELETE
Description: Deletes a resource by its ID.

Response:

res.send("Deleted")

Error Handling
The RestAPI follows standard HTTP error handling. If an error occurs, the server will respond with an appropriate HTTP status code and a corresponding error message in the response body.

For example, if a user provides invalid credentials during login, the server will respond with a status code of 401 Unauthorized and a response body like this:

{
  "error": "Password Incorrect!!"
}

Contributing
Contributions to this project are welcome. To contribute, follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and commit them.
Push your changes to your fork.
Submit a pull request describing your changes.
License
This RestAPI is open-source software licensed under the MIT license.











    
