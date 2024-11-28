# VRV_project
This project demonstrates user authentication, authorization, and role-based access control (RBAC), highlighting key features like protected routes and role assignments.

**Features:**

 **User Authentication**: Secure user registration and login using JWT.
 **Authorization**: Role-based access control for endpoints.
 **Default Role Assignment**: New users are assigned the User role by default.
 **Role Management**: Admins can update user roles via a protected API.
 **Protected Endpoints**: Routes accessible based on user roles (Admin, Moderator, User).

**Admin details for testing:**

You can use the below details for starter to test admin routes.

```
name : "abhilash reddy"
email: "abhilashreddy340@gmail.com"
password: "abhilash"
```

For moderator routes, update a user's role to Moderator using the admin credentials.

**API Endpoints:**

**AUTHENTICATION** :

**1. Register User**

Route : POST /api/user/register
```
Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

```
Response:
Success: 201 Created
Failure: 400 Email already exists
```

**2. Login User**

Route : POST /api/user/login

```
Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}
```
```
Response:
{
  "token": "JWT_TOKEN"
}
```

**ROLE MANAGEMENT**

**3. Update User Role (Admin-only accesible route)**

**Protected Route**

Route : PUT /api/user/admin/update_role

```
Headers:
Authorization: Bearer JWT_TOKEN
```
```
Request Body:
{
  "userId": "user_id_here",
  "role": "admin" //specify role you want to update
}
```
```
Response:
Success: 200 Role updated successfully
Failure: 403 Unauthorized access
```

**4. Moderator and Admin Only Accessible Route**
**Protected Route**

Route : GET /api/user/moderatorOrAdmin

```
Headers:
Authorization: Bearer JWT_TOKEN
```
```
Response:
Success: 200  //if user is either admin or moderator
Failure: 403 Unauthorized access
```


**Project Structure**
```
VRV_project/
├── Controllers/
│   ├── UserController.js
├── Models/
│   ├── User.js
├── Routes/
│   ├── UserRoute.js
├── Middlewares/
│   ├── Passport.js
│   ├── UserMiddlewares.js
├── Validators/
│   ├── LoginValidator.js
│   ├── RegistrationValidator.js
├── .env              # Environment variables
├── isEmpty.js        #utility function just to check whether a value of any type is empty or not.
├── server.js         # Entry point
├── package.json      # Dependencies and scripts
```

**Testing**

Use Postman to test the endpoints. Example collection provided in the postman_collection.json.

**Steps to Test**

```
1. Use the localhost:5000/api/user/register route to create a new user.
2. Use the localhost:5000/api/user/login route to get a JWT token.
3. Use the token to access protected routes:
     Admin-only: api/user/admin/update_role
     Moderator/Admin: api/user/moderatorOrAdmin
```

**Setup Instructions**

```
1. Clone the repository:
  => git clone https://github.com/abhilash696/VRV_project.git

2. Install dependencies:
  => npm install

3.Set up the .env file:
  Please set up a mongodb instance in MongoDB Atlas.  
  URL : https://www.mongodb.com/products/platform/atlas-database .
  => MONGO_URI= <Your MongoDB URI> eg : <mongodb+srv://username:<password>@cluster0.tqc1i.mongodb.net/
  => JWT_SECRET=<YOUR jwt secret> //any secret string you would like
  
4.Start the server:
  => npm run server
  
5.Test the application using Postman or any REST client.
```

**Requirements Satisfied :**

```
1.Implemented user registration and login routes to demonstrate my understanding on Authorization and Authentication.
2.Implement 'admin' only  and 'admin/moderator only'routes to demonstrate my understanding on RBAC logic.
```


License
This project is licensed under the MIT License.
