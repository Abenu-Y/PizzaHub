# 🍕 Pizza Ordering Service

## Project Overview

The Pizza Ordering Service is a full-stack web application that enables users to order pizzas with various toppings from multiple restaurants. It includes a comprehensive user management system that distinguishes between customers and restaurant managers, along with robust role-based access control to ensure secure operations. The application provides features for restaurant managers to add or update pizza menus and manage orders, while customers can view pizza menus, place orders, and track their order history.

<div style="padding:'10px' "></div>



![Pizza Ordering Overview](./client/src/assets/readme/first.jpg) <!-- Add image for project overview -->

## Features

- User Management: 
  - Customers can browse, order pizzas, and view order history.
  - Restaurant managers can add/manage pizzas and toppings, view all orders, and update order statuses.

- Restaurant Management: 
  - Support for multiple restaurants, each with its own menu.
  - Super admin role for managing restaurant staff and permissions.

- Pizza and Toppings Management: 
  - Dynamic creation and management of pizzas and toppings.
  
- Order Management: 
  - Customers can place orders with selected toppings and view their order history.
  - Restaurant managers can update order statuses.

- Role Management: 
  - Internal user roles with customizable permissions for restaurant staff.

  ![Role Management](./client/src/assets/readme/second.png) <!-- Add image for role management -->

## Tech Stack

- Frontend:
  - React (with Vite)
  - Material UI for UI components
  - Material React Table for data tables
  - Zod for form validation
  - Axios for API calls
  - CASL for authorization
  - React Router for navigation

- Backend:
  - Node.js (Express framework)
  - PostgreSQL for the database
  - JWT for authentication
  - Bcrypt for password hashing


# 🍕 Pizza Ordering Service API Endpoints

## 🔗 API Endpoints

### 🔒 Authentication

- POST /api/auth/register  
  Register a new customer or restaurant manager.  
  <span style="color: yellow;">Request:</span>  
  ```http 
  POST http://localhost:3000/api/auth/register
  Content-Type: application/json

  {
    "email":"abeneyoseph005@pizza.com",
    "password":"abenez",
    "location":"dilla",
    "phoneNumber":"0972685212"
  }
  ```

  <span style="color: green;">Response:</span>
  ```json
   {
    "message": "User registered successfully.",
    "status": 201
   }
    



- POST /api/auth/signin  
  Log in and retrieve a JWT token.
  <span style="color: yellow;">Request:</span>
  ```http  
  POST http:localhost:5173/api/auth/signin
  Content-Type: application/json

  {
    "email":"abeneyoseph@pizza.com",
    "password":"abenez",
  }
  ```

  <span style="color: yellow;">Response:</span>
  ```json
    {
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicmVzdGF1cmFudElkIjpbeyJ1c2VyX2lkIjoxLCJyb2xlX2lkIjoxLCJyZXN0YXVyYW50X2lkIjoxLCJkZWxldGVkX2F0IjpudWxsfV0sImlhdCI6MTcyOTUyMTI0OCwiZXhwIjoxNzI5NTMyMDQ4fQ.j9BnPsUIXI-MYIrnt1oLAqKpk9tAGm0M-J0iT1pLxpA"
    },
    "status": 200,
    "message": "user successfully logged in."
  }


- **POST** `/api/auth/super_admin_register`  
  Register a super admin for the restaurant (protected, JWT required).
  <span style="color: yellow;">**Request:**</span>
  ```http  
  POST http://localhost:5173/api/auth/super_admin_register
  Content-Type: application/json

  {  
     "adminName":"AbenezerYospeh" ,
    "restaurantName":"Delight005",
    "email":"abeneyoseph005@pizza.com",
    "password":"abenez",
    "location":"dilla",
    "phoneNumber":"0972685212"
  }

  ```
  <span style="color: yellow;">Response:</span>
  ```json
    {
    "message": "User made super admin successfully."
   }

### 🍕 Menu Management

- **POST** `/api/menu/add`  
  Add a new menu item (protected, requires role authorization: **create**).  
  <span style="color: yellow;">**Request:**</span>
  ```http 
  POST http:localhost:3000/api/menu/add
  Content-Type: application/json
  
  <span style="color: green;">Response:</span>
      {
    "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com"
    },
    "status": "success",
    "message": "User data retrieved successfully."
    }
    

- **GET** `/api/menu/all`  
  Retrieve all available pizza menus. 
  <span style="color: yellow;">**Request:**</span>
  ```http ...
  GET http:localhost:3000/api/menu/all
  ```

  <span style="color: green;">Response:</span>
  ```json
      {
    "status": 200,
    "message": "All menu",
    "data": [
        {
            "pizza_id": 16,
            "pizza_name": "BBQ Chicken",
            "pizza_base_price": "15.99",
            "restaurant_id": 4,
            "restaurant_name": "Delight003",
            "toppings": [
                {
                    "name": "BBQ Sauce",
                    "price": 1
                },
                {
                    "name": "Chicken",
                    "price": 2
                },
                {
                    "name": "Red Onions",
                    "price": 0.75
                },
                {
                    "name": "Cilantro",
                    "price": 0.5
                },
                {
                    "name": "Cheddar",
                    "price": 1.5
                },
                {
                    "name": "Jalapenos",
                    "price": 1
                }
            ]
        },
         //  other menus
        }
        
      
  

- GET /api/menu/single/:id  
  Get details of a specific pizza item by ID.

### 📦 Order Management


- POST /api/order/add  
  Place a new order (protected, requires JWT).
  <span style="color: yellow;">Request:</span>
  ```http
  POST http:localhost:3000/api/order/add
  Content-Type: application/json
  {
    "customer_id": 1,
    "restaurant_id": 1,
    "total_price": 34.99,
    "orderDetails": [
        {
            "pizza_id": 1,
            "topping_id": 1,  // If no topping
            "quantity": 2
        },
        {
            "pizza_id": 1,
            "topping_id": 2,  // Assuming topping_id can be null
            "quantity": 1
        }
    ]
  }
  ```
   


 <span style="color: yellow;">**Response:**</span>
 ```json
  {
    "status": 200,
    "message": "Order added successfully",
    "orderId": 22
  }
 
 
  
