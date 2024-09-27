-- Roles Table
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,  -- 'Customer', 'Super Admin', 'Kitchen Manager'
  description TEXT
);
-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100), -- Optional, can be NULL
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL, -- Location field added and NOT NULL
  phone VARCHAR(15) NOT NULL, -- Phone number field added and NOT NULL
  created_at TIMESTAMP DEFAULT NOW()
);

-- Restaurants Table (MUST be created before user_roles)
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address TEXT,
  phone VARCHAR(15),
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Roles (Many-to-Many) - After restaurants
CREATE TABLE user_roles (
  user_id INT,
  role_id INT,
  restaurant_id INT,
  PRIMARY KEY (user_id, role_id, restaurant_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Restaurant Admins (Many-to-Many with roles)
CREATE TABLE restaurant_admins (
  restaurant_id INT,
  user_id INT,
  role_id INT,
  PRIMARY KEY (restaurant_id, user_id, role_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Pizzas Table
CREATE TABLE pizzas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  restaurant_id INT,
  base_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Toppings Table
CREATE TABLE toppings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pizza Toppings (Many-to-Many)
CREATE TABLE pizza_toppings (
  pizza_id INT,
  topping_id INT,
  PRIMARY KEY (pizza_id, topping_id),
  FOREIGN KEY (pizza_id) REFERENCES pizzas(id) ON DELETE CASCADE,
  FOREIGN KEY (topping_id) REFERENCES toppings(id) ON DELETE CASCADE
);

-- Orders Table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT,
  restaurant_id INT,
  status VARCHAR(50) DEFAULT 'Pending',  -- 'Preparing', 'Delivered', etc.
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Order Details (for each pizza in the order)
CREATE TABLE order_details (
  order_id INT,
  pizza_id INT,
  topping_id INT,  -- NULL if no additional topping selected
  quantity INT NOT NULL,
  PRIMARY KEY (order_id, pizza_id, topping_id),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (pizza_id) REFERENCES pizzas(id),
  FOREIGN KEY (topping_id) REFERENCES toppings(id)
);

-- Role Permissions (for CASL.js authorization)
CREATE TABLE role_permissions (
  role_id INT,
  resource VARCHAR(100),  -- e.g., 'orders', 'pizzas', 'toppings'
  action VARCHAR(100),  -- e.g., 'read', 'create', 'update', 'delete'
  PRIMARY KEY (role_id, resource, action),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);
