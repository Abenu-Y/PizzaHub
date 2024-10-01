-- 1. Restaurants Table
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,  -- Global unique restaurant names
  address TEXT,
  phone VARCHAR(15),
  created_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP DEFAULT NULL  -- Soft delete column
);

-- 2. Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),  -- Optional
  email VARCHAR(100) UNIQUE NOT NULL,  -- Unique email globally
  password VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP DEFAULT NULL  -- Soft delete column
);

-- 3. Roles Table (with unique constraint)
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  deleted_at TIMESTAMP DEFAULT NULL,
  UNIQUE (name)  -- Global uniqueness for role names
);


-- 4. User Roles Table (Many-to-Many with unique constraint)
CREATE TABLE user_roles (
  user_id INT,
  role_id INT,
  restaurant_id INT,
  deleted_at TIMESTAMP DEFAULT NULL,  -- Soft delete column
  PRIMARY KEY (user_id, role_id, restaurant_id),  -- Ensure uniqueness for this combination
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- 5. Restaurant Admins Table
CREATE TABLE restaurant_admins (
  restaurant_id INT,
  user_id INT,
  role_id INT,
  deleted_at TIMESTAMP DEFAULT NULL,  -- Soft delete column
  PRIMARY KEY (restaurant_id, user_id, role_id),  -- Unique admin roles per restaurant
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- 6. Pizzas Table (with unique constraint)
CREATE TABLE pizzas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,  -- Pizza name
  restaurant_id INT NOT NULL,  -- Tied to specific restaurant
  base_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP DEFAULT NULL,  -- Soft delete column
  UNIQUE (name, restaurant_id),  -- Unique pizza names per restaurant
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- 7. Toppings Table
CREATE TABLE toppings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,  -- Topping name
  price DECIMAL(5, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP DEFAULT NULL,  -- Soft delete column
  UNIQUE (name)  -- Ensure topping names are globally unique
);

-- 8. Pizza Toppings Table (Many-to-Many)
CREATE TABLE pizza_toppings (
  pizza_id INT,
  topping_id INT,
  PRIMARY KEY (pizza_id, topping_id),  -- Ensure uniqueness of the combination
  FOREIGN KEY (pizza_id) REFERENCES pizzas(id) ON DELETE CASCADE,
  FOREIGN KEY (topping_id) REFERENCES toppings(id) ON DELETE CASCADE
);

-- 9. Orders Table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT,
  restaurant_id INT,
  status VARCHAR(50) DEFAULT 'Pending',  -- Order status
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP DEFAULT NULL,  -- Soft delete column
  FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);


-- 10. Order Details Table
CREATE TABLE order_details (
  order_id INT,
  pizza_id INT,
  topping_id INT,  -- NULL if no additional topping selected
  quantity INT NOT NULL,
  PRIMARY KEY (order_id, pizza_id, topping_id),  -- Ensure uniqueness of the combination
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (pizza_id) REFERENCES pizzas(id),
  FOREIGN KEY (topping_id) REFERENCES toppings(id)
);



-- 11. Role Permissions Table (for CASL.js authorization)
CREATE TABLE role_permissions (
  id SERIAL PRIMARY KEY,  -- Unique identifier for each permission record
  role_id INT NOT NULL,  -- The role this permission applies to
  resource VARCHAR(100) NOT NULL,  -- The resource (e.g., 'orders', 'pizzas', etc.)
  action VARCHAR(50) NOT NULL,  -- The action (e.g., 'read', 'update', 'delete')
  restaurant_id INT,  -- NULL for global permissions
  is_global BOOLEAN DEFAULT FALSE,  -- Whether this is a global permission
  UNIQUE (role_id, resource, action, restaurant_id),  -- Ensure unique combinations
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  
  -- Custom constraint to ensure that only Super Admin can have global permissions
  CONSTRAINT valid_global_permission CHECK (
    (restaurant_id IS NOT NULL AND is_global = FALSE) OR  -- If it's local, restaurant_id must be provided
    (restaurant_id IS NULL AND is_global = TRUE)  -- If global, restaurant_id must be NULL
  )
);




