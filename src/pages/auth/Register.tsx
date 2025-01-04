import { AuthForm } from "@/components/auth/AuthForm";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-gray-600 mt-2">Join us today</p>
        </div>
        
        <AuthForm isRegister />
        
        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;