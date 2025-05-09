
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '@/types/models';
import { apiService } from '@/services/api';
import { toast } from "@/components/ui/use-toast";

// Define the context shape
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: 'guest' | 'user' | 'retailer' | 'admin') => boolean;
  switchRole: (role: 'user' | 'retailer' | 'admin') => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would check for an auth token and verify with backend
        const user = await apiService.getCurrentUser();
        
        // Check if a temporary role is set (demo mode)
        const tempRole = localStorage.getItem('tempUserRole');
        if (tempRole && ['user', 'retailer', 'admin'].includes(tempRole)) {
          // Override role for demo purposes
          user.role = tempRole as 'user' | 'retailer' | 'admin';
        }
        
        setUser(user);
      } catch (error) {
        console.error("Error loading user:", error);
        toast({
          title: "Authentication Error",
          description: "There was a problem loading your account information.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  // Authentication methods
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // This would be replaced with actual backend authentication
      // For now, we'll just use the mock user
      const user = await apiService.getCurrentUser();
      
      if (user) {
        // Check if a temporary role is set (demo mode)
        const tempRole = localStorage.getItem('tempUserRole');
        if (tempRole && ['user', 'retailer', 'admin'].includes(tempRole)) {
          // Override role for demo purposes
          user.role = tempRole as 'user' | 'retailer' | 'admin';
        }
        
        setUser(user);
        toast({
          title: "Welcome back!",
          description: `Logged in as ${user.name}`
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      // This would be replaced with actual backend registration
      // For now, we'll simulate success
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created."
      });
      
      // Auto login after registration
      await login(email, password);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Could not create your account. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      setIsLoading(true);
      // In a real app, this would call a logout API
      setUser(null);
      // Clear any temporary role
      localStorage.removeItem('tempUserRole');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out."
      });
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "There was a problem logging you out.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Temporary role switching (demo purposes only)
  const switchRole = (role: 'user' | 'retailer' | 'admin') => {
    localStorage.setItem('tempUserRole', role);
    
    if (user) {
      setUser({
        ...user,
        role
      });
      
      toast({
        title: "Role Switched",
        description: `You are now using the ${role} role.`,
      });
    }
  };
  
  // Check if user has a specific role
  const hasRole = (role: 'guest' | 'user' | 'retailer' | 'admin') => {
    if (role === 'guest') return true; // Everyone has guest access
    
    if (!user) return false; // Not logged in
    
    // Role hierarchy: admin > retailer > user > guest
    switch (user.role) {
      case 'admin':
        return true; // Admin has access to everything
      case 'retailer':
        return role === 'retailer' || role === 'user'; // Retailer can access retailer, user and guest
      case 'user':
        return role === 'user'; // User can access user and guest
      default:
        return false; // Unknown role
    }
  };
  
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    hasRole,
    switchRole
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
