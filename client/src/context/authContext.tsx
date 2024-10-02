import React, { useState, useEffect, useContext, ReactNode, createContext } from "react";
import getAuth from "../utils/decode/payLoad";

// Define the structure for the restaurantId array
interface RestaurantId {
  user_id: number;
  role_id: number;
  restaurant_id: number;
  deleted_at: string | null; // Can be null if not deleted
}

// Define the new User interface
interface User {
  id: number;
  restaurantId: RestaurantId[]; // An array of RestaurantId objects
  iat: number; // Issued at timestamp
  exp: number; // Expiry timestamp
  token:string | null;
}

// Define the AuthContextType
interface AuthContextType {
  isLogged: boolean;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  employee: User | null; // Change type to User
  user: User | null; // Change type to User
}

// Create the AuthContext with default undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Export the AuthContext Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Create the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [employee, setEmployee] = useState<User | null>(null); // Change type to User

  useEffect(() => {
    const fetchAuth = async () => {
      const loggedInUser: User | {} = await getAuth(); // Use getAuth to get user data
      
      // Check if loggedInUser is an object with restaurantId property
      if (typeof loggedInUser === "object" && loggedInUser !== null && 'restaurantId' in loggedInUser) {
        setIsLogged(true);
        
        // Check for admin role
        const userWithRoles = loggedInUser as User; // Type assertion
        if (userWithRoles.restaurantId.some(restaurant => restaurant.role_id === 1)) {
          setIsAdmin(true);
        }
        
        setEmployee(userWithRoles);
        setUser(userWithRoles);
        console.log(employee)
      }
    };

    fetchAuth();
  }, []);

  const value = { isLogged, isAdmin, setIsAdmin, setIsLogged, employee, user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