- GET /api/order/get-order  
  Retrieve the order history of the currently authenticated user.
  <span style="color: yellow;">Request:</span>
  ```http
        GET http://localhost:3000/api/order/get-order
  ```

  <span style="color: yellow;">**Response:**</span>
  ```json
  {
    "status": 200,
    "data": [
        {
            "id": 3,
            "customer_id": 1,
            "restaurant_id": 1,
            "status": "Pending",
            "total_price": "34.99",
            "created_at": "2024-10-01T16:42:03.848Z",
            "deleted_at": null
        },
        {
            "id": 2,
            "customer_id": 1,
            "restaurant_id": 1,
            "status": "ready",
            "total_price": "34.99",
            "created_at": "2024-10-01T16:39:02.183Z",
            "deleted_at": null
        },
        {
            "id": 4,
            "customer_id": 1,
            "restaurant_id": 1,
            "status": "Delivered",
            "total_price": "34.99",
            "created_at": "2024-10-02T11:59:52.547Z",
            "deleted_at": null
        },
  }
  
- PUT /api/order/status/:id  
  Update the status of an order (protected, requires role authorization: update).

- GET /api/order/get-all-orders  
  Retrieve all orders for the restaurant (protected, requires role authorization: read).

### 🔧 Role Management

- POST /api/role/create-role  
  Create a new role with specific permissions (protected, requires role authorization: create).

- GET /api/role/roles  
  Get a list of all available roles (protected, requires role authorization: read).

- PUT /api/role/drop  
  Delete an existing role (protected, requires role authorization: delete).

### 👤 User Management

- GET /api/user/all  
  Fetch data for all users in the restaurant (protected, requires role authorization: read).

- POST /api/user/add-user  
  Add a new user to the restaurant (protected, requires role authorization: create).

- PUT /api/user/drop-user  
  Remove a user from the restaurant (protected, requires role authorization: delete).

### 🔧 Installation

- GET /install  
  Run installation setup (initial setup endpoint).

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pizza-ordering-service.git
   cd pizza-ordering-service


### Install backend dependencies
cd server
npm install

### Install frontend dependencies
cd client
npm install


### Start backend server
npm run dev

### Start frontend (Vite) development server
npm run dev


## Frontend Folder Structure

```bash
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── About/
│   │   │   └── About.tsx
│   │   ├── Auth/
│   │   │   ├── AdminRegistration.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── Carousel/
│   │   │   ├── Carousel.css
│   │   │   ├── custom.tsx
│   │   │   └── FeaturedPizza.tsx
│   │   ├── Dashboard/
│   │   │   ├── DashAddMenu.tsx
│   │   │   ├── DashBoardOrder.tsx
│   │   │   ├── DashBoardRole.tsx
│   │   │   ├── DashBoardSideBar.tsx
│   │   │   ├── DashBoardUser.tsx
│   │   │   └── makeData.ts
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── FooterNavigationBar.tsx
│   │   ├── Header/
│   │   │   └── Header.tsx
│   │   ├── Modal/
│   │   │   ├── AddRoleModal.tsx
│   │   │   ├── AddUserModal.tsx
│   │   │   ├── ConfirmationDialog.tsx
│   │   │   ├── OrderDetail.tsx
│   │   │   └── RoleDetail.tsx
│   │   ├── MyDataTable/
│   │   ├── PizzaCard/
│   │   │   └── PizzaCard.tsx
│   │   ├── Restaurant/
│   │   │   ├── Card.tsx
│   │   │   ├── Fasting.tsx
│   │   │   ├── Popular.tsx
│   │   │   └── RestaurantList.tsx
│   │   ├── SearchAndOrder/
│   │   │   └── SearchAndOrder.tsx
│   ├── context/
│   │   └── authContext.tsx
│   ├── pages/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── Home/
│   │   │   └── Home.tsx
│   │   ├── NotFound/
│   │   │   ├── NotFound.tsx
│   │   │   └── notfound.module.css
│   │   ├── Order/
│   │   │   ├── OrderDetail.tsx
│   │   │   └── OrderHistory.tsx
│   ├── services/
│   │   ├── permission/
│   │   │   └── permission.service.ts
│   │   ├── auth/
│   │   │   └── auth.service.ts
│   │   ├── dashboardMenu/
│   │   │   └── dashboardMenu.service.ts
│   │   ├── dashboardRole/
│   │   │   └── dashboardRole.service.ts
│   │   ├── dashboardUser/
│   │   │   └── dashboardUser.service.ts
│   │   ├── order/
│   │   │   └── order.service.ts
│   │   └── pizza/
│   │       └── pizza.service.ts
│   ├── utils/
│   │   ├── data/
│   │   │   ├── constants.tsx
│   │   │   └── image.ts
│   │   ├── decode/
│   │   │   └── payLoad.ts
│   │   └── validation/
│   │       ├── type.ts
│   │       └── validation.ts
│   └── App.tsx
└── vite.config.ts





```License
   Feel free to customize any sections to better fit your project or add additional information as needed!