import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        
        <AuthForm />
        
        <div className="space-y-4">
          <div className="text-center">
            <Link to="/reset-password" className="text-primary hover:underline">
              Forgot your password?
            </Link>
          </div>
          
          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;